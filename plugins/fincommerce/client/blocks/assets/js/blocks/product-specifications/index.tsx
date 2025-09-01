/**
 * External dependencies
 */
import { registerProductBlockType } from '@fincommerce/atomic-utils';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-specifications/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-specifications/edit';
import icon from '@fincommerce/block-library/assets/js/blocks/product-specifications/icon';
import '@fincommerce/block-library/assets/js/blocks/product-specifications/style.scss';

const blockConfig = {
	...metadata,
	icon,
	edit,
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
