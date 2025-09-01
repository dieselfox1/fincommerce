/**
 * External dependencies
 */
import { WC_BLOCKS_BUILD_URL } from '@fincommerce/block-settings';
import { registerCheckoutBlock } from '@fincommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/component-metadata';
import FilledCartFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/filled-cart-block/frontend';
import EmptyCartFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/empty-cart-block/frontend';
import CartItemsFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-items-block/frontend';
import CartLineItemsBlock from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-line-items-block/frontend';
import CartCrossSellsFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-block/frontend';
import CartCrossSellsProductsFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-products/frontend';
import CartTotalsFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-totals-block/frontend';
import CartExpressPaymentFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-express-payment-block/frontend';
import ProceedToCheckoutFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/proceed-to-checkout-block/frontend';
import CartAcceptedPaymentMethodsFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-accepted-payment-methods-block/frontend';
import CartOrderSummaryFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-block/frontend';
import CartOrderSummaryHeadingFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-heading/frontend';
import CartOrderSummarySubtotalFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-subtotal/frontend';
import CartOrderSummaryFeeFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-fee/frontend';
import CartOrderSummaryDiscountFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-discount/frontend';
import CartOrderSummaryCouponFormFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-coupon-form/frontend';
import CartOrderSummaryShippingFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-shipping/frontend';
import CartOrderSummaryTotalsFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-totals/frontend';
import CartOrderSummaryTaxesFrontend from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-taxes/frontend';

// Modify webpack publicPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

registerCheckoutBlock( {
	metadata: metadata.FILLED_CART,
	component: FilledCartFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.EMPTY_CART,
	component: EmptyCartFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ITEMS,
	component: CartItemsFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_LINE_ITEMS,
	component: CartLineItemsBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_CROSS_SELLS,
	component: CartCrossSellsFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_CROSS_SELLS_PRODUCTS,
	component: CartCrossSellsProductsFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_TOTALS,
	component: CartTotalsFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_EXPRESS_PAYMENT,
	component: CartExpressPaymentFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.PROCEED_TO_CHECKOUT,
	component: ProceedToCheckoutFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ACCEPTED_PAYMENT_METHODS,
	component: CartAcceptedPaymentMethodsFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ORDER_SUMMARY,
	component: CartOrderSummaryFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ORDER_SUMMARY_HEADING,
	component: CartOrderSummaryHeadingFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ORDER_SUMMARY_SUBTOTAL,
	component: CartOrderSummarySubtotalFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ORDER_SUMMARY_FEE,
	component: CartOrderSummaryFeeFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ORDER_SUMMARY_DISCOUNT,
	component: CartOrderSummaryDiscountFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ORDER_SUMMARY_COUPON_FORM,
	component: CartOrderSummaryCouponFormFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ORDER_SUMMARY_SHIPPING,
	component: CartOrderSummaryShippingFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ORDER_SUMMARY_TOTALS,
	component: CartOrderSummaryTotalsFrontend,
} );

registerCheckoutBlock( {
	metadata: metadata.CART_ORDER_SUMMARY_TAXES,
	component: CartOrderSummaryTaxesFrontend,
} );
