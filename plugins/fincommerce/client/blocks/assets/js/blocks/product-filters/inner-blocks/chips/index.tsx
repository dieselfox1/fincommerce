/**
 * External dependencies
 */
import { productFilterOptions } from '@fincommerce/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/chips/block.json';
import Edit from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/chips/edit';
import Save from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/chips/save';

registerBlockType( metadata, {
	edit: Edit,
	icon: productFilterOptions,
	save: Save,
} );
