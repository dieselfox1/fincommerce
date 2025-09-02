/**
 * External dependencies
 */
import { useState } from '@finpress/element';
import { Button, ButtonGroup, Modal } from '@finpress/components';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */

export interface HeaderAccountModalProps {
	setIsModalOpen: ( value: boolean ) => void;
	disconnectURL: string;
}

export default function HeaderAccountModal(
	props: HeaderAccountModalProps
): JSX.Element {
	const { setIsModalOpen, disconnectURL } = props;
	const [ isBusy, setIsBusy ] = useState( false );
	const toggleIsBusy = () => setIsBusy( ! isBusy );
	const closeModal = () => setIsModalOpen( false );

	return (
		<Modal
			title={ __(
				'Are you sure you want to disconnect?',
				'fincommerce'
			) }
			onRequestClose={ closeModal }
			focusOnMount={ true }
			className="fincommerce-marketplace__header-account-modal"
			style={ { borderRadius: 4 } }
			size="medium"
			overlayClassName="fincommerce-marketplace__header-account-modal-overlay"
		>
			<p className="fincommerce-marketplace__header-account-modal-text">
				{ __(
					'Keep your store connected to FinCommerce.com to get updates, manage your subscriptions, and receive streamlined support for your extensions and themes.',
					'fincommerce'
				) }
			</p>
			<ButtonGroup className="fincommerce-marketplace__header-account-modal-button-group">
				<Button
					variant="tertiary"
					href={ disconnectURL }
					onClick={ toggleIsBusy }
					isBusy={ isBusy }
					isDestructive={ true }
					className="fincommerce-marketplace__header-account-modal-button"
				>
					{ __( 'Disconnect', 'fincommerce' ) }
				</Button>
				<Button
					variant="primary"
					onClick={ closeModal }
					className="fincommerce-marketplace__header-account-modal-button"
				>
					{ __( 'Keep connected', 'fincommerce' ) }
				</Button>
			</ButtonGroup>
		</Modal>
	);
}
