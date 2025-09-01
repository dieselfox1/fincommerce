/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/icons';
import { barcode } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sku/block.json';
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sku/edit';
registerBlockType( metadata, {
	icon: (
		<Icon
			icon={ barcode }
			className="wc-block-editor-components-block-icon"
		/>
	),
	edit,
	save() {
		return null;
	},
} );
