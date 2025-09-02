/**
 * External dependencies
 */
import type {
	InnerBlockTemplate,
	BlockVariationScope,
} from '@finpress/blocks';
import { __ } from '@finpress/i18n';
import { Icon, category } from '@finpress/icons';

/**
 * Internal dependencies
 */
import {
	INNER_BLOCKS_PRODUCT_TEMPLATE,
	INNER_BLOCKS_PAGINATION_TEMPLATE,
} from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';
import { CoreCollectionNames, CoreFilterNames } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

const collection = {
	name: CoreCollectionNames.BY_CATEGORY,
	title: __( 'Products by Category', 'fincommerce' ),
	icon: <Icon icon={ category } />,
	description: __(
		'Display products from specific categories.',
		'fincommerce'
	),
	scope: [ 'inserter', 'block' ] as BlockVariationScope[],
};

const attributes = {
	displayLayout: {
		type: 'flex',
		columns: 5,
		shrinkColumns: true,
	},
	hideControls: [ CoreFilterNames.HAND_PICKED, CoreFilterNames.FILTERABLE ],
};

const heading: InnerBlockTemplate = [
	'core/heading',
	{
		textAlign: 'center',
		level: 2,
		content: __( 'Products by Category', 'fincommerce' ),
		style: { spacing: { margin: { bottom: '1rem' } } },
	},
];

const innerBlocks: InnerBlockTemplate[] = [
	heading,
	INNER_BLOCKS_PRODUCT_TEMPLATE,
	INNER_BLOCKS_PAGINATION_TEMPLATE,
];

export default {
	...collection,
	attributes,
	innerBlocks,
};
