/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, button } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/block.json';
import AddToCartWithOptionsVariationSelectorEdit from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/edit';
import AddToCartWithOptionsVariationSelectorSave from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/save';

registerBlockType( metadata, {
	edit: AddToCartWithOptionsVariationSelectorEdit,
	attributes: metadata.attributes,
	icon: {
		src: (
			<Icon
				icon={ button }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	save: AddToCartWithOptionsVariationSelectorSave,
} );
