/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, button } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/quantity-selector/block.json';
import AddToCartWithOptionsQuantitySelectorEdit from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/quantity-selector/edit';

registerBlockType( metadata, {
	edit: AddToCartWithOptionsQuantitySelectorEdit,
	attributes: metadata.attributes,
	icon: {
		src: (
			<Icon
				icon={ button }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	save() {
		return null;
	},
} );
