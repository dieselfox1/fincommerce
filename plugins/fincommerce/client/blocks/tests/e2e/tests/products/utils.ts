/**
 * External dependencies
 */
import type { Page } from '@playwright/test';
import type { Editor } from '@fincommerce/e2e-utils';

export const getProductsNameFromClassicTemplate = async ( page: Page ) => {
	const products = page.locator( '.fincommerce-loop-product__title' );
	return products.allTextContents();
};

export const getProductsNameFromProductQuery = async ( page: Page ) => {
	const products = page.locator( '.wp-block-query .wp-block-post-title' );
	return products.allTextContents();
};

export const productQueryInnerBlocksTemplate = [
	{
		name: 'core/post-template',
		attributes: {
			__fincommerceNamespace:
				'fincommerce/product-query/product-template',
		},
		innerBlocks: [
			{ name: 'fincommerce/product-image' },
			{
				name: 'core/post-title',
				attributes: {
					__fincommerceNamespace:
						'fincommerce/product-query/product-title',
				},
			},
			{ name: 'fincommerce/product-price' },
			{ name: 'fincommerce/product-button' },
		],
	},
	{ name: 'core/query-pagination' },
	{ name: 'core/query-no-results' },
];

export const insertProductsQuery = async ( editor: Editor ) => {
	await editor.insertBlock( {
		name: 'core/query',
		attributes: {
			namespace: 'fincommerce/product-query',
			query: {
				inherit: true,
			},
		},
		innerBlocks: productQueryInnerBlocksTemplate,
	} );
};
