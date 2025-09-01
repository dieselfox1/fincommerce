/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';
import { createElement, useState } from '@wordpress/element';

type ConfirmationModalProps = {
	onClose: () => void;
	onDismiss: () => void;
	buttonLabel?: string;
};

export const InboxDismissConfirmationModal = ( {
	onClose,
	onDismiss,
	buttonLabel = __( "Yes, I'm sure", 'fincommerce' ),
}: ConfirmationModalProps ) => {
	const [ inAction, setInAction ] = useState( false );

	return (
		<Modal
			title={ __( 'Are you sure?', 'fincommerce' ) }
			onRequestClose={ () => onClose() }
			className="fincommerce-inbox-dismiss-confirmation_modal"
		>
			<div className="fincommerce-inbox-dismiss-confirmation_wrapper">
				<p>
					{ __(
						'Dismissed messages cannot be viewed again',
						'fincommerce'
					) }
				</p>
				<div className="fincommerce-inbox-dismiss-confirmation_buttons">
					<Button isSecondary onClick={ () => onClose() }>
						{ __( 'Cancel', 'fincommerce' ) }
					</Button>
					<Button
						isSecondary
						isBusy={ inAction }
						disabled={ inAction }
						onClick={ () => {
							setInAction( true );
							onDismiss();
						} }
					>
						{ buttonLabel }
					</Button>
				</div>
			</div>
		</Modal>
	);
};
