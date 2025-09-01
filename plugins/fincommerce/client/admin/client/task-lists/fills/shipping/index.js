/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
import { Button, Card, CardBody } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { filter } from 'lodash';
import interpolateComponents from '@automattic/interpolate-components';
import { withDispatch, withSelect } from '@wordpress/data';
import { Link, Stepper, Plugins } from '@fincommerce/components';
import { getAdminLink } from '@fincommerce/settings';
import { getHistory, getNewPath } from '@fincommerce/navigation';
import {
	settingsStore,
	onboardingStore,
	pluginsStore,
	COUNTRIES_STORE_NAME,
	shippingMethodsStore,
} from '@fincommerce/data';
import { recordEvent } from '@fincommerce/tracks';
import { registerPlugin } from '@wordpress/plugins';
import { WooOnboardingTask } from '@fincommerce/onboarding';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import Connect from '../../../dashboard/components/connect';
import { getCountryCode } from '../../../dashboard/utils';
import StoreLocation from '../steps/location';
import ShippingRates from './rates';
import { createNoticesFromResponse } from '../../../lib/notices';
import './shipping.scss';
import {
	ShippingLayoutColumn,
	ShippingLayoutRow,
} from './shipping-providers/partners';
import { TermsOfService } from '~/task-lists/components/terms-of-service';
import { TrackedLink } from '~/components/tracked-link/tracked-link';
import { isFeatureEnabled } from '~/utils/features';

export class Shipping extends Component {
	constructor( props ) {
		super( props );

		this.initialState = {
			isPending: false,
			step: 'store_location',
			shippingZones: [],
		};

		// Cache active plugins to prevent removal mid-step.
		this.activePlugins = props.activePlugins;
		this.state = this.initialState;
		this.completeStep = this.completeStep.bind( this );

		this.shippingSmartDefaultsEnabled =
			window.wcAdminFeatures &&
			window.wcAdminFeatures[ 'shipping-smart-defaults' ];

		this.storeLocationCompleted = false;
		this.shippingPartners = props.shippingPartners;

		this.jetpackAuthRedirectUrl = getAdminLink( 'admin.php?page=wc-admin' );
	}

	componentDidMount() {
		this.reset();
	}

	reset() {
		this.setState( this.initialState );
	}

	async fetchShippingZones() {
		const { countryCode, countryName } = this.props;

		// @todo The following fetches for shipping information should be moved into
		// @fincommerce/data to make these methods and states more readily available.
		const shippingZones = [];
		const zones = await apiFetch( { path: '/wc/v3/shipping/zones' } );
		let hasCountryZone = false;

		await Promise.all(
			zones.map( async ( zone ) => {
				// "Rest of the world zone"
				if ( zone.id === 0 ) {
					zone.methods = await apiFetch( {
						path: `/wc/v3/shipping/zones/${ zone.id }/methods`,
					} );
					zone.name = __( 'Rest of the world', 'fincommerce' );
					zone.toggleable = true;
					shippingZones.push( zone );
					return;
				}

				// Return any zone with a single location matching the country zone.
				zone.locations = await apiFetch( {
					path: `/wc/v3/shipping/zones/${ zone.id }/locations`,
				} );
				const countryLocation = zone.locations.find(
					( location ) => countryCode === location.code
				);
				if ( countryLocation ) {
					zone.methods = await apiFetch( {
						path: `/wc/v3/shipping/zones/${ zone.id }/methods`,
					} );
					shippingZones.push( zone );
					hasCountryZone = true;
				}
			} )
		);

		// Create the default store country zone if it doesn't exist.
		if ( ! hasCountryZone ) {
			const zone = await apiFetch( {
				method: 'POST',
				path: '/wc/v3/shipping/zones',
				data: { name: countryName },
			} );
			zone.locations = await apiFetch( {
				method: 'POST',
				path: `/wc/v3/shipping/zones/${ zone.id }/locations`,
				data: [ { code: countryCode, type: 'country' } ],
			} );
			shippingZones.push( zone );
		}

		shippingZones.reverse();

		this.setState( { isPending: false, shippingZones } );
	}

