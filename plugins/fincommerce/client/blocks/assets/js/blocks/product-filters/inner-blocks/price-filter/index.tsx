/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { productFilterPrice } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/price-filter/block.json';
import Edit from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/price-filter/edit';
import Save from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/price-filter/save';

registerBlockType( metadata, {
	icon: productFilterPrice,
	edit: Edit,
	save: Save,
} );
