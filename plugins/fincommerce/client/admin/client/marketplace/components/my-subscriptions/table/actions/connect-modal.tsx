/**
 * External dependencies
 */
import { Button, ButtonGroup, Modal } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Subscription } from '../../types';
import ConnectButton from './connect-button';

interface ConnectProps {
	subscription: Subscription;
	onClose: () => void;
}

export default function ConnectModal( props: ConnectProps ) {
	return (
		<Modal
			title={ __( 'Connect to update', 'fincommerce' ) }
			onRequestClose={ props.onClose }
			focusOnMount={ true }
			className="fincommerce-marketplace__header-account-modal"
			style={ { borderRadius: 4 } }
			overlayClassName="fincommerce-marketplace__header-account-modal-overlay"
		>
			<p className="fincommerce-marketplace__header-account-modal-text">
				{ sprintf(
					// translators: %s is the product version number (e.g. 1.0.2).
					__(
						'Version %s is available. To enable this update you need to connect your subscription to this store.',
						'fincommerce'
					),
					props.subscription.version
				) }
			</p>
			<ButtonGroup className="fincommerce-marketplace__header-account-modal-button-group">
				<Button
					variant="tertiary"
					onClick={ props.onClose }
					className="fincommerce-marketplace__header-account-modal-button"
				>
					{ __( 'Cancel', 'fincommerce' ) }
				</Button>
				<ConnectButton
					subscription={ props.subscription }
					onClose={ props.onClose }
					variant="primary"
				/>
			</ButtonGroup>
		</Modal>
	);
}
