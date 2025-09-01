/**
 * External dependencies
 */
import { getSetting, getSettingWithCoercion } from '@fincommerce/settings';
import { objectOmit } from '@fincommerce/utils';
import type { InnerBlockTemplate } from '@wordpress/blocks';
import { isBoolean } from '@fincommerce/types';
/**
 * Internal dependencies
 */
import { QueryBlockAttributes } from '@fincommerce/block-library/assets/js/blocks/product-query/types';
import { VARIATION_NAME as PRODUCT_TITLE_ID } from '@fincommerce/block-library/assets/js/blocks/product-query/variations/elements/product-title';
import { VARIATION_NAME as PRODUCT_TEMPLATE_ID } from '@fincommerce/block-library/assets/js/blocks/product-query/variations/elements/product-template';
import { ImageSizing } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/types';

export const PRODUCT_QUERY_VARIATION_NAME = 'fincommerce/product-query';

export const EDIT_ATTRIBUTES_URL =
	'/wp-admin/edit.php?post_type=product&page=product_attributes';

export const QUERY_LOOP_ID = 'core/query';

export const DEFAULT_CORE_ALLOWED_CONTROLS = [ 'taxQuery', 'search' ];

export const ALL_PRODUCT_QUERY_CONTROLS = [
	'attributes',
	'presets',
	'productSelector',
	'onSale',
	'stockStatus',
	'wooInherit',
];

export const DEFAULT_ALLOWED_CONTROLS = [
	...DEFAULT_CORE_ALLOWED_CONTROLS,
	...ALL_PRODUCT_QUERY_CONTROLS,
];

export const STOCK_STATUS_OPTIONS = getSetting< Record< string, string > >(
	'stockStatusOptions',
	[]
);

const GLOBAL_HIDE_OUT_OF_STOCK = getSetting< boolean >(
	'hideOutOfStockItems',
	false
);

export const QUERY_DEFAULT_ATTRIBUTES: QueryBlockAttributes = {
	allowedControls: DEFAULT_ALLOWED_CONTROLS,
	displayLayout: {
		type: 'flex',
		columns: 3,
	},
	query: {
		perPage: 9,
		pages: 0,
		offset: 0,
		postType: 'product',
		order: 'asc',
		orderBy: 'title',
		author: '',
		search: '',
		exclude: [],
		sticky: '',
		inherit: false,
		__fincommerceAttributes: [],
		__fincommerceStockStatus: GLOBAL_HIDE_OUT_OF_STOCK
			? Object.keys( objectOmit( STOCK_STATUS_OPTIONS, 'outofstock' ) )
			: Object.keys( STOCK_STATUS_OPTIONS ),
	},
};

// This is necessary to fix https://github.com/dieselfox1/fincommerce-blocks/issues/9884.
const postTemplateHasSupportForGridView = getSettingWithCoercion(
	'postTemplateHasSupportForGridView',
	false,
	isBoolean
);

export const INNER_BLOCKS_TEMPLATE: InnerBlockTemplate[] = [
	[
		'core/post-template',
		{
			__fincommerceNamespace: PRODUCT_TEMPLATE_ID,
			/**
			 * This class is used to add default styles for inner blocks.
			 */
			className: 'products-block-post-template',
			...( postTemplateHasSupportForGridView && {
				layout: { type: 'grid', columnCount: 3 },
			} ),
		},
		[
			[
				'fincommerce/product-image',
				{
					imageSizing: ImageSizing.THUMBNAIL,
				},
			],
			[
				'core/post-title',
				{
					textAlign: 'center',
					level: 3,
					fontSize: 'medium',
					style: {
						spacing: {
							margin: {
								bottom: '0.75rem',
								top: '0',
							},
						},
					},
					isLink: true,
					__fincommerceNamespace: PRODUCT_TITLE_ID,
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
	],
	[
		'core/query-pagination',
		{
			layout: {
				type: 'flex',
				justifyContent: 'center',
			},
		},
	],
	[ 'core/query-no-results' ],
];
