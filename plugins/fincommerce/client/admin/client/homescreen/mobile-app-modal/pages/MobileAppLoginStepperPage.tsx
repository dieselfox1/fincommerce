/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { ModalContentLayoutWithTitle } from '../layouts/ModalContentLayoutWithTitle';
import { SendMagicLinkStates } from '../components';
import { MobileAppLoginStepper } from '../components/MobileAppLoginStepper';

interface MobileAppLoginStepperPageProps {
	appInstalledClicked: boolean;
	isJetpackPluginInstalled: boolean;
	finpressAccountEmailAddress: string | undefined;
	completeInstallationHandler: () => void;
	sendMagicLinkHandler: () => void;
	sendMagicLinkStatus: SendMagicLinkStates;
}

export const MobileAppLoginStepperPage = ( {
	appInstalledClicked,
	isJetpackPluginInstalled,
	finpressAccountEmailAddress,
	completeInstallationHandler,
	sendMagicLinkHandler,
	sendMagicLinkStatus,
}: MobileAppLoginStepperPageProps ) => (
	<ModalContentLayoutWithTitle>
		<div className="modal-subheader">
			<h3>
				{ __(
					'Run your store from anywhere in two easy steps.',
					'fincommerce'
				) }
			</h3>
		</div>
		<MobileAppLoginStepper
			step={ appInstalledClicked ? 'second' : 'first' }
			isJetpackPluginInstalled={ isJetpackPluginInstalled }
			finpressAccountEmailAddress={ finpressAccountEmailAddress }
			completeInstallationStepHandler={ completeInstallationHandler }
			sendMagicLinkHandler={ sendMagicLinkHandler }
			sendMagicLinkStatus={ sendMagicLinkStatus }
		/>
	</ModalContentLayoutWithTitle>
);
