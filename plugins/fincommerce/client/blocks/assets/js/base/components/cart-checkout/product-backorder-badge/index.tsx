/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ProductBadge from '@fincommerce/block-library/assets/js/base/components/cart-checkout/product-badge';

/**
 * Returns a backorder badge.
 */
const ProductBackorderBadge = (): JSX.Element => {
	return (
		<ProductBadge className="wc-block-components-product-backorder-badge">
			{ __( 'Available on backorder', 'fincommerce' ) }
		</ProductBadge>
	);
};

export default ProductBackorderBadge;
