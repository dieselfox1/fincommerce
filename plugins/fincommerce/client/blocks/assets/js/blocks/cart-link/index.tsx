/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon } from '@finpress/icons';
import { cart } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/cart-link/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/cart-link/edit';
import '@fincommerce/block-library/assets/js/blocks/cart-link/style.scss';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ cart }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
	},
	edit,
	save() {
		return null;
	},
} );
