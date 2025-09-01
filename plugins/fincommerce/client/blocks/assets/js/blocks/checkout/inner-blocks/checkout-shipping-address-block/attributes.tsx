/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import formStepAttributes from '@fincommerce/block-library/assets/js/blocks/checkout/form-step/attributes';

export default {
	...formStepAttributes( {
		defaultTitle: __( 'Shipping address', 'fincommerce' ),
		defaultDescription: __(
			'Enter the address where you want your order delivered.',
			'fincommerce'
		),
	} ),
	className: {
		type: 'string',
		default: '',
	},
	lock: {
		type: 'object',
		default: {
			move: true,
			remove: true,
		},
	},
};
