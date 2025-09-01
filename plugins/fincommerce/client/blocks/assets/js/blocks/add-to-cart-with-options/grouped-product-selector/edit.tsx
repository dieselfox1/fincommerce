/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { type BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { GROUPED_PRODUCT_ITEM_TEMPLATE } from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/grouped-product-selector/product-item/constants';

interface Attributes {
	className?: string;
}

export default function AddToCartWithOptionsGroupedProductSelectorEdit(
	props: BlockEditProps< Attributes >
) {
	const { className } = props.attributes;
	const blockProps = useBlockProps( {
		className,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: GROUPED_PRODUCT_ITEM_TEMPLATE,
		templateLock: 'all',
	} );

	return <div { ...innerBlocksProps } />;
}
