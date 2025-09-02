/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { commentAuthorName as icon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-author-name/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-author-name/edit';
import '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-author-name/style.scss';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata.name, {
	icon,
	edit,
} );
