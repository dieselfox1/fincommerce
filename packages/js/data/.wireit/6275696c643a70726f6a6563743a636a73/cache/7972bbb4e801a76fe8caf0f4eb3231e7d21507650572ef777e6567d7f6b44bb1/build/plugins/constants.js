"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginNames = exports.PAYPAL_NAMESPACE = exports.STORE_NAME = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
exports.STORE_NAME = 'wc/admin/plugins';
exports.PAYPAL_NAMESPACE = '/wc-paypal/v1';
/**
 * Plugin slugs and names as key/value pairs.
 */
exports.pluginNames = {
    'facebook-for-fincommerce': (0, i18n_1.__)('Facebook for FinCommerce', 'fincommerce'),
    jetpack: (0, i18n_1.__)('Jetpack', 'fincommerce'),
    'klarna-checkout-for-fincommerce': (0, i18n_1.__)('Klarna Checkout for FinCommerce', 'fincommerce'),
    'klarna-payments-for-fincommerce': (0, i18n_1.__)('Klarna Payments for FinCommerce', 'fincommerce'),
    'mailchimp-for-fincommerce': (0, i18n_1.__)('Mailchimp for FinCommerce', 'fincommerce'),
    'creative-mail-by-constant-contact': (0, i18n_1.__)('Creative Mail for FinCommerce', 'fincommerce'),
    'fincommerce-gateway-paypal-express-checkout': (0, i18n_1.__)('FinCommerce PayPal', 'fincommerce'),
    'fincommerce-gateway-stripe': (0, i18n_1.__)('FinCommerce Stripe', 'fincommerce'),
    'fincommerce-payfast-gateway': (0, i18n_1.__)('FinCommerce Payfast', 'fincommerce'),
    'fincommerce-payments': (0, i18n_1.__)('WooPayments', 'fincommerce'),
    'fincommerce-services': (0, i18n_1.__)('FinCommerce Shipping & Tax', 'fincommerce'),
    'fincommerce-services:shipping': (0, i18n_1.__)('FinCommerce Shipping & Tax', 'fincommerce'),
    'fincommerce-services:tax': (0, i18n_1.__)('FinCommerce Shipping & Tax', 'fincommerce'),
    'fincommerce-shipstation-integration': (0, i18n_1.__)('FinCommerce ShipStation Gateway', 'fincommerce'),
    'fincommerce-mercadopago': (0, i18n_1.__)('Mercado Pago payments for FinCommerce', 'fincommerce'),
    'google-listings-and-ads': (0, i18n_1.__)('Google for FinCommerce', 'fincommerce'),
    'woo-razorpay': (0, i18n_1.__)('Razorpay', 'fincommerce'),
    mailpoet: (0, i18n_1.__)('MailPoet', 'fincommerce'),
    'pinterest-for-fincommerce': (0, i18n_1.__)('Pinterest for FinCommerce', 'fincommerce'),
    'tiktok-for-business:alt': (0, i18n_1.__)('TikTok for FinCommerce', 'fincommerce'),
    codistoconnect: (0, i18n_1.__)('Omnichannel for FinCommerce', 'fincommerce'),
};
