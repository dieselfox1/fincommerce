/**
 * External dependencies
 */
import { box as icon } from '@wordpress/icons';
import { registerProductBlockType } from '@fincommerce/atomic-utils';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/related-products/edit';
import save from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/related-products/save';
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/related-products/block.json';

const blockConfig = {
	...metadata,
	icon: { src: icon },
	edit,
	save,
	isAvailableOnPostEditor: false,
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: false,
} );
