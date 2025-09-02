/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, grid } from '@finpress/icons';
import '@fincommerce/atomic-blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/products/all-products/block.json';
import deprecated from '@fincommerce/block-library/assets/js/blocks/products/all-products/deprecated';
import edit from '@fincommerce/block-library/assets/js/blocks/products/all-products/edit';
import save from '@fincommerce/block-library/assets/js/blocks/products/all-products/save';
import defaults from '@fincommerce/block-library/assets/js/blocks/products/all-products/defaults';

const { name } = metadata;
export { metadata, name };

const settings = {
	icon: {
		src: (
			<Icon
				icon={ grid }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit,
	// Save the props to post content.
	save,
	deprecated,
	defaults,
};

registerBlockType( name, settings );
