/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { loop as loopIcon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-collection/inner-blocks/no-results/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-collection/inner-blocks/no-results/edit';
import save from '@fincommerce/block-library/assets/js/blocks/product-collection/inner-blocks/no-results/save';

registerBlockType( metadata, {
	icon: loopIcon,
	edit,
	save,
} );
