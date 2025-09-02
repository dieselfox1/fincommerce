/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { queryPaginationPrevious as icon } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination-previous/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination-previous/edit';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata, {
	icon,
	edit,
	example: {
		attributes: {
			label: __( 'Older Reviews', 'fincommerce' ),
		},
	},
} );
