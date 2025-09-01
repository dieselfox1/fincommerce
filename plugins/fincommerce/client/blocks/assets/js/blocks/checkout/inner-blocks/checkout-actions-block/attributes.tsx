/**
 * Internal dependencies
 */
import {
	defaultPlaceOrderButtonLabel,
	defaultReturnToCartButtonLabel,
} from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/constants';

export default {
	placeOrderButtonLabel: {
		type: 'string',
		default: defaultPlaceOrderButtonLabel,
	},
	returnToCartButtonLabel: {
		type: 'string',
		default: defaultReturnToCartButtonLabel,
	},
};
