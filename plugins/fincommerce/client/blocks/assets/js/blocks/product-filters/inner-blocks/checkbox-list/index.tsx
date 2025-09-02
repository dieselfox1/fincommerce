/**
 * External dependencies
 */
import { productFilterOptions } from '@fincommerce/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/checkbox-list/block.json';
import Edit from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/checkbox-list/edit';
import Save from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/checkbox-list/save';

registerBlockType( metadata, {
	edit: Edit,
	icon: productFilterOptions,
	save: Save,
} );
