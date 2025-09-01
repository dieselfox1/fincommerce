/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import icon from '@fincommerce/block-library/assets/js/blocks/product-gallery/inner-blocks/product-gallery-large-image/icon';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/product-gallery/inner-blocks/product-gallery-large-image/edit';
import { Save } from '@fincommerce/block-library/assets/js/blocks/product-gallery/inner-blocks/product-gallery-large-image/save';
import metadata from '@fincommerce/block-library/assets/js/blocks/product-gallery/inner-blocks/product-gallery-large-image/block.json';

// @ts-expect-error: `metadata` currently does not have a type definition in WordPress core
registerBlockType( metadata, {
	icon,
	edit: Edit,
	save: Save,
} );
