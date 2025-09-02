/**
 * External dependencies
 */
import React from 'react';
import { __ } from '@finpress/i18n';
import { Button } from '@finpress/components';
import { useState } from '@finpress/element';
import apiFetch from '@finpress/api-fetch';

/**
 * Internal dependencies
 */
import { useOnboardingContext } from '../../data/onboarding-context';
import WooPaymentsStepHeader from '../../components/header';
import './style.scss';
import { recordPaymentsOnboardingEvent } from '~/settings-payments/utils';

export const JetpackStep: React.FC = () => {
	const { currentStep, closeModal, sessionEntryPoint } =
		useOnboardingContext();
	const [ isConnectButtonLoading, setIsConnectButtonLoading ] =
		useState( false );

	return (
		<>
			<WooPaymentsStepHeader onClose={ closeModal } />
			<div className="settings-payments-onboarding-modal__step--content">
				<div className="settings-payments-onboarding-modal__step--content-jetpack">
					<h1 className="settings-payments-onboarding-modal__step--content-jetpack-title">
						{ __( 'Connect to finpress.com', 'fincommerce' ) }
					</h1>
					<p className="settings-payments-onboarding-modal__step--content-jetpack-description">
						{ __(
							'You’ll be briefly redirected to connect your store to your finpress.com account and unlock the full features and functionality of WooPayments',
							'fincommerce'
						) }
					</p>
					<Button
						variant="primary"
						className="settings-payments-onboarding-modal__step--content-jetpack-button"
						isBusy={ isConnectButtonLoading }
						disabled={ isConnectButtonLoading }
						onClick={ () => {
							setIsConnectButtonLoading( true );

							// Mark the step as started.
							const startUrl = currentStep?.actions?.start?.href;
							if ( startUrl ) {
								// No need to wait for the response.
								apiFetch( {
									url: startUrl,
									method: 'POST',
									data: {
										source: sessionEntryPoint,
									},
								} );
							}

							// Track the connection button click event.
							recordPaymentsOnboardingEvent(
								'woopayments_onboarding_modal_click',
								{
									step: currentStep?.id || 'unknown',
									action: 'connect_to_wpcom',
									source: sessionEntryPoint,
								}
							);

							// Redirect to the finpress.com connection authorization URL.
							window.location.href =
								currentStep?.actions?.auth?.href ?? '';
						} }
					>
						{ __( 'Connect', 'fincommerce' ) }
					</Button>
				</div>
			</div>
		</>
	);
};

export default JetpackStep;
