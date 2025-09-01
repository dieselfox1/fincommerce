/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { getAdminLink } from '@fincommerce/settings';

interface WooPaymentsUpdateRequiredModalProps {
	/**
	 * Indicates if the modal is currently open.
	 */
	isOpen: boolean;
	/**
	 * Callback function to handle modal closure.
	 */
	onClose: () => void;
}

/**
 * A modal component that informs users they need to update WooPayments to the latest version.
 */
export const WooPaymentsUpdateRequiredModal = ( {
	isOpen,
	onClose,
}: WooPaymentsUpdateRequiredModalProps ) => {
	const [ isUpdating, setIsUpdating ] = useState( false );

	/**
	 * Handles the "Update WooPayments" action.
	 */
	const handleUpdateWooPayments = () => {
		setIsUpdating( true );

		// Navigate to Plugins page to update WooPayments.
		window.location.href = getAdminLink( 'plugins.php' );
	};

	return (
		<>
			{ isOpen && (
				<Modal
					title={ sprintf(
						/* translators: %s: Provider name */
						__( 'An update to %s is required', 'fincommerce' ),
						'WooPayments'
					) }
					className="fincommerce-woopayments-modal"
					isDismissible={ true }
					onRequestClose={ onClose }
				>
					<div className="fincommerce-woopayments-modal__content">
						<div className="fincommerce-woopayments-modal__content__item">
							<div>
								<span>
									{ sprintf(
										/* translators: %s: Provider name */
										__(
											'To continue, please update your %s plugin to the latest version. This update includes critical security enhancements and new features.',
											'fincommerce'
										),
										'WooPayments'
									) }
								</span>
							</div>
						</div>
						<div className="fincommerce-woopayments-modal__content__item">
							<h3>
								{ __(
									'Would you like to update now?',
									'fincommerce'
								) }
							</h3>
						</div>
					</div>
					<div className="fincommerce-woopayments-modal__actions">
						<Button
							variant="primary"
							isBusy={ isUpdating }
							disabled={ isUpdating }
							onClick={ handleUpdateWooPayments }
						>
							{ __( 'Update WooPayments', 'fincommerce' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ onClose }
							disabled={ isUpdating }
						>
							{ __( 'Not now', 'fincommerce' ) }
						</Button>
					</div>
				</Modal>
			) }
		</>
	);
};
