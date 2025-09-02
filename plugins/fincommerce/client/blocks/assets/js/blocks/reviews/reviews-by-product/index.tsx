/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, commentContent } from '@finpress/icons';
/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/reviews/editor.scss';
import Editor from '@fincommerce/block-library/assets/js/blocks/reviews/reviews-by-product/edit';
import sharedAttributes from '@fincommerce/block-library/assets/js/blocks/reviews/attributes';
import save from '@fincommerce/block-library/assets/js/blocks/reviews/save';
import { example } from '@fincommerce/block-library/assets/js/blocks/reviews/example';
import metadata from '@fincommerce/block-library/assets/js/blocks/reviews/reviews-by-product/block.json';
/**
 * Register and run the "Reviews by Product" block.
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
			productId: 1,
		},
	},
	attributes: {
		...sharedAttributes,
		/**
		 * The id of the product to load reviews for.
		 */
		productId: {
			type: 'number',
		},
	},

	/**
	 * Renders and manages the block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit( props ) {
		return <Editor { ...props } />;
	},

	/**
	 * Save the props to post content.
	 */
	save,
} );
