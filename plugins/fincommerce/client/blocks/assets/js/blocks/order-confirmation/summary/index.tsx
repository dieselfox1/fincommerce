/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, receipt } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/order-confirmation/summary/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/order-confirmation/summary/edit';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ receipt }
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
