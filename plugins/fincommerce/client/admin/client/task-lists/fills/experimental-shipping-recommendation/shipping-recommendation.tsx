/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { difference } from 'lodash';
import { useEffect, useState } from '@finpress/element';
import { Stepper } from '@fincommerce/components';
import { Card, CardBody, Button } from '@finpress/components';
import { getAdminLink } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import { Connect } from './components/connect';
import { Plugins } from './components/plugins';
import { StoreLocation } from './components/store-location';
import { WCSBanner } from './components/wcs-banner';
import { TaskProps, ShippingRecommendationProps } from './types';
import { redirectToWCSSettings } from './utils';
import { TrackedLink } from '~/components/tracked-link/tracked-link';
import { isFeatureEnabled } from '~/utils/features';

/**
 * Plugins required to automate shipping.
 */
const AUTOMATION_PLUGINS = [ 'fincommerce-shipping' ];

export const ShippingRecommendation = ( {
	activePlugins,
	isJetpackConnected,
	isResolving,
}: TaskProps & ShippingRecommendationProps ) => {
	const [ pluginsToActivate, setPluginsToActivate ] = useState< string[] >(
		[]
	);
	const [ stepIndex, setStepIndex ] = useState( 0 );
	const [ isRedirecting, setIsRedirecting ] = useState( false );
	const [ locationStepRedirected, setLocationStepRedirected ] =
		useState( false );

	const nextStep = () => {
		setStepIndex( stepIndex + 1 );
	};

	const redirect = () => {
		setIsRedirecting( true );
		redirectToWCSSettings();
	};

	const viewLocationStep = () => {
		setStepIndex( 0 );
	};

	// Skips to next step only once.
	const onLocationComplete = () => {
		if ( locationStepRedirected ) {
			return;
		}
		setLocationStepRedirected( true );
		nextStep();
	};

	useEffect( () => {
		const remainingPlugins = difference(
			AUTOMATION_PLUGINS,
			activePlugins
		);

		// Force redirect when all steps are completed.
		if (
			! isResolving &&
			remainingPlugins.length === 0 &&
			isJetpackConnected
		) {
			redirect();
		}

		if ( remainingPlugins.length <= pluginsToActivate.length ) {
			return;
		}
		setPluginsToActivate( remainingPlugins );
	}, [ activePlugins, isJetpackConnected, isResolving, pluginsToActivate ] );

	const steps = [
		{
			key: 'store_location',
			label: __( 'Set store location', 'fincommerce' ),
			description: __(
				'The address from which your business operates',
				'fincommerce'
			),
			content: (
				<StoreLocation
					nextStep={ nextStep }
					onLocationComplete={ onLocationComplete }
				/>
			),
			onClick: viewLocationStep,
		},
		{
			key: 'plugins',
			label: __( 'Install FinCommerce Shipping', 'fincommerce' ),
			description: __(
				'Enable shipping label printing and discounted rates',
				'fincommerce'
			),
			content: (
				<div>
					<WCSBanner />
					<Plugins
						nextStep={ nextStep }
						pluginsToActivate={ pluginsToActivate }
					/>
				</div>
			),
		},
		{
			key: 'connect',
			label: __( 'Connect your store', 'fincommerce' ),
			description: __(
				'Connect your store to finpress.com to enable FinCommerce Shipping',
				'fincommerce'
			),
			content: isJetpackConnected ? (
				<Button onClick={ redirect } isBusy={ isRedirecting } isPrimary>
					{ __( 'Complete task', 'fincommerce' ) }
				</Button>
			) : (
				<Connect />
			),
		},
	];

	const step = steps[ stepIndex ];

	return (
		<div className="fincommerce-task-shipping-recommendation">
			<Card className="fincommerce-task-card">
				<CardBody>
					<Stepper
						isPending={ isResolving }
						isVertical={ true }
						currentStep={ step.key }
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
				eventName="tasklist_shipping_recommendation_visit_marketplace_click"
				targetUrl={
					isFeatureEnabled( 'marketplace' )
						? getAdminLink(
								'admin.php?page=wc-admin&tab=extensions&path=/extensions&category=shipping-delivery-and-fulfillment'
						  )
						: 'https://fincommerce.com/product-category/fincommerce-extensions/shipping-delivery-and-fulfillment/'
				}
				linkType={
					isFeatureEnabled( 'marketplace' ) ? 'wc-admin' : 'external'
				}
			/>
		</div>
	);
};
