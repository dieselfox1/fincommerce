/**
 * External dependencies
 */
import { Button, Modal } from '@finpress/components';
import { __ } from '@finpress/i18n';

const DismissModal = ( {
	showDismissModal,
	setShowDismissModal,
	hideTasks,
}: {
	showDismissModal: boolean;
	setShowDismissModal: ( show: boolean ) => void;
	hideTasks: ( task: string ) => void;
} ) => {
	const closeModal = () => setShowDismissModal( false );
	const title = __( 'Hide store setup tasks', 'fincommerce' );
	const message = __(
		'Are you sure? These tasks are required for all stores.',
		'fincommerce'
	);
	const dismissActionText = __( 'Cancel', 'fincommerce' );
	const acceptActionText = __( 'Yes, hide store setup tasks', 'fincommerce' );
	return (
		<>
			{ showDismissModal && (
				<Modal
					title={ title }
					className="fincommerce-task-dismiss-modal"
					onRequestClose={ closeModal }
				>
					<div className="fincommerce-task-dismiss-modal__wrapper">
						<div className="fincommerce-usage-modal__message">
							{ message }
						</div>
						<div className="fincommerce-usage-modal__actions">
							<Button
								onClick={ () => setShowDismissModal( false ) }
							>
								{ dismissActionText }
							</Button>
							<Button
								isPrimary
								onClick={ () => {
									hideTasks( 'remove_card' );
									setShowDismissModal( false );
								} }
							>
								{ acceptActionText }
							</Button>
						</div>
					</div>
				</Modal>
			) }
		</>
	);
};

export default DismissModal;
