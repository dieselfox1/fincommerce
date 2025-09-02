/**
 * External dependencies
 */
import { Icon, button } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-checkout-button-block/edit';
import attributes from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-checkout-button-block/attributes';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- TypeScript expects some required properties which we already
// registered in PHP.
registerBlockType( 'fincommerce/mini-cart-checkout-button-block', {
	icon: {
		src: (
			<Icon
				icon={ button }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes,
	edit: Edit,
	save: Save,
} );
