/**
 * External dependencies
 */
import type {
	InnerBlockTemplate,
	BlockVariationScope,
} from '@finpress/blocks';
import { __ } from '@finpress/i18n';
import { Icon, percent } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { INNER_BLOCKS_PRODUCT_TEMPLATE } from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';
import { CoreCollectionNames, CoreFilterNames } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

const collection = {
	name: CoreCollectionNames.ON_SALE,
	title: __( 'On Sale Products', 'fincommerce' ),
	icon: <Icon icon={ percent } />,
	description: __(
		'Highlight products that are currently on sale.',
		'fincommerce'
	),
	keywords: [ 'discount', 'promotion', 'onsale' ],
	scope: [ 'inserter', 'block' ] as BlockVariationScope[],
};

const attributes = {
	displayLayout: {
		type: 'flex',
		columns: 5,
		shrinkColumns: true,
	},
	query: {
		fincommerceOnSale: true,
		perPage: 5,
		pages: 1,
	},
	hideControls: [ CoreFilterNames.ON_SALE, CoreFilterNames.FILTERABLE ],
};

const heading: InnerBlockTemplate = [
	'core/heading',
	{
		textAlign: 'center',
		level: 2,
		content: __( 'On sale products', 'fincommerce' ),
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
