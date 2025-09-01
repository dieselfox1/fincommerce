/**
 * Purpose of this file:
 * This file defines constants for use in `plugins/fincommerce/client/blocks/assets/js/blocks-registry/product-collection/register-product-collection.tsx`.
 * By isolating constants here, we avoid loading unnecessary JS file on the frontend (e.g., the /shop page), enhancing site performance.
 *
 * Context: https://github.com/dieselfox1/fincommerce/pull/48141#issuecomment-2208770592.
 */

/**
 * External dependencies
 */
import { getSetting } from '@fincommerce/settings';
import { objectOmit } from '@fincommerce/utils';
import type { InnerBlockTemplate } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import blockJson from '@fincommerce/block-library/assets/js/blocks/product-collection/block.json';
import {
	ProductCollectionAttributes,
	ProductCollectionQuery,
	LayoutOptions,
	WidthOptions,
} from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import { ImageSizing } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/types';

export const PRODUCT_COLLECTION_BLOCK_NAME = blockJson.name;
const PRODUCT_TITLE_NAME = `${ PRODUCT_COLLECTION_BLOCK_NAME }/product-title`;

export const STOCK_STATUS_OPTIONS = getSetting< Record< string, string > >(
	'stockStatusOptions',
	[]
);

const GLOBAL_HIDE_OUT_OF_STOCK = getSetting< boolean >(
	'hideOutOfStockItems',
	false
);

export const getDefaultStockStatuses = () => {
	return GLOBAL_HIDE_OUT_OF_STOCK
		? Object.keys( objectOmit( STOCK_STATUS_OPTIONS, 'outofstock' ) )
		: Object.keys( STOCK_STATUS_OPTIONS );
};

export const DEFAULT_QUERY: ProductCollectionQuery = {
	perPage: 9,
	pages: 0,
	offset: 0,
	postType: 'product',
	order: 'asc',
	orderBy: 'title',
	search: '',
	exclude: [],
	inherit: false,
	taxQuery: {},
	isProductCollectionBlock: true,
	featured: false,
	fincommerceOnSale: false,
	fincommerceStockStatus: getDefaultStockStatuses(),
	fincommerceAttributes: [],
	fincommerceHandPickedProducts: [],
	timeFrame: undefined,
	priceRange: undefined,
	filterable: false,
	relatedBy: {
		categories: true,
		tags: true,
	},
};

export const DEFAULT_ATTRIBUTES: Pick<
	ProductCollectionAttributes,
	| 'query'
	| 'tagName'
	| 'dimensions'
	| 'displayLayout'
	| 'queryContextIncludes'
	| 'forcePageReload'
> = {
	query: DEFAULT_QUERY,
	tagName: 'div',
	displayLayout: {
		type: LayoutOptions.GRID,
		columns: 3,
		shrinkColumns: true,
	},
	dimensions: {
		widthType: WidthOptions.FILL,
	},
	queryContextIncludes: [ 'collection' ],
	forcePageReload: false,
};

export const DEFAULT_FILTERS: Pick<
	ProductCollectionQuery,
	| 'fincommerceOnSale'
	| 'fincommerceStockStatus'
	| 'fincommerceAttributes'
	| 'fincommerceHandPickedProducts'
	| 'taxQuery'
	| 'featured'
	| 'timeFrame'
	| 'priceRange'
> = {
	fincommerceOnSale: DEFAULT_QUERY.fincommerceOnSale,
	fincommerceStockStatus: DEFAULT_QUERY.fincommerceStockStatus,
	fincommerceAttributes: DEFAULT_QUERY.fincommerceAttributes,
	fincommerceHandPickedProducts: DEFAULT_QUERY.fincommerceHandPickedProducts,
	taxQuery: DEFAULT_QUERY.taxQuery,
	featured: DEFAULT_QUERY.featured,
	timeFrame: DEFAULT_QUERY.timeFrame,
	priceRange: DEFAULT_QUERY.priceRange,
};

export const headingBlockName = 'core/heading';
export const coreQueryPaginationBlockName = 'core/query-pagination';
export const nextPreviousButtonsBlockName =
	'fincommerce/product-gallery-large-image-next-previous';
export const productTemplateBlockName = 'fincommerce/product-template';

/**
 * Default inner block templates for the product collection block.
 * Exported for use in different collections, e.g., 'New Arrivals' collection.
 */
export const INNER_BLOCKS_PRODUCT_TEMPLATE: InnerBlockTemplate = [
	productTemplateBlockName,
	{},
	[
		[
			'fincommerce/product-image',
			{
				imageSizing: ImageSizing.THUMBNAIL,
				showSaleBadge: false,
			},
			[
				[
					'fincommerce/product-sale-badge',
					{
						align: 'right',
					},
				],
			],
		],
		[
			'core/post-title',
			{
				textAlign: 'center',
				level: 2,
				fontSize: 'medium',
				style: {
					spacing: {
						margin: {
							bottom: '0.75rem',
							top: '0',
						},
					},
					typography: {
						lineHeight: '1.4',
					},
				},
				isLink: true,
				__fincommerceNamespace: PRODUCT_TITLE_NAME,
			},
		],
		[
			'fincommerce/product-price',
			{
				textAlign: 'center',
				fontSize: 'small',
			},
		],
		[
			'fincommerce/product-button',
			{
				textAlign: 'center',
				fontSize: 'small',
			},
		],
	],
];

export const paginationDefaultAttributes = {
	layout: {
		type: 'flex',
		justifyContent: 'center',
	},
};

export const INNER_BLOCKS_PAGINATION_TEMPLATE: InnerBlockTemplate = [
	coreQueryPaginationBlockName,
	paginationDefaultAttributes,
];

export const INNER_BLOCKS_NO_RESULTS_TEMPLATE: InnerBlockTemplate = [
	'fincommerce/product-collection-no-results',
];

export const INNER_BLOCKS_TEMPLATE: InnerBlockTemplate[] = [
	INNER_BLOCKS_PRODUCT_TEMPLATE,
	INNER_BLOCKS_PAGINATION_TEMPLATE,
	INNER_BLOCKS_NO_RESULTS_TEMPLATE,
];
