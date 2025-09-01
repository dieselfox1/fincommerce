/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { productFilterActive } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/active-filters/block.json';
import Edit from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/active-filters/edit';
import Save from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/active-filters/save';

registerBlockType( metadata, {
	icon: productFilterActive,
	edit: Edit,
	save: Save,
} );
