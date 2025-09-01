/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';
import { Text } from '@fincommerce/experimental';

/**
 * Internal dependencies
 */
import './load-sample-product-confirm-modal.scss';

type Props = {
	onCancel: () => void;
	onImport: () => void;
};

export const LoadSampleProductConfirmModal: React.VFC< Props > = ( {
	onCancel,
	onImport,
} ) => {
	return (
		<Modal
			className="fincommerce-products-load-sample-product-confirm-modal"
			overlayClassName="fincommerce-products-load-sample-product-confirm-modal-overlay"
			title={ __( 'Load sample products', 'fincommerce' ) }
			onRequestClose={ onCancel }
		>
			<Text className="fincommerce-confirmation-modal__message">
				{ __(
					'We’ll import images from FinCommerce.com to set up your sample products.',
					'fincommerce'
				) }
			</Text>
			<div className="fincommerce-confirmation-modal-actions">
				<Button isSecondary onClick={ onCancel }>
					{ __( 'Cancel', 'fincommerce' ) }
				</Button>
				<Button isPrimary onClick={ onImport }>
					{ __( 'Import sample products', 'fincommerce' ) }
				</Button>
			</div>
		</Modal>
	);
};

export default LoadSampleProductConfirmModal;
