/**
 * External dependencies
 */
import type { InnerBlockTemplate } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon, loop } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { INNER_BLOCKS_TEMPLATE } from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';
import { CoreCollectionNames } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

const collection = {
	name: CoreCollectionNames.PRODUCT_CATALOG,
	title: __( 'Product Catalog', 'fincommerce' ),
	icon: <Icon icon={ loop } />,
	description:
		'Display all products in your catalog. Results can (change to) match the current template, page, or search term.',
	keywords: [ 'all products' ],
	scope: [],
};

const innerBlocks: InnerBlockTemplate[] = INNER_BLOCKS_TEMPLATE;

export default {
	...collection,
	innerBlocks,
};
