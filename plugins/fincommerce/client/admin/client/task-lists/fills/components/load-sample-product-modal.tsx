/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Modal, Spinner } from '@wordpress/components';
import { Text } from '@fincommerce/experimental';

/**
 * Internal dependencies
 */
import './load-sample-product-modal.scss';

const LoadSampleProductModal = () => {
	return (
		<Modal
			className="fincommerce-products-load-sample-product-modal"
			overlayClassName="fincommerce-products-load-sample-product-modal-overlay"
			title=""
			onRequestClose={ () => {} }
		>
			<Spinner color="#007cba" style={ { width: 48, height: 48 } } />
			<Text className="fincommerce-load-sample-product-modal__title">
				{ __( 'Loading sample products', 'fincommerce' ) }
			</Text>
			<Text className="fincommerce-load-sample-product-modal__description">
				{ __(
					'We are loading 9 sample products into your store',
					'fincommerce'
				) }
			</Text>
		</Modal>
	);
};

export default LoadSampleProductModal;
