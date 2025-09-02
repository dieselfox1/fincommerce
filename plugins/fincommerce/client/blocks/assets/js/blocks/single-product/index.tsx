/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { BLOCK_ICON } from '@fincommerce/block-library/assets/js/blocks/single-product/constants';
import metadata from '@fincommerce/block-library/assets/js/blocks/single-product/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/single-product/edit';
import save from '@fincommerce/block-library/assets/js/blocks/single-product/save';
import deprecated from '@fincommerce/block-library/assets/js/blocks/single-product/deprecated';

// @ts-expect-error: `registerBlockType` is a function that is typed in finpress core.
registerBlockType( metadata, {
	icon: BLOCK_ICON,
	edit,
	save,
	deprecated,
} );
