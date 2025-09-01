/**
 * External dependencies
 */
import { gallery as icon } from '@wordpress/icons';
import { registerProductBlockType } from '@fincommerce/atomic-utils';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/product-image-gallery/edit';
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/product-image-gallery/block.json';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/product-image-gallery/style.scss';

const galleryBlock = 'fincommerce/product-gallery';

const blockConfig = {
	...metadata,
	icon,
	edit,
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ galleryBlock ],
				transform: () => {
					return createBlock( galleryBlock );
				},
			},
		],
	},
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: false,
} );
