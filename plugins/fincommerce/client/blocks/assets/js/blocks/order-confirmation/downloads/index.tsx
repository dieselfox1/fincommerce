/**
 * External dependencies
 */
import { registerBlockType, type BlockConfiguration } from '@finpress/blocks';
import { Icon, download } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/order-confirmation/downloads/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/order-confirmation/downloads/edit';
import '@fincommerce/block-library/assets/js/blocks/order-confirmation/downloads/style.scss';

registerBlockType( metadata as BlockConfiguration, {
	icon: {
		src: (
			<Icon
				icon={ download }
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
