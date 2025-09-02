/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, receipt } from '@finpress/icons';

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
