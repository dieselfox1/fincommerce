/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, commentContent } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { Edit } from '@fincommerce/block-library/assets/js/blocks/reviews/reviews-by-category/edit';
import sharedAttributes from '@fincommerce/block-library/assets/js/blocks/reviews/attributes';
import save from '@fincommerce/block-library/assets/js/blocks/reviews/save';
import { example } from '@fincommerce/block-library/assets/js/blocks/reviews/example';
import metadata from '@fincommerce/block-library/assets/js/blocks/reviews/reviews-by-category/block.json';
/**
 * Register and run the "Reviews by category" block.
 */
registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ commentContent }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	example: {
		...example,
		attributes: {
			...example.attributes,
			categoryIds: [ 1 ],
			showProductName: true,
		},
	},
	attributes: {
		...sharedAttributes,
		/**
		 * The ids of the categories to load reviews for.
		 */
		categoryIds: {
			type: 'array',
			default: [],
		},
		/**
		 * Show the product name.
		 */
		showProductName: {
			type: 'boolean',
			default: true,
		},
	},

	/**
	 * Renders and manages the block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit: Edit,

	/**
	 * Save the props to post content.
	 */
	save,
} );
