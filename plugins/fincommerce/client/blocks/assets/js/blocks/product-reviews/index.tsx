/**
 * External dependencies
 */
import { registerProductBlockType } from '@fincommerce/atomic-utils';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-reviews/block.json';
import save from '@fincommerce/block-library/assets/js/blocks/product-reviews/save';
import edit from '@fincommerce/block-library/assets/js/blocks/product-reviews/edit';

const blockConfig = {
	...metadata,
	edit,
	save,
	deprecated: [
		{
			save() {
				return null;
			},
		},
	],
};
// @ts-expect-error metadata is not typed.
registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
