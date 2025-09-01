/**
 * External dependencies
 */
import { useStoreCart } from '@fincommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import CartCrossSellsProductList from '@fincommerce/block-library/assets/js/blocks/cart/cart-cross-sells-product-list';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-products/block.json';

interface BlockProps {
	className?: string | undefined;
	columns: number;
}

const Block = ( { className, columns }: BlockProps ): JSX.Element => {
	const { crossSellsProducts } = useStoreCart();

	if ( typeof columns === 'undefined' ) {
		columns = metadata.attributes.columns.default;
	}

	return (
		<CartCrossSellsProductList
			className={ className }
			columns={ columns }
			products={ crossSellsProducts }
		/>
	);
};

export default Block;
