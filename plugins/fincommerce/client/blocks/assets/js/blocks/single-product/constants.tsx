/**
 * External dependencies
 */
import { Icon, mediaAndText } from '@wordpress/icons';
import { getBlockMap } from '@fincommerce/atomic-utils';
import type { InnerBlockTemplate } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/single-product/block.json';
import { VARIATION_NAME as PRODUCT_TITLE_VARIATION_NAME } from '@fincommerce/block-library/assets/js/blocks/product-query/variations/elements/product-title';
import { ImageSizing } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/types';

export const BLOCK_ICON = (
	<Icon
		icon={ mediaAndText }
		className="wc-block-editor-components-block-icon"
	/>
);

export const DEFAULT_INNER_BLOCKS: InnerBlockTemplate[] = [
	[
		'core/columns',
		{},
		[
			[
				'core/column',
				{},
				[
					[
						'fincommerce/product-image',
						{
							// Keep the attribute as false explicitly because we're using the inner block template
							// that includes the product-sale-badge block.
							showSaleBadge: false,
							isDescendentOfSingleProductBlock: true,
							imageSizing: ImageSizing.SINGLE,
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
				],
			],
			[
				'core/column',
				{},
				[
					[
						'core/post-title',
						{
							headingLevel: 2,
							isLink: true,
							__fincommerceNamespace:
								PRODUCT_TITLE_VARIATION_NAME,
						},
					],
					[
						'fincommerce/product-rating',
						{ isDescendentOfSingleProductBlock: true },
					],
					[
						'fincommerce/product-price',
						{ isDescendentOfSingleProductBlock: true },
					],
					[
						'fincommerce/product-summary',
						{ isDescendentOfSingleProductBlock: true },
					],
					[ 'fincommerce/add-to-cart-form' ],
					[ 'fincommerce/product-meta' ],
				],
			],
		],
	],
];

export const ALLOWED_INNER_BLOCKS = [
	'core/columns',
	'core/column',
	'core/post-title',
	'core/post-excerpt',
	'fincommerce/add-to-cart-form',
	'fincommerce/add-to-cart-with-options',
	'fincommerce/product-meta',
	'fincommerce/product-gallery',
	'fincommerce/product-reviews',
	'fincommerce/product-details',
	...Object.keys( getBlockMap( metadata.name ) ),
];
