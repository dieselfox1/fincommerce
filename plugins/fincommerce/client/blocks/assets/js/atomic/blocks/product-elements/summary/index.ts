/**
 * External dependencies
 */
import type { BlockAttributes } from '@finpress/blocks';
import { registerProductBlockType } from '@fincommerce/atomic-utils';
import { isEmptyObject } from '@fincommerce/types';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/summary/edit';
import { BLOCK_ICON as icon } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/summary/constants';
import save from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/save';
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/summary/block.json';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/summary/upgrade';

const deprecated = [
	{
		save,
		migrate: ( attributes: BlockAttributes ) => {
			// We don't deprecate attributes, but adding new ones.
			// For backwards compatibility, some new attributes require
			// different defaults than new ones.
			return {
				...attributes,
				showDescriptionIfEmpty: true,
				summaryLength: 150,
			};
		},
		isEligible: ( attributes: BlockAttributes ) =>
			isEmptyObject( attributes ),
	},
];

const blockConfig = {
	...metadata,

	icon: { src: icon },
	deprecated,
	edit,
	save,
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
