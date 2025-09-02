/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { layout as icon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-template/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-template/edit';
import save from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-template/save';
import '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-template/style.scss';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata.name, {
	icon,
	edit,
	save,
} );
