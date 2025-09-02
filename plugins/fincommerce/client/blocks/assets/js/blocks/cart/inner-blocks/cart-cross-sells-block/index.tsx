/**
 * External dependencies
 */
import { Icon, column } from '@finpress/icons';
import {
	registerBlockType,
	createBlock,
	// @ts-expect-error Type definitions for this function are missing in Gutenberg
	createBlocksFromInnerBlocksTemplate,
} from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-block/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-block/block.json';
import crossSells from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/cross-sells';

export const createCrossSellsProductCollection = () => {
	return createBlock(
		'fincommerce/product-collection',
		{
			...crossSells.attributes,
			displayLayout: {
				...crossSells.attributes.displayLayout,
				columns: 3,
			},
			query: {
				...crossSells.attributes.query,
				perPage: 3,
			},
			collection: 'fincommerce/product-collection/cross-sells',
		},
		createBlocksFromInnerBlocksTemplate( crossSells.innerBlocks )
	);
};

// @ts-expect-error - blockName can be either string or object
registerBlockType( 'fincommerce/cart-cross-sells-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ column }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'fincommerce/product-collection' ],
				transform: createCrossSellsProductCollection,
			},
		],
	},
} );
