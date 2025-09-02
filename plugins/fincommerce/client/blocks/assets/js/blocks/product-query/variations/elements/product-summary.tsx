/**
 * External dependencies
 */
import { Icon } from '@finpress/components';
import { page } from '@finpress/icons';
import {
	BLOCK_DESCRIPTION,
	BLOCK_TITLE,
} from '@fincommerce/atomic-blocks/product-elements/summary/constants';

/**
 * Internal dependencies
 */
import { registerElementVariation } from '@fincommerce/block-library/assets/js/blocks/product-query/variations/elements/utils';

export const CORE_NAME = 'core/post-excerpt';
export const VARIATION_NAME = 'fincommerce/product-query/product-summary';

registerElementVariation( CORE_NAME, {
	blockDescription: BLOCK_DESCRIPTION,
	blockIcon: <Icon icon={ page } />,
	blockTitle: BLOCK_TITLE,
	variationName: VARIATION_NAME,
	scope: [],
} );
