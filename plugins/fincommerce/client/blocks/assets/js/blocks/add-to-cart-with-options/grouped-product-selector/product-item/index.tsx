/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, button } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/grouped-product-selector/product-item/block.json';
import ProductItemTemplateEdit from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/grouped-product-selector/product-item/edit';
import ProductItemTemplateSave from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/grouped-product-selector/product-item/save';

registerBlockType( metadata, {
	edit: ProductItemTemplateEdit,
	attributes: metadata.attributes,
	icon: {
		src: (
			<Icon
				icon={ button }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	save: ProductItemTemplateSave,
} );
