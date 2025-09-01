/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { queryPaginationNext as icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

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
