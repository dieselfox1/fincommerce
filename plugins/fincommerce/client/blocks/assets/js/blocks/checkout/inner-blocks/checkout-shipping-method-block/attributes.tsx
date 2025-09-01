/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import formStepAttributes from '@fincommerce/block-library/assets/js/blocks/checkout/form-step/attributes';
import { defaultShippingText, defaultLocalPickupText } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/constants';

export default {
	...formStepAttributes( {
		defaultTitle: __( 'Delivery', 'fincommerce' ),
		defaultDescription: __(
			'Select how you would like to receive your order.',
			'fincommerce'
		),
	} ),
	className: {
		type: 'string',
		default: '',
	},
	showIcon: {
		type: 'boolean',
		default: true,
	},
	showPrice: {
		type: 'boolean',
		default: false,
	},
	localPickupText: {
		type: 'string',
		default: defaultLocalPickupText,
	},
	shippingText: {
		type: 'string',
		default: defaultShippingText,
	},
	lock: {
		type: 'object',
		default: {
			move: true,
			remove: true,
		},
	},
};
