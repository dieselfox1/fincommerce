/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, starFilled } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating-stars/block.json';
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating-stars/edit';

registerBlockType( metadata, {
	apiVersion: 3,
	icon: {
		src: (
			<Icon
				icon={ starFilled }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit,
} );
