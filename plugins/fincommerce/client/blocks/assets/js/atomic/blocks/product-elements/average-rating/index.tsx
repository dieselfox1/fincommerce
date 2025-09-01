/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, starHalf } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/average-rating/block.json';
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/average-rating/edit';

registerBlockType( metadata, {
	apiVersion: 3,
	icon: {
		src: (
			<Icon
				icon={ starHalf }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit,
} );
