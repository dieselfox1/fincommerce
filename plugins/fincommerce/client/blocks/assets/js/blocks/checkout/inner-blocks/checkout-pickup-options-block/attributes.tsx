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
		defaultTitle: __( 'Pickup locations', 'fincommerce' ),
		defaultDescription: '',
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
