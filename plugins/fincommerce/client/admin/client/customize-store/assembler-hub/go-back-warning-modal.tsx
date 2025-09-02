/**
 * External dependencies
 */
import { Button, Modal } from '@finpress/components';
import { __ } from '@finpress/i18n';

export const GoBackWarningModal = ( {
	setOpenWarningModal,
	onExitClicked,
	classname = 'fincommerce-customize-store__design-change-warning-modal',
}: {
	setOpenWarningModal: ( arg0: boolean ) => void;
	onExitClicked: () => void;
	classname?: string;
} ) => {
	return (
		<Modal
			className={ classname }
			title={ __( 'Are you sure you want to exit?', 'fincommerce' ) }
			onRequestClose={ () => setOpenWarningModal( false ) }
			shouldCloseOnClickOutside={ false }
		>
			<p>
				{ __(
					"You'll lose any changes you've made to your store's design and will start the process again.",
					'fincommerce'
				) }
			</p>
			<div className="fincommerce-customize-store__design-change-warning-modal-footer">
				<Button onClick={ onExitClicked } variant="link">
					{ __( 'Exit and lose changes', 'fincommerce' ) }
				</Button>
				<Button
					onClick={ () => setOpenWarningModal( false ) }
					variant="primary"
				>
					{ __( 'Continue designing', 'fincommerce' ) }
				</Button>
			</div>
		</Modal>
	);
};
