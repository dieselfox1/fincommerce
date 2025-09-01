/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { postDate as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-date/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-date/edit';
import '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-date/style.scss';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata, {
	icon,
	edit,
} );
