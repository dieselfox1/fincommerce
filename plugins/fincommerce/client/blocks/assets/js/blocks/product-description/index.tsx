/**
 * External dependencies
 */
import { registerProductBlockType } from '@fincommerce/atomic-utils';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-description/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-description/edit';
import icon from '@fincommerce/block-library/assets/js/blocks/product-description/icon';

const blockConfig = {
	...metadata,
	icon,
	edit,
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
