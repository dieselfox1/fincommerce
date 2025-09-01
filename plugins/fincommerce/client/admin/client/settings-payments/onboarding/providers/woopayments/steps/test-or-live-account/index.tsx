/**
 * External dependencies
 */
import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import interpolateComponents from '@automattic/interpolate-components';
import { Button } from '@wordpress/components';
import { Link } from '@fincommerce/components';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import WooPaymentsStepHeader from '../../components/header';
import { useOnboardingContext } from '../../data/onboarding-context';
import { WC_ASSET_URL } from '~/utils/admin-settings';
import { recordPaymentsOnboardingEvent } from '~/settings-payments/utils';
import { TESTING_ACCOUNT_STEP_ID } from '~/settings-payments/onboarding/providers/woopayments/steps';
import './style.scss';

const TestOrLiveAccountStep = () => {
	const {
		closeModal,
		currentStep,
		sessionEntryPoint,
		navigateToNextStep,
		refreshStoreData,
		getStepByKey,
	} = useOnboardingContext();
	const [ isContinueButtonLoading, setIsContinueButtonLoading ] =
		useState( false );

	return (
		<>
			<WooPaymentsStepHeader onClose={ closeModal } />
			<div className="settings-payments-onboarding-modal__step--content">
				<div className="fincommerce-payments-test-or-live-account-step__success_content_container">
					<div className="fincommerce-woopayments-modal__content fincommerce-payments-test-or-live-account-step__success_content">
						<h1 className="fincommerce-payments-test-or-live-account-step__success_content_title">
							{ __(
								"You're almost there — time to activate payments!",
								'fincommerce'
							) }
						</h1>
						<div className="fincommerce-woopayments-modal__content__item">
							<div className="fincommerce-woopayments-modal__content__item__description">
								<p>
									{ __(
										'Activate payments to accept real orders and process transactions.',
										'fincommerce'
									) }
								</p>
							</div>
						</div>
						<div className="fincommerce-payments-test-or-live-account-step__success-whats-next">
							<div className="fincommerce-woopayments-modal__content__item-flex">
								<img
									src={
										WC_ASSET_URL + 'images/icons/dollar.svg'
									}
									alt=""
									role="presentation"
								/>
								<div className="fincommerce-woopayments-modal__content__item-flex__description">
									<h3>
										{ __(
											'Activate real payments',
											'fincommerce'
										) }
									</h3>
									<div>
										{ interpolateComponents( {
											mixedString: __(
												'Provide some additional details about your business to process real transactions. {{link}}Learn more{{/link}}',
												'fincommerce'
											),
											components: {
												link: (
													<Link
														href="https://fincommerce.com/document/woopayments/startup-guide/#sign-up-process"
														target="_blank"
														rel="noreferrer"
														type="external"
													/>
												),
											},
										} ) }
									</div>
								</div>
							</div>
							<Button
								variant="primary"
								onClick={ () => {
									setIsContinueButtonLoading( true );

									recordPaymentsOnboardingEvent(
										'woopayments_onboarding_modal_click',
										{
											step: currentStep?.id || 'unknown',
											action: 'activate_payments',
											source: sessionEntryPoint,
										}
									);

									const testAccountStep = getStepByKey(
										TESTING_ACCOUNT_STEP_ID
									);

									const actionUrl =
										testAccountStep?.actions?.finish?.href;

									if ( actionUrl ) {
										apiFetch( {
											url: actionUrl,
											method: 'POST',
										} )
											.then( () => {
												setIsContinueButtonLoading(
													false
												);

												refreshStoreData();
											} )
											.catch( () => {
												// Handle any errors that occur during the process.
												setIsContinueButtonLoading(
													false
												);
											} );
									}
								} }
								isBusy={ isContinueButtonLoading }
								disabled={ isContinueButtonLoading }
							>
								{ __(
									'Start accepting payments',
									'fincommerce'
								) }
							</Button>

							<div className="fincommerce-payments-test-or-live-account-step__success_content_or-divider">
								<hr />
								{ __( 'OR', 'fincommerce' ) }
								<hr />
							</div>

							<div className="fincommerce-woopayments-modal__content__item-flex">
								<img
									src={
										WC_ASSET_URL +
										'images/icons/post-list.svg'
									}
									alt=""
									role="presentation"
								/>
								<div className="fincommerce-woopayments-modal__content__item-flex__description">
									<h3>
										{ __(
											'Test payments first, activate later',
											'fincommerce'
										) }
									</h3>
									<div>
										<p>
											{ interpolateComponents( {
												mixedString: __(
													"A test account will be created for you to {{link}}test payments on your store{{/link}}. You'll need to activate payments later to process real transactions.",
													'fincommerce'
												),
												components: {
													link: (
														<Link
															href="https://fincommerce.com/document/woopayments/testing-and-troubleshooting/test-accounts/"
															target="_blank"
															rel="noreferrer"
															type="external"
														/>
													),
												},
											} ) }
										</p>
									</div>
								</div>
							</div>
							<Button
								variant="secondary"
								isBusy={ isContinueButtonLoading }
								disabled={ isContinueButtonLoading }
								onClick={ () => {
									navigateToNextStep();
								} }
							>
								{ __( 'Test payments', 'fincommerce' ) }
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TestOrLiveAccountStep;
