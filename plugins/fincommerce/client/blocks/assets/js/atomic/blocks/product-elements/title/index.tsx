/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title/edit';
import { Save } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title/save';
import { BLOCK_ICON } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title/constants';
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title/block.json';

registerBlockType( metadata, {
	icon: {
		src: BLOCK_ICON,
	},
	edit,
	save: Save,
} );