	componentDidUpdate( prevProps, prevState ) {
		const { countryCode, countryName, settings } = this.props;
		const {
			fincommerce_store_address: storeAddress,
			fincommerce_default_country: defaultCountry,
			fincommerce_store_postcode: storePostCode,
		} = settings;
		const { step } = this.state;

		if (
			step === 'rates' &&
			( prevProps.countryCode !== countryCode ||
				prevProps.countryName !== countryName ||
				prevState.step !== 'rates' )
		) {
			this.setState( { isPending: true } );
			if ( countryName ) {
				this.fetchShippingZones();
			}
		}

		const isCompleteAddress = Boolean(
			storeAddress && defaultCountry && storePostCode
		);

		if ( step === 'store_location' && isCompleteAddress ) {
			if (
				this.shippingSmartDefaultsEnabled &&
				! this.storeLocationCompleted
			) {
				this.completeStep();
				this.storeLocationCompleted = true;
			} else if ( ! this.shippingSmartDefaultsEnabled ) {
				this.completeStep();
			}
		}
	}

	completeStep() {
		const { createNotice, onComplete } = this.props;
		const { step } = this.state;
		const steps = this.getSteps();
		const currentStepIndex = steps.findIndex( ( s ) => s.key === step );
		const nextStep = steps[ currentStepIndex + 1 ];

		if ( nextStep ) {
			this.setState( { step: nextStep.key } );
		} else {
			createNotice(
				'success',
				__(
					'📦 Shipping is done! Don’t worry, you can always change it later',
					'fincommerce'
				)
			);
			onComplete();
		}
	}

