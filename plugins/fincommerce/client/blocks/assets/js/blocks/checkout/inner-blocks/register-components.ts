/**
 * External dependencies
 */
import {
	WC_BLOCKS_BUILD_URL,
	LOCAL_PICKUP_ENABLED,
} from '@fincommerce/block-settings';
import { registerCheckoutBlock } from '@fincommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/component-metadata';
import CheckoutFieldsBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-fields-block/frontend';
import CheckoutExpressPaymentBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-express-payment-block/frontend';
import CheckoutContactInformationBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-contact-information-block/frontend';
import CheckoutShippingMethodBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/frontend';
import CheckoutPickupOptionsBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-pickup-options-block/frontend';
import CheckoutShippingAddressBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-address-block/frontend';
import CheckoutBillingAddressBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-billing-address-block/frontend';
import CheckoutShippingMethodsBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-methods-block/frontend';
import CheckoutPaymentBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-payment-block/frontend';
import CheckoutAdditionalInformationBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-additional-information-block/frontend';
import CheckoutOrderNoteBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-note-block/block';
import CheckoutTermsBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-terms-block/frontend';
import CheckoutActionsBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/frontend';
import CheckoutTotalsBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-totals-block/frontend';
import CheckoutOrderSummaryBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-block/frontend';
import CheckoutOrderSummaryCartItemsBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-cart-items/frontend';
import CheckoutOrderSummarySubtotalBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-subtotal/frontend';
import CheckoutOrderSummaryFeeBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-fee/frontend';
import CheckoutOrderSummaryDiscountBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-discount/frontend';
import CheckoutOrderSummaryCouponFormBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-coupon-form/frontend';
import CheckoutOrderSummaryShippingBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-shipping/frontend';
import CheckoutOrderSummaryTaxesBlock from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-taxes/frontend';

// Modify webpack publicPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

// @todo When forcing all blocks at once, they will append based on the order they are registered. Introduce formal sorting param.
registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_FIELDS,
	component: CheckoutFieldsBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_EXPRESS_PAYMENT,
	component: CheckoutExpressPaymentBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_CONTACT_INFORMATION,
	component: CheckoutContactInformationBlock,
} );

if ( LOCAL_PICKUP_ENABLED ) {
	registerCheckoutBlock( {
		metadata: metadata.CHECKOUT_SHIPPING_METHOD,
		component: CheckoutShippingMethodBlock,
	} );
	registerCheckoutBlock( {
		metadata: metadata.CHECKOUT_PICKUP_LOCATION,
		component: CheckoutPickupOptionsBlock,
	} );
}

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_SHIPPING_ADDRESS,
	component: CheckoutShippingAddressBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_BILLING_ADDRESS,
	component: CheckoutBillingAddressBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_SHIPPING_METHODS,
	component: CheckoutShippingMethodsBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_PAYMENT,
	component: CheckoutPaymentBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ORDER_INFORMATION,
	component: CheckoutAdditionalInformationBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ORDER_NOTE,
	component: CheckoutOrderNoteBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_TERMS,
	component: CheckoutTermsBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ACTIONS,
	component: CheckoutActionsBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_TOTALS,
	component: CheckoutTotalsBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ORDER_SUMMARY,
	component: CheckoutOrderSummaryBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ORDER_SUMMARY_CART_ITEMS,
	component: CheckoutOrderSummaryCartItemsBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ORDER_SUMMARY_SUBTOTAL,
	component: CheckoutOrderSummarySubtotalBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ORDER_SUMMARY_FEE,
	component: CheckoutOrderSummaryFeeBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ORDER_SUMMARY_DISCOUNT,
	component: CheckoutOrderSummaryDiscountBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ORDER_SUMMARY_COUPON_FORM,
	component: CheckoutOrderSummaryCouponFormBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ORDER_SUMMARY_SHIPPING,
	component: CheckoutOrderSummaryShippingBlock,
} );

registerCheckoutBlock( {
	metadata: metadata.CHECKOUT_ORDER_SUMMARY_TAXES,
	component: CheckoutOrderSummaryTaxesBlock,
} );
