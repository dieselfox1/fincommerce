/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { productFilterStatus } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/status-filter/style.scss';
import edit from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/status-filter/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/status-filter/block.json';
import save from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/status-filter/save';

registerBlockType( metadata, {
	icon: productFilterStatus,
	save,
	edit,
} );
