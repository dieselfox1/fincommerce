/**
 * External dependencies
 */
import { registerBlockComponent } from '@fincommerce/blocks-registry';
import { lazy } from '@wordpress/element';
import { WC_BLOCKS_BUILD_URL } from '@fincommerce/block-settings';

// Modify webpack publicPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

registerBlockComponent( {
	blockName: 'fincommerce/product-price',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-price" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/price/block'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-image',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-image" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/frontend'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-title',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-title" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title/frontend'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-rating',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-rating" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating/block'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-rating-stars',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-rating-stars" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating-stars/block'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-rating-counter',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-rating-counter" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating-counter/block'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-average-rating',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-average-rating" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/average-rating/block'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-button',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-button" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/button/block'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-summary',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-summary" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/summary/block'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-sale-badge',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-sale-badge" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge/block'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-sku',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-sku" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sku/block'
		)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/product-stock-indicator',
	component: lazy( () =>
		import(
			/* webpackChunkName: "product-stock-indicator" */ '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/stock-indicator/block'
		)
	),
} );
