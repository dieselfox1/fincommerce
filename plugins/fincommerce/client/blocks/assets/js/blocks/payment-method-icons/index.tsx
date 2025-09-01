/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/payment-method-icons/block.json';
import { paymentMethodsIcon } from '@fincommerce/block-library/assets/js/blocks/payment-method-icons/icon';
import edit from '@fincommerce/block-library/assets/js/blocks/payment-method-icons/edit';
import '@fincommerce/block-library/assets/js/blocks/payment-method-icons/style.scss';

registerBlockType( metadata, {
	icon: {
		src: <Icon icon={ paymentMethodsIcon } />,
	},
	edit,
	save: () => null,
} );
