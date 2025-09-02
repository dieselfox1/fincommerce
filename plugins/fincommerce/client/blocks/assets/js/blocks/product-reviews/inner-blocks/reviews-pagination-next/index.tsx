/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { queryPaginationNext as icon } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination-next/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination-next/edit';

// @ts-expect-error metadata is not typed.
registerBlockType( metadata, {
	icon,
	edit,
	example: {
		attributes: {
			label: __( 'Newer Reviews', 'fincommerce' ),
		},
	},
} );
