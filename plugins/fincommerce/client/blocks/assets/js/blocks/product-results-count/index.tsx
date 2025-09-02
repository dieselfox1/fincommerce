/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon } from '@finpress/icons';
import { totals } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-results-count/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-results-count/edit';
import '@fincommerce/block-library/assets/js/blocks/product-results-count/style.scss';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ totals }
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
