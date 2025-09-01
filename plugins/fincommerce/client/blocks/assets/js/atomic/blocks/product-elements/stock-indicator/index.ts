/**
 * External dependencies
 */
import { registerProductBlockType } from '@fincommerce/atomic-utils';
import type { BlockConfiguration } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/stock-indicator/edit';
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/stock-indicator/block.json';
import { BLOCK_ICON as icon } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/stock-indicator/constants';

const blockConfig: BlockConfiguration = {
	...metadata,
	icon: { src: icon },
	edit,
	save: () => null,
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
