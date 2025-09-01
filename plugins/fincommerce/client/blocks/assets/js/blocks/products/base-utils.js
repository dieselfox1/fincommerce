/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import addToCartButtonMetadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/button/block.json';
import { ImageSizing } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/types';

/**
 * The default layout built from the default template.
 */
export const DEFAULT_PRODUCT_LIST_LAYOUT = [
	[ 'fincommerce/product-image', { imageSizing: ImageSizing.THUMBNAIL } ],
	[ 'fincommerce/product-title' ],
	[ 'fincommerce/product-price' ],
	[ 'fincommerce/product-rating' ],
	[ 'fincommerce/product-button' ],
];

/**
 * Converts innerblocks to a list of layout configs.
 *
 * @param {Object[]} innerBlocks Inner block components.
 */
export const getProductLayoutConfig = ( innerBlocks ) => {
	if ( ! innerBlocks || innerBlocks.length === 0 ) {
		return [];
	}

	return innerBlocks.map( ( block ) => {
		return [
			block.name,
			{
				...block.attributes,
				product: undefined,
				children:
					block.innerBlocks.length > 0
						? getProductLayoutConfig( block.innerBlocks )
						: [],
				/**
				 * Add custom width class to Add to cart button,
				 * This is needed to support "Width Setting" controls available in
				 * "fincommerce/product-button" block.
				 */
				...( block.name === addToCartButtonMetadata.name && {
					className: clsx( block.attributes.className, {
						[ `has-custom-width wp-block-button__width-${ block.attributes?.width }` ]:
							block.attributes?.width,
					} ),
				} ),
				/**
				 * For product elements, special handing is required if product
				 * elements are used in the "All Products" block.
				 */
				isDescendantOfAllProducts: true,
			},
		];
	} );
};
