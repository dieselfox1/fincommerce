/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';
import { filledCart, removeCart } from '@fincommerce/icons';

export const blockName = 'fincommerce/mini-cart-contents';

export const attributes = {
	isPreview: {
		type: 'boolean',
		default: false,
	},
	lock: {
		type: 'object',
		default: {
			remove: true,
			move: true,
		},
	},
	currentView: {
		type: 'string',
		default: 'fincommerce/filled-mini-cart-contents-block',
		source: 'readonly', // custom source to prevent saving to post content
	},
	editorViews: {
		type: 'object',
		default: [
			{
				view: 'fincommerce/filled-mini-cart-contents-block',
				label: __( 'Filled Mini-Cart', 'fincommerce' ),
				icon: <Icon icon={ filledCart } />,
			},
			{
				view: 'fincommerce/empty-mini-cart-contents-block',
				label: __( 'Empty Mini-Cart', 'fincommerce' ),
				icon: <Icon icon={ removeCart } />,
			},
		],
	},
	width: {
		type: 'string',
		default: '480px',
	},
};
