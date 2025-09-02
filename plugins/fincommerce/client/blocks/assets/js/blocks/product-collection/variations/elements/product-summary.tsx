/**
 * External dependencies
 */
import { Icon } from '@finpress/components';
import { page } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { registerElementVariation } from '@fincommerce/block-library/assets/js/blocks/product-collection/variations/elements/utils';
import {
	BLOCK_DESCRIPTION,
	BLOCK_TITLE,
} from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/summary/constants';
import blockJson from '@fincommerce/block-library/assets/js/blocks/product-collection/block.json';

export const CORE_NAME = 'core/post-excerpt';
export const VARIATION_NAME = `${ blockJson.name }/product-summary`;

const registerProductSummary = () => {
	registerElementVariation( CORE_NAME, {
		blockDescription: BLOCK_DESCRIPTION,
		blockIcon: <Icon icon={ page } />,
		blockTitle: BLOCK_TITLE,
		variationName: VARIATION_NAME,
		scope: [],
	} );
};

export default registerProductSummary;
