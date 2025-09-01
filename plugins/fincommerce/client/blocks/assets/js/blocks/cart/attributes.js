/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { getSetting } from '@fincommerce/settings';
import { Icon } from '@wordpress/icons';
import { filledCart, removeCart } from '@fincommerce/icons';

export const blockName = 'fincommerce/cart';
export const blockAttributes = {
	isPreview: {
		type: 'boolean',
		default: false,
	},
	currentView: {
		type: 'string',
		default: 'fincommerce/filled-cart-block',
		source: 'readonly', // custom source to prevent saving to post content
	},
	editorViews: {
		type: 'object',
		default: [
			{
				view: 'fincommerce/filled-cart-block',
				label: __( 'Filled Cart', 'fincommerce' ),
				icon: <Icon icon={ filledCart } />,
			},
			{
				view: 'fincommerce/empty-cart-block',
				label: __( 'Empty Cart', 'fincommerce' ),
				icon: <Icon icon={ removeCart } />,
			},
		],
	},
	hasDarkControls: {
		type: 'boolean',
		default: getSetting( 'hasDarkEditorStyleSupport', false ),
	},
	// Deprecated - here for v1 migration support
	checkoutPageId: {
		type: 'number',
		default: 0,
	},
	showRateAfterTaxName: {
		type: 'boolean',
		default: true,
	},
	align: {
		type: 'string',
		default: 'wide',
	},
};
