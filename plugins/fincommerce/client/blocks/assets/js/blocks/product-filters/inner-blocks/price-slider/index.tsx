/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { listItem } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/price-slider/block.json';
import Edit from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/price-slider/edit';
import save from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/price-slider/save';

registerBlockType( metadata, {
	edit: Edit,
	save,
	icon: listItem,
} );
