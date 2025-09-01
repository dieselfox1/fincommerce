/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit, { Save as save } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/edit';
import { blockName, attributes } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/attributes';
import '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks';
import { metadata } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/metadata';

registerBlockType( blockName, {
	...metadata,
	attributes,
	edit,
	save,
} );
