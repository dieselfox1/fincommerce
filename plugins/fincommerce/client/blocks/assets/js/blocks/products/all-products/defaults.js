/**
 * External dependencies
 */
import { getSetting } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import { DEFAULT_PRODUCT_LIST_LAYOUT } from '@fincommerce/block-library/assets/js/blocks/products/base-utils';

export default {
	columns: getSetting( 'defaultColumns', 3 ),
	rows: getSetting( 'defaultRows', 3 ),
	alignButtons: false,
	contentVisibility: {
		orderBy: true,
	},
	orderby: 'date',
	layoutConfig: DEFAULT_PRODUCT_LIST_LAYOUT,
	isPreview: false,
};
