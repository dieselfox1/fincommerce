/**
 * External dependencies
 */
import type { LazyExoticComponent } from '@finpress/element';
import type { BlockConfiguration } from '@finpress/blocks';
import type { RegisteredBlockComponent } from '@fincommerce/types';

export enum innerBlockAreas {
	CHECKOUT = 'fincommerce/checkout',
	CHECKOUT_FIELDS = 'fincommerce/checkout-fields-block',
	CHECKOUT_TOTALS = 'fincommerce/checkout-totals-block',
	CONTACT_INFORMATION = 'fincommerce/checkout-contact-information-block',
	SHIPPING_ADDRESS = 'fincommerce/checkout-shipping-address-block',
	BILLING_ADDRESS = 'fincommerce/checkout-billing-address-block',
	SHIPPING_METHOD = 'fincommerce/checkout-shipping-method-block',
	SHIPPING_METHODS = 'fincommerce/checkout-shipping-methods-block',
	PICKUP_LOCATION = 'fincommerce/checkout-pickup-options-block',
	PAYMENT_METHODS = 'fincommerce/checkout-payment-block',
	CART = 'fincommerce/cart',
	EMPTY_CART = 'fincommerce/empty-cart-block',
	FILLED_CART = 'fincommerce/filled-cart-block',
	CART_ITEMS = 'fincommerce/cart-items-block',
	CART_CROSS_SELLS = 'fincommerce/cart-cross-sells-block',
	CART_TOTALS = 'fincommerce/cart-totals-block',
	MINI_CART = 'fincommerce/mini-cart-contents',
	EMPTY_MINI_CART = 'fincommerce/empty-mini-cart-contents-block',
	FILLED_MINI_CART = 'fincommerce/filled-mini-cart-contents-block',
	MINI_CART_TITLE = 'fincommerce/mini-cart-title-block',
	MINI_CART_ITEMS = 'fincommerce/mini-cart-items-block',
	MINI_CART_FOOTER = 'fincommerce/mini-cart-footer-block',
	CART_ORDER_SUMMARY = 'fincommerce/cart-order-summary-block',
	CART_ORDER_SUMMARY_TOTALS = 'fincommerce/cart-order-summary-totals-block',
	CHECKOUT_ORDER_SUMMARY = 'fincommerce/checkout-order-summary-block',
	CHECKOUT_ORDER_SUMMARY_TOTALS = 'fincommerce/checkout-order-summary-totals-block',
}

interface CheckoutBlockOptionsMetadata extends Partial< BlockConfiguration > {
	name: string;
	parent: string[];
}

export type RegisteredBlock = {
	blockName: string;
	metadata: CheckoutBlockOptionsMetadata;
	component: RegisteredBlockComponent;
	force: boolean;
};

export type RegisteredBlocks = Record< string, RegisteredBlock >;

export type CheckoutBlockOptions = {
	metadata: CheckoutBlockOptionsMetadata;
	force?: boolean;
	component:
		| LazyExoticComponent< React.ComponentType< unknown > >
		| ( () => JSX.Element | null )
		| null;
};
