/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-template/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-template/edit';
import save from '@fincommerce/block-library/assets/js/blocks/product-template/save';
import icon from '@fincommerce/block-library/assets/js/blocks/product-template/icon';

registerBlockType( metadata, {
	icon,
	edit,
	save,
} );
