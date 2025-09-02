/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { postCommentsForm as icon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-form/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-form/edit';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata, {
	icon,
	edit,
} );
