/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { starHalf } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-rating/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-rating/edit';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata, {
	edit,
	icon: starHalf,
} );
