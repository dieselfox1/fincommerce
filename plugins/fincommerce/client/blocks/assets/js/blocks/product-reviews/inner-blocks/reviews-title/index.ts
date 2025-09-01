/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { title as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-title/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-title/edit';
import '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-title/style.scss';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata, {
	edit,
	icon,
} );
