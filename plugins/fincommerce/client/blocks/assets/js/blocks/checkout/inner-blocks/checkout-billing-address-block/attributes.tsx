/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import formStepAttributes from '@fincommerce/block-library/assets/js/blocks/checkout/form-step/attributes';
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-billing-address-block/constants';

const attributes: BlockAttributes = {
	...formStepAttributes( {
		defaultTitle: DEFAULT_TITLE,
		defaultDescription: DEFAULT_DESCRIPTION,
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
export default attributes;
