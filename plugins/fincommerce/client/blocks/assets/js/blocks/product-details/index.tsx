/**
 * External dependencies
 */
import { registerProductBlockType } from '@fincommerce/atomic-utils';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-details/block.json';
import save from '@fincommerce/block-library/assets/js/blocks/product-details/save';
import edit from '@fincommerce/block-library/assets/js/blocks/product-details/edit';
import icon from '@fincommerce/block-library/assets/js/blocks/product-details/icon';
import '@fincommerce/block-library/assets/js/blocks/product-details/style.scss';
import { Attributes } from '@fincommerce/block-library/assets/js/blocks/product-details/types';

const blockConfig = {
	...metadata,
	icon,
	edit,
	save,
	deprecated: [
		{
			attributes: {
				hideTabTitle: {
					type: 'boolean',
					default: false,
				},
			},
			save() {
				return null;
			},
			migrate( attributes: Attributes ) {
				return {
					...attributes,
					// In the previous version of this block, we didn't define the align attribute.
					// Because of that, align is missing from attributes argument here.
					// We need to add it manually as wide is the previous default value.
					align: 'wide',
				};
			},
		},
	],
};
// @ts-expect-error blockConfig is not typed.
registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
