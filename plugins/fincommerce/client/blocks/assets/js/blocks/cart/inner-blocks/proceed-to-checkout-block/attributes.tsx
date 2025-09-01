/**
 * Internal dependencies
 */
import { defaultButtonLabel } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/proceed-to-checkout-block/constants';

export default {
	checkoutPageId: {
		type: 'number',
		default: 0,
	},
	lock: {
		type: 'object',
		default: {
			move: true,
			remove: true,
		},
	},
	buttonLabel: {
		type: 'string',
		default: defaultButtonLabel,
	},
};
