/**
 * External dependencies
 */
import type {
	InnerBlockTemplate,
	BlockVariationScope,
} from '@finpress/blocks';
import { __ } from '@finpress/i18n';
import { Icon, chartBar } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { INNER_BLOCKS_PRODUCT_TEMPLATE } from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';
import { CoreCollectionNames, CoreFilterNames } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

const collection = {
	name: CoreCollectionNames.BEST_SELLERS,
	title: __( 'Best Sellers', 'fincommerce' ),
	icon: <Icon icon={ chartBar } />,
	description: __( 'Recommend your best-selling products.', 'fincommerce' ),
	keywords: [ 'best selling' ],
	scope: [ 'inserter', 'block' ] as BlockVariationScope[],
};

const attributes = {
	displayLayout: {
		type: 'flex',
		columns: 5,
		shrinkColumns: true,
	},
	query: {
		orderBy: 'popularity',
		order: 'desc',
		perPage: 5,
		pages: 1,
	},
	hideControls: [ CoreFilterNames.ORDER, CoreFilterNames.FILTERABLE ],
};

const heading: InnerBlockTemplate = [
	'core/heading',
	{
		textAlign: 'center',
		level: 2,
		content: __( 'Best selling products', 'fincommerce' ),
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
