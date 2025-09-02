/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button, Notice } from '@finpress/components';
import { useState, createInterpolateElement } from '@finpress/element';

/**
 * Internal dependencies
 */
import { CoreProfilerStateMachineContext } from '../index';
import { BusinessLocationEvent } from '../events';
import { CountryStateOption } from '../services/country';
import { Heading } from '../components/heading/heading';
import { Navigation } from '../components/navigation/navigation';
import { GeolocationCountrySelect } from '../components/geolocation-country-select/geolocation-country-select';

export const BusinessLocation = ( {
	sendEvent,
	navigationProgress,
	context,
}: {
	sendEvent: ( event: BusinessLocationEvent ) => void;
	navigationProgress: number;
	context: Pick<
		CoreProfilerStateMachineContext,
		'geolocatedLocation' | 'countries'
	>;
} ) => {
	const [ storeCountry, setStoreCountry ] = useState< CountryStateOption >( {
		key: '',
		label: '',
	} );

	const inputLabel = __( 'Select country/region', 'fincommerce' );

	return (
		<div
			className="fincommerce-profiler-business-location"
			data-testid="core-profiler-business-location"
		>
			<Navigation percentage={ navigationProgress } />
			<div className="fincommerce-profiler-page__content fincommerce-profiler-business-location__content">
				<Heading
					className="fincommerce-profiler__stepper-heading"
					title={ __(
						'Where is your business located?',
						'fincommerce'
					) }
					subTitle={ __(
						'We’ll use this information to help you set up payments, shipping, and taxes.',
						'fincommerce'
					) }
				/>
				<GeolocationCountrySelect
					countries={ context.countries }
					initialValue={ storeCountry }
					label={ inputLabel }
					geolocatedLocation={ context.geolocatedLocation }
					placeholder={ inputLabel }
					onChange={ ( countryStateOption ) => {
						setStoreCountry( countryStateOption );
					} }
				/>
				{ context.countries.length === 0 && (
					<Notice
						className="fincommerce-profiler-select-control__country-error"
						isDismissible={ false }
						status="error"
					>
						{ createInterpolateElement(
							__(
								'Oops! We encountered a problem while fetching the list of countries to choose from. <retryButton/> or <skipButton/>',
								'fincommerce'
							),
							{
								retryButton: (
									<Button
										onClick={ () => {
											sendEvent( {
												type: 'RETRY_COUNTRIES_LIST',
											} );
										} }
										variant="tertiary"
									>
										{ __(
											'Please try again',
											'fincommerce'
										) }
									</Button>
								),
								skipButton: (
									<Button
										onClick={ () => {
											sendEvent( {
												type: 'BUSINESS_LOCATION_COMPLETED',
												payload: {
													storeLocation: 'US:CA',
												},
											} );
										} }
										variant="tertiary"
									>
										{ __(
											'Skip this step',
											'fincommerce'
										) }
									</Button>
								),
							}
						) }
					</Notice>
				) }
				<div className="fincommerce-profiler-button-container fincommerce-profiler-go-to-mystore__button-container">
					<Button
						className="fincommerce-profiler-button"
						variant="primary"
						disabled={ ! storeCountry.key }
						onClick={ () => {
							sendEvent( {
								type: 'BUSINESS_LOCATION_COMPLETED',
								payload: {
									storeLocation: storeCountry.key,
								},
							} );
						} }
					>
						{ __( 'Go to my store', 'fincommerce' ) }
					</Button>
				</div>
			</div>
		</div>
	);
};
