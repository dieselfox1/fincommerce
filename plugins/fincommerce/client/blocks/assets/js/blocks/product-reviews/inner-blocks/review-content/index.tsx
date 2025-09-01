/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { commentContent as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-content/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-content/edit';
import '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-content/style.scss';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata, {
	icon,
	edit,
} );