	getSteps() {
		const {
			countryCode,
			createNotice,
			invalidateResolutionForStoreSelector,
			isJetpackConnected,
			onComplete,
			optimisticallyCompleteTask,
			settings,
			task,
			updateAndPersistSettingsForGroup,
			shippingPartners,
		} = this.props;
		const pluginsToPromote = shippingPartners;

		const pluginsToActivate = pluginsToPromote.map( ( pluginToPromote ) => {
			return pluginToPromote.slug;
		} );

		const onShippingPluginInstalltionSkip = () => {
			recordEvent( 'tasklist_shipping_label_printing', {
				install: false,
				plugins_to_activate: pluginsToActivate,
			} );
			getHistory().push( getNewPath( {}, '/', {} ) );
			onComplete();
		};

		const getSinglePluginDescription = ( name, url ) => {
			return interpolateComponents( {
				mixedString: sprintf(
					/* translators: %s = plugin name */
					__(
						'Save time and money by printing your shipping labels right from your computer with %1$s. Try %2$s for free. {{link}}Learn more{{/link}}',
						'fincommerce'
					),
					name,
					name
				),
				components: {
					link: <Link href={ url } target="_blank" type="external" />,
				},
			} );
		};

		const requiresJetpackConnection =
			! isJetpackConnected && countryCode === 'US';

		let steps = [
			{
				key: 'store_location',
				label: __( 'Set store location', 'fincommerce' ),
				description: __(
					'The address from which your business operates',
					'fincommerce'
				),
				content: (
					<StoreLocation
						createNotice={ createNotice }
						updateAndPersistSettingsForGroup={
							updateAndPersistSettingsForGroup
						}
						settings={ settings }
						onComplete={ ( values ) => {
							const country = getCountryCode(
								values.countryState
							);
							recordEvent( 'tasklist_shipping_set_location', {
								country,
							} );

							// Don't need to trigger completeStep here as it's triggered by the address updates in the componentDidUpdate function.
							if ( this.shippingSmartDefaultsEnabled ) {
								this.completeStep();
							}
						} }
					/>
				),
				visible: true,
			},
			{
				key: 'rates',
				label: __( 'Set shipping costs', 'fincommerce' ),
				description: __(
					'Define how much customers pay to ship to different destinations',
					'fincommerce'
				),
				content: (
					<ShippingRates
						buttonText={
							pluginsToActivate.length ||
							requiresJetpackConnection
								? __( 'Continue', 'fincommerce' )
								: __( 'Complete task', 'fincommerce' )
						}
						shippingZones={ this.state.shippingZones }
						onComplete={ () => {
							const { id } = task;
							optimisticallyCompleteTask( id );
							invalidateResolutionForStoreSelector();
							this.completeStep();
						} }
						createNotice={ createNotice }
					/>
				),
				visible:
					settings.fincommerce_ship_to_countries === 'disabled'
						? false
						: true,
			},
			{
				key: 'label_printing',
				label: __( 'Enable shipping label printing', 'fincommerce' ),
				description: pluginsToActivate.includes(
					'fincommerce-shipstation-integration'
				)
					? interpolateComponents( {
							mixedString: __(
								'We recommend using ShipStation to save time at the post office by printing your shipping ' +
									'labels at home. Try ShipStation free for 30 days. {{link}}Learn more{{/link}}.',
								'fincommerce'
							),
							components: {
								link: (
									<Link
										href="https://fincommerce.com/products/shipstation-integration?utm_medium=product"
										target="_blank"
										type="external"
									/>
								),
							},
					  } )
					: __(
							'With FinCommerce Shipping you can save time ' +
								'by printing your USPS and DHL Express shipping labels at home',
							'fincommerce'
					  ),
				content: (
					<>
						{ ! isJetpackConnected &&
							pluginsToActivate.includes(
								'fincommerce-services'
							) && (
								<TermsOfService
									buttonText={ __(
										'Install & enable',
										'fincommerce'
									) }
								/>
							) }
						<Plugins
							onComplete={ ( _plugins, response ) => {
								createNoticesFromResponse( response );
								recordEvent(
									'tasklist_shipping_label_printing',
									{
										install: true,
										plugins_to_activate: pluginsToActivate,
									}
								);
								this.completeStep();
							} }
							onError={ ( errors, response ) =>
								createNoticesFromResponse( response )
							}
							onSkip={ () => {
								recordEvent(
									'tasklist_shipping_label_printing',
									{
										install: false,
										plugins_to_activate: pluginsToActivate,
									}
								);
								invalidateResolutionForStoreSelector();
								getHistory().push( getNewPath( {}, '/', {} ) );
								onComplete();
							} }
							pluginSlugs={ pluginsToActivate }
						/>
					</>
				),
				visible: pluginsToActivate.length,
			},

			// Only needed for FinCommerce Shipping
			{
				key: 'connect',
				label: __( 'Connect your store', 'fincommerce' ),
				description: __(
					'Connect your store to WordPress.com to enable label printing',
					'fincommerce'
				),
				content: (
					<Connect
						redirectUrl={ this.jetpackAuthRedirectUrl }
						completeStep={ this.completeStep }
						onConnect={ () => {
							recordEvent( 'tasklist_shipping_connect_store' );
						} }
					/>
				),
				visible: requiresJetpackConnection,
			},
		];

		// Override the step fields for the smart shipping defaults.
		if ( this.shippingSmartDefaultsEnabled ) {
			const shippingSmartDefaultsSteps = {
				rates: {
					label: __( 'Review your shipping options', 'fincommerce' ),
					description: __(
						'We recommend the following shipping options based on your location. You can manage your shipping options again at any time in FinCommerce Shipping settings.',
						'fincommerce'
					),
					onClick:
						this.state.step !== 'rates'
							? () => {
									this.setState( { step: 'rates' } );
							  }
							: undefined,
					content: (
						<ShippingRates
							buttonText={ __(
								'Save shipping options',
								'fincommerce'
							) }
							shippingZones={ this.state.shippingZones }
							onComplete={ () => {
								const { id } = task;
								optimisticallyCompleteTask( id );
								invalidateResolutionForStoreSelector();
								this.completeStep();
							} }
							createNotice={ createNotice }
						/>
					),
				},
				label_printing: {
					label: __(
						'Enable shipping label printing and discounted rates',
						'fincommerce'
					),
					description:
						pluginsToPromote.length === 1
							? getSinglePluginDescription(
									pluginsToPromote[ 0 ].name,
									pluginsToPromote[ 0 ].learn_more_link
							  )
							: __(
									'Save time and money by printing your shipping labels right from your computer with one of these shipping solutions.',
									'fincommerce'
							  ),

					content: (
						<>
							{ pluginsToPromote.length === 1 ? (
								<ShippingLayoutColumn
									shippingMethod={ pluginsToPromote[ 0 ] }
								/>
							) : (
								<div className="fincommerce-task-shipping-recommendation_plugins-install-container">
									{ pluginsToPromote.map(
										( shippingMethod ) => {
											const pluginsForPartner = [
												shippingMethod?.slug,
												...( shippingMethod?.dependencies ??
													[] ),
											].filter(
												( element ) =>
													element !== undefined
											); // remove undefineds
											return (
												<ShippingLayoutRow
													shippingMethod={
														shippingMethod
													}
													key={ shippingMethod.name }
												>
													<div className="fincommerce-task-shipping-recommendations_plugins-buttons">
														<Plugins
															onComplete={ (
																response
															) => {
																createNoticesFromResponse(
																	response
																);
																recordEvent(
																	'tasklist_shipping_label_printing',
																	{
																		install: true,
																		plugins_to_activate:
																			pluginsForPartner,
																	}
																);
																invalidateResolutionForStoreSelector();
																this.completeStep();
															} }
															onError={ (
																errors,
																response
															) =>
																createNoticesFromResponse(
																	response
																)
															}
															installText={ __(
																'Install and enable',
																'fincommerce'
															) }
															learnMoreLink={
																shippingMethod.learn_more_link
															}
															onLearnMore={ () => {
																recordEvent(
																	'tasklist_shipping_label_printing_learn_more',
																	{
																		plugin: shippingMethod.slug,
																	}
																);
															} }
															pluginSlugs={
																pluginsForPartner
															}
															installButtonVariant={
																'secondary'
															}
														/>
													</div>
												</ShippingLayoutRow>
											);
										}
									) }
								</div>
							) }
							{ pluginsToPromote.length === 1 &&
								pluginsToPromote[ 0 ].slug === undefined && ( // if it doesn't have a slug we just show a download button
									<a
										href={
											pluginsToPromote[ 0 ]
												.learn_more_link
										}
										target="_blank"
										rel="noreferrer"
									>
										<Button variant="primary">
											{ __( 'Download', 'fincommerce' ) }
										</Button>
									</a>
								) }
							{ pluginsToPromote.length === 1 &&
							pluginsToPromote[ 0 ].slug ? (
								<>
									{ ! isJetpackConnected &&
										pluginsToPromote[ 0 ].slug ===
											'fincommerce-services' && (
											<TermsOfService
												buttonText={ __(
													'Install and enable',
													'fincommerce'
												) }
											/>
										) }
									<Plugins
										onComplete={ ( _plugins, response ) => {
											createNoticesFromResponse(
												response
											);
											recordEvent(
												'tasklist_shipping_label_printing',
												{
													install: true,
													plugins_to_activate:
														pluginsToActivate,
												}
											);
											invalidateResolutionForStoreSelector();
											this.completeStep();
										} }
										onError={ ( errors, response ) =>
											createNoticesFromResponse(
												response
											)
										}
										onSkip={
											onShippingPluginInstalltionSkip
										}
										pluginSlugs={ pluginsToActivate }
										installText={ __(
											'Install and enable',
											'fincommerce'
										) }
									/>
								</>
							) : (
								<Button
									isTertiary
									onClick={ onShippingPluginInstalltionSkip }
									className={ clsx(
										'fincommerce-task-shipping-recommendations_skip-button',
										pluginsToPromote.length === 2
											? 'dual'
											: ''
									) }
								>
									{ __( 'No Thanks', 'fincommerce' ) }
								</Button>
							) }
						</>
					),
				},
				store_location: {
					label: __( 'Set your store location', 'fincommerce' ),
					description: __(
						'Add your store location to help us calculate shipping rates and the best shipping options for you. You can manage your store location again at any time in FinCommerce Settings General.',
						'fincommerce'
					),
					onClick:
						this.state.step !== 'store_location'
							? () => {
									this.setState( { step: 'store_location' } );
							  }
							: undefined,
					buttonText: __( 'Save store location', 'fincommerce' ),
				},
			};

			steps = steps.map( ( step ) => {
				if ( shippingSmartDefaultsSteps.hasOwnProperty( step.key ) ) {
					step = {
						...step,
						...shippingSmartDefaultsSteps[ step.key ],
					};
				}
				// Empty description field if it's not the current step.
				if ( step.key !== this.state.step ) {
					step.description = '';
				}
				return step;
			} );
		}
		return filter( steps, ( step ) => step.visible );
	}

