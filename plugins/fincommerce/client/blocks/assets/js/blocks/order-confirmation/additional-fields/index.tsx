/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, info } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/order-confirmation/additional-fields/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/order-confirmation/additional-fields/edit';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ info }
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
