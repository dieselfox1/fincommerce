/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, button } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/grouped-product-selector/product-item-selector/block.json';
import ProductItemCTAEdit from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/grouped-product-selector/product-item-selector/edit';
import '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/grouped-product-selector/product-item-selector/style.scss';

registerBlockType( metadata, {
	edit: ProductItemCTAEdit,
	attributes: metadata.attributes,
	icon: {
		src: (
			<Icon
				icon={ button }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	save: () => null,
} );
