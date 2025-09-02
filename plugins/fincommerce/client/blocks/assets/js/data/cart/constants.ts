/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

export const STORE_KEY = 'wc/store/cart';
export const CART_API_ERROR = {
	code: 'cart_api_error',
	message: __( 'Unable to get cart data from the API.', 'fincommerce' ),
	data: {
		status: 500,
	},
};