	render() {
		const { isPending, step } = this.state;
		const { isUpdateSettingsRequesting } = this.props;
		const steps = this.getSteps();

		return (
			<div className="fincommerce-task-shipping">
				<Card className="fincommerce-task-card">
					<CardBody>
						<Stepper
							isPending={
								isPending || isUpdateSettingsRequesting
							}
							isVertical
							currentStep={ step }
							steps={ steps }
						/>
					</CardBody>
				</Card>
				<TrackedLink
					textProps={ {
						as: 'div',
						className:
							'fincommerce-task-dashboard__container fincommerce-task-marketplace-link',
					} }
					message={ __(
						// translators: {{Link}} is a placeholder for a html element.
						'Visit {{Link}}the FinCommerce Marketplace{{/Link}} to find more shipping, delivery, and fulfillment solutions.',
						'fincommerce'
					) }
					eventName="tasklist_shipping_visit_marketplace_click"
					targetUrl={
						isFeatureEnabled( 'marketplace' )
							? getAdminLink(
									'admin.php?page=wc-admin&tab=extensions&path=/extensions&category=shipping-delivery-and-fulfillment'
							  )
							: 'https://fincommerce.com/product-category/fincommerce-extensions/shipping-delivery-and-fulfillment/'
					}
					linkType={
						isFeatureEnabled( 'marketplace' )
							? 'wc-admin'
							: 'external'
					}
				/>
			</div>
		);
	}
}

