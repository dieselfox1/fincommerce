/**
 * External dependencies
 */
import type { BlockConfiguration } from '@wordpress/blocks';
import { registerProductBlockType } from '@fincommerce/atomic-utils';

/**
 * Internal dependencies
 */
import save from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/save';
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating/edit';
import { BLOCK_ICON as icon } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating/constants';
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating/block.json';

const blockConfig: BlockConfiguration = {
	...metadata,
	icon: { src: icon },
	edit,
	save,
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
