/**
 * External dependencies
 */
import { ProductResponseItemData, CartVariationItem } from '@fincommerce/types';

/**
 * Internal dependencies
 */
import ProductDetails from '@fincommerce/block-library/assets/js/base/components/cart-checkout/product-details';
import ProductSummary from '@fincommerce/block-library/assets/js/base/components/cart-checkout/product-summary';
import '@fincommerce/block-library/assets/js/base/components/cart-checkout/product-metadata/style.scss';

interface ProductMetadataProps {
	shortDescription?: string;
	fullDescription?: string;
	itemData: ProductResponseItemData[];
	variation?: CartVariationItem[];
}

const ProductMetadata = ( {
	shortDescription = '',
	fullDescription = '',
	itemData = [],
	variation = [],
}: ProductMetadataProps ): JSX.Element => {
	return (
		<div className="wc-block-components-product-metadata">
			<ProductSummary
				className="wc-block-components-product-metadata__description"
				shortDescription={ shortDescription }
				fullDescription={ fullDescription }
			/>
			<ProductDetails details={ itemData } />
			<ProductDetails
				details={ variation.map( ( { attribute = '', value } ) => ( {
					key: attribute,
					value,
				} ) ) }
			/>
		</div>
	);
};

export default ProductMetadata;
