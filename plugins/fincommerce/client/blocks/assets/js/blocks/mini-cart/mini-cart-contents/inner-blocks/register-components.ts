/**
 * External dependencies
 */
import { WC_BLOCKS_BUILD_URL } from '@fincommerce/block-settings';
import { registerCheckoutBlock } from '@fincommerce/blocks-checkout';
import { lazy } from '@wordpress/element';
/**
 * Internal dependencies
 */
import emptyMiniCartContentsMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/empty-mini-cart-contents-block/block.json';
import filledMiniCartMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/filled-mini-cart-contents-block/block.json';
import miniCartTitleMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-title-block/block.json';
import miniCartTitleItemsCounterMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-title-items-counter-block/block.json';
import miniCartTitleLabelBlockMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-title-label-block/block.json';
import miniCartProductsTableMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-products-table-block/block.json';
import miniCartFooterMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-footer-block/block.json';
import miniCartItemsMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-items-block/block.json';
import miniCartShoppingButtonMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-shopping-button-block/block.json';
import miniCartCartButtonMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-cart-button-block/block.json';
import miniCartCheckoutButtonMetadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-checkout-button-block/block.json';

// Modify webpack publicPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

registerCheckoutBlock( {
	metadata: filledMiniCartMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/filled-cart" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/filled-mini-cart-contents-block/frontend'
			)
	),
} );

registerCheckoutBlock( {
	metadata: emptyMiniCartContentsMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/empty-cart" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/empty-mini-cart-contents-block/frontend'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartTitleMetadata,
	force: false,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/title" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-title-block/block'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartTitleItemsCounterMetadata,
	force: false,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/title-items-counter" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-title-items-counter-block/block'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartTitleLabelBlockMetadata,
	force: false,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/title-label" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-title-label-block/block'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartItemsMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/items" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-items-block/frontend'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartProductsTableMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/products-table" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-products-table-block/block'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartFooterMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/footer" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-footer-block/block'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartShoppingButtonMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/shopping-button" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-shopping-button-block/block'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartCartButtonMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/cart-button" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-cart-button-block/block'
			)
	),
} );

registerCheckoutBlock( {
	metadata: miniCartCheckoutButtonMetadata,
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "mini-cart-contents-block/checkout-button" */ '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-checkout-button-block/block'
			)
	),
} );
