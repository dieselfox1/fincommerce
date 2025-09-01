/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TemplateDetails } from '@fincommerce/block-library/assets/js/blocks/classic-shortcode/types';

export const TYPES = {
	cart: 'cart',
	checkout: 'checkout',
};
export const PLACEHOLDERS = {
	cart: 'cart',
	checkout: 'checkout',
};

export const TEMPLATES: TemplateDetails = {
	cart: {
		type: TYPES.cart,
		// Title shows up in the list view in the site editor.
		title: __( 'Cart Shortcode', 'fincommerce' ),
		// Description in the site editor.
		description: __( 'Renders the classic cart shortcode.', 'fincommerce' ),
		placeholder: PLACEHOLDERS.cart,
	},
	checkout: {
		type: TYPES.checkout,
		title: __( 'Checkout Cart', 'fincommerce' ),
		description: __(
			'Renders the classic checkout shortcode.',
			'fincommerce'
		),
		placeholder: PLACEHOLDERS.checkout,
	},
};
