/**
 * External dependencies
 */
import { productFilterOptions } from '@fincommerce/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/removable-chips/block.json';
import Edit from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/removable-chips/edit';
import Save from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/removable-chips/save';

registerBlockType( metadata, {
	edit: Edit,
	icon: productFilterOptions,
	save: Save,
} );
