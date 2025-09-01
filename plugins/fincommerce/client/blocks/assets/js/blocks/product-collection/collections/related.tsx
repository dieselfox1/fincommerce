/**
 * External dependencies
 */
import type {
	InnerBlockTemplate,
	BlockVariationScope,
} from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon, loop } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { INNER_BLOCKS_PRODUCT_TEMPLATE } from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';
import { CoreCollectionNames, LayoutOptions } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

const collection = {
	name: CoreCollectionNames.RELATED,
	title: __( 'Related Products', 'fincommerce' ),
	icon: <Icon icon={ loop } />,
	description: __( 'Recommend products like this one.', 'fincommerce' ),
	keywords: [],
	scope: [ 'inserter', 'block' ] as BlockVariationScope[],
	usesReference: [ 'product' ],
};

const attributes = {
	displayLayout: {
		type: LayoutOptions.GRID,
		columns: 4,
		shrinkColumns: true,
	},
	query: {
		perPage: 4,
		pages: 1,
	},
};

const heading: InnerBlockTemplate = [
	'core/heading',
	{
		textAlign: 'center',
		level: 2,
		content: __( 'Related Products', 'fincommerce' ),
		style: { spacing: { margin: { bottom: '1rem' } } },
	},
];

const innerBlocks: InnerBlockTemplate[] = [
	heading,
	INNER_BLOCKS_PRODUCT_TEMPLATE,
];

export default {
	...collection,
	attributes,
	innerBlocks,
};