const ShippingWrapper = compose(
	withSelect( ( select ) => {
		const { getSettings, isUpdateSettingsRequesting } =
			select( settingsStore );
		const { getActivePlugins, isJetpackConnected } = select( pluginsStore );
		const { getCountry } = select( COUNTRIES_STORE_NAME );

		const { general: settings = {} } = getSettings( 'general' );
		const countryCode = getCountryCode(
			settings.fincommerce_default_country
		);

		const shippingPartners =
			select( shippingMethodsStore ).getShippingMethods();

		const country = countryCode ? getCountry( countryCode ) : null;
		const countryName = country ? country.name : null;
		const activePlugins = getActivePlugins();

		return {
			countryCode,
			countryName,
			isUpdateSettingsRequesting: isUpdateSettingsRequesting( 'general' ),
			settings,
			activePlugins,
			isJetpackConnected: isJetpackConnected(),
			shippingPartners,
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { createNotice } = dispatch( 'core/notices' );
		const { updateAndPersistSettingsForGroup } = dispatch( settingsStore );
		const {
			invalidateResolutionForStoreSelector,
			optimisticallyCompleteTask,
		} = dispatch( onboardingStore );

		return {
			createNotice,
			invalidateResolutionForStoreSelector,
			optimisticallyCompleteTask,
			updateAndPersistSettingsForGroup,
		};
	} )
)( Shipping );

registerPlugin( 'wc-admin-onboarding-task-shipping', {
	scope: 'fincommerce-tasks',
	render: () => (
		<WooOnboardingTask id="shipping">
			{ ( { onComplete, task } ) => {
				return (
					<ShippingWrapper onComplete={ onComplete } task={ task } />
				);
			} }
		</WooOnboardingTask>
	),
} );
