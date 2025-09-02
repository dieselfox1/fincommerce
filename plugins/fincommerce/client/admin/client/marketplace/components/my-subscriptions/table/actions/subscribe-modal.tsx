/**
 * External dependencies
 */
import { Button, ButtonGroup, Modal } from '@finpress/components';
import { __, sprintf } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { Subscription } from '../../types';
import SubscribeButton from './subscribe-button';

interface SubscribeProps {
	subscription: Subscription;
	onClose: () => void;
}

export default function SubscribeModal( props: SubscribeProps ) {
	return (
		<Modal
			title={ __( 'Subscribe to update', 'fincommerce' ) }
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
						'Version %s is available. To enable this update you need to purchase a subscription.',
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
				<SubscribeButton
					subscription={ props.subscription }
					variant="primary"
				/>
			</ButtonGroup>
		</Modal>
	);
}
