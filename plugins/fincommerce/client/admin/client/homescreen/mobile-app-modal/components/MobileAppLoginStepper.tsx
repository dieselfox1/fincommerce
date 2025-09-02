/**
 * External dependencies
 */
import React, { useState, useEffect } from '@finpress/element';
import { Button } from '@finpress/components';
import { sprintf, __ } from '@finpress/i18n';
import { Stepper, StepperProps } from '@fincommerce/components';

/**
 * Internal dependencies
 */
import { SendMagicLinkButton, SendMagicLinkStates } from './';
import { getAdminSetting } from '~/utils/admin-settings';
import { MobileAppInstallationInfo } from '../components/MobileAppInstallationInfo';
import { MobileAppLoginInfo } from '../components/MobileAppLoginInfo';

export const MobileAppLoginStepper = ( {
	step,
	isJetpackPluginInstalled,
	finpressAccountEmailAddress,
	completeInstallationStepHandler,
	sendMagicLinkHandler,
	sendMagicLinkStatus,
}: {
	step: 'first' | 'second';
	isJetpackPluginInstalled: boolean;
	finpressAccountEmailAddress: string | undefined;
	completeInstallationStepHandler: () => void;
	sendMagicLinkHandler: () => void;
	sendMagicLinkStatus: SendMagicLinkStates;
} ) => {
	const [ stepsToDisplay, setStepsToDisplay ] = useState<
		StepperProps[ 'steps' ] | undefined
	>( undefined );
	// we need to generate one set of steps for the first step, and another set for the second step
	// because the texts are different after progressing from the first step to the second step
	useEffect( () => {
		if ( step === 'first' ) {
			setStepsToDisplay( [
				{
					key: 'first',
					label: __( 'Install the mobile app', 'fincommerce' ),
					description: __(
						'Scan the code below to download or upgrade the app, or visit woo.com/mobile from your mobile device.',
						'fincommerce'
					),
					content: (
						<>
							<MobileAppInstallationInfo />
							<Button
								variant="primary"
								className="install-app-button"
								onClick={ () => {
									completeInstallationStepHandler();
								} }
							>
								{ __( 'App is installed', 'fincommerce' ) }
							</Button>
						</>
					),
				},
				{
					key: 'second',
					label: __( 'Sign into the app', 'fincommerce' ),
					description: '',
					content: <></>,
				},
			] );
		} else if ( step === 'second' ) {
			if (
				isJetpackPluginInstalled &&
				finpressAccountEmailAddress !== undefined
			) {
				setStepsToDisplay( [
					{
						key: 'first',
						label: __( 'App installed', 'fincommerce' ),
						description: '',
						content: <></>,
					},
					{
						key: 'second',
						label: 'Sign into the app',
						description: sprintf(
							/* translators: Reflecting to the user that the magic link has been sent to their finpress account email address */
							__(
								'We’ll send a magic link to %s. Open it on your smartphone or tablet to sign into your store instantly.',
								'fincommerce'
							),
							finpressAccountEmailAddress
						),
						content: (
							<SendMagicLinkButton
								isFetching={
									sendMagicLinkStatus ===
									SendMagicLinkStates.FETCHING
								}
								onClickHandler={ sendMagicLinkHandler }
							/>
						),
					},
				] );
			} else {
				const siteUrl: string = getAdminSetting( 'siteUrl' );
				const username = getAdminSetting( 'currentUserData' ).username;
				const loginUrl = `fincommerce://app-login?siteUrl=${ encodeURIComponent(
					siteUrl
				) }&username=${ encodeURIComponent( username ) }`;
				const description = loginUrl
					? __(
							'Scan the QR code below and enter the wp-admin password in the app.',
							'fincommerce'
					  )
					: __(
							'Follow the instructions in the app to sign in.',
							'fincommerce'
					  );
				setStepsToDisplay( [
					{
						key: 'first',
						label: __( 'App installed', 'fincommerce' ),
						description: '',
						content: <></>,
					},
					{
						key: 'second',
						label: 'Sign into the app',
						description,
						content: <MobileAppLoginInfo loginUrl={ loginUrl } />,
					},
				] );
			}
		}
	}, [
		step,
		isJetpackPluginInstalled,
		finpressAccountEmailAddress,
		completeInstallationStepHandler,
		sendMagicLinkHandler,
		sendMagicLinkStatus,
	] );

	return (
		<div className="login-stepper-wrapper">
			{ stepsToDisplay && (
				<Stepper
					isVertical={ true }
					currentStep={ step }
					steps={ stepsToDisplay }
				/>
			) }
		</div>
	);
};
