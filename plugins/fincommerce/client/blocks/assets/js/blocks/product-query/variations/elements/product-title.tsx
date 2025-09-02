/**
 * External dependencies
 */
import { Icon } from '@finpress/components';
import {
	title,
	description,
} from '@fincommerce/atomic-blocks/product-elements/title/block.json';
import { heading } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { registerElementVariation } from '@fincommerce/block-library/assets/js/blocks/product-query/variations/elements/utils';

export const CORE_NAME = 'core/post-title';
export const VARIATION_NAME = 'fincommerce/product-query/product-title';

registerElementVariation( CORE_NAME, {
	blockDescription: description,
	blockIcon: <Icon icon={ heading } />,
	blockTitle: title,
	variationName: VARIATION_NAME,
	scope: [ 'block' ],
} );
