/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, button } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/attribute/block.json';
import AttributeItemTemplateEdit from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/attribute/edit';
import AttributeItemTemplateSave from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/attribute/save';

registerBlockType( metadata, {
	edit: AttributeItemTemplateEdit,
	attributes: metadata.attributes,
	icon: {
		src: (
			<Icon
				icon={ button }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	save: AttributeItemTemplateSave,
} );
