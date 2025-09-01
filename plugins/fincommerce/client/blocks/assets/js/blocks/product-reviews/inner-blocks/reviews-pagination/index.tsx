/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { queryPagination as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination/edit';
import save from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination/save';
import '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination/style.scss';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata, {
	icon,
	edit,
	save,
} );
