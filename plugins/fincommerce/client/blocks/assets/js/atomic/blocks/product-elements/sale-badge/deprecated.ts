/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge/block.json';
import save from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/save';

const { attributes: blockAttributes } = metadata;

// In https://github.com/dieselfox1/fincommerce/pull/57980, the `isDescendentOfQueryLoop` and `isDescendentOfSingleProductTemplate` attributes were removed.
const v1 = {
	attributes: {
		...blockAttributes,
		isDescendentOfQueryLoop: { type: 'boolean', default: false },
		isDescendentOfSingleProductTemplate: {
			type: 'boolean',
			default: false,
		},
	},
	save,
	apiVersion: 3,
};

const deprecated = [ v1 ];

export default deprecated;
