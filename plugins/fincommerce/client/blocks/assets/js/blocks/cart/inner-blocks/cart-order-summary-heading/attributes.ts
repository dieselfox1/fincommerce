/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

export default {
	content: {
		type: 'string',
		default: __( 'Cart totals', 'fincommerce' ),
	},
	lock: {
		type: 'object',
		default: {
			remove: false,
			move: false,
		},
	},
};
