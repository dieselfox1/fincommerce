/**
 * External dependencies
 */
import { queryPaginationNumbers as icon } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination-numbers/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination-numbers/edit';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata, {
	icon,
	edit,
	example: {},
} );
