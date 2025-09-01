/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { productFilterRating as icon } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/rating-filter/edit';
import save from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/rating-filter/save';
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/rating-filter/block.json';

registerBlockType( metadata, {
	icon,
	attributes: {
		...metadata.attributes,
	},
	edit,
	save,
} );
