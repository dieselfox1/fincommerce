/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { button as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/clear-button/block.json';
import Edit from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/clear-button/edit';
import save from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/clear-button/save';
import '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/clear-button/style.scss';

registerBlockType( metadata, {
	icon,
	edit: Edit,
	save,
} );
