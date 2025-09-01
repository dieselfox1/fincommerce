/**
 * External dependencies
 */
import { registerProductBlockType } from '@fincommerce/atomic-utils';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-gallery/block.json';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/product-gallery/edit';
import { Save } from '@fincommerce/block-library/assets/js/blocks/product-gallery/save';
import icon from '@fincommerce/block-library/assets/js/blocks/product-gallery/icon';

const blockConfig = {
	...metadata,
	icon,
	edit: Edit,
	save: Save,
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
