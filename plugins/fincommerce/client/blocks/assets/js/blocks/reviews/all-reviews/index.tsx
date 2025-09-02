/**
 * External dependencies
 */
import { createBlock, registerBlockType } from '@finpress/blocks';
import { Icon, postComments } from '@finpress/icons';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/reviews/editor.scss';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/reviews/all-reviews/edit';
import sharedAttributes from '@fincommerce/block-library/assets/js/blocks/reviews/attributes';
import save from '@fincommerce/block-library/assets/js/blocks/reviews/save';
import { example } from '@fincommerce/block-library/assets/js/blocks/reviews/example';
import type { AllReviewsEditorProps } from '@fincommerce/block-library/assets/js/blocks/reviews/all-reviews/types';
import metadata from '@fincommerce/block-library/assets/js/blocks/reviews/all-reviews/block.json';

/**
 * Register and run the "All Reviews" block.
 * This block lists all product reviews.
 */
registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ postComments }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	example: {
		...example,
		attributes: {
			...example.attributes,
			showProductName: true,
		},
	},
	attributes: {
		...sharedAttributes,
		/**
		 * Show the product name.
		 */
		showProductName: {
			type: 'boolean',
			default: true,
		},
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/legacy-widget' ],
				// We can't transform if raw instance isn't shown in the REST API.
				isMatch: ( { idBase, instance }: AllReviewsEditorProps ) =>
					idBase === 'fincommerce_recent_reviews' && !! instance?.raw,
				transform: ( { instance } ) =>
					createBlock( 'fincommerce/all-reviews', {
						reviewsOnPageLoad: instance.raw.number,
						imageType: 'product',
						showLoadMore: false,
						showOrderby: false,
						showReviewDate: false,
						showReviewContent: false,
					} ),
			},
		],
	},

	edit: Edit,
	save,
} );
