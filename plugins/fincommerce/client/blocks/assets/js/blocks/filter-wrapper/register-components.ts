/**
 * External dependencies
 */
import { registerBlockComponent } from '@fincommerce/blocks-registry';
import { lazy } from '@wordpress/element';
import { WC_BLOCKS_BUILD_URL } from '@fincommerce/block-settings';

// Modify webpack publicPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

registerBlockComponent( {
	blockName: 'fincommerce/active-filters',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "active-filters-wrapper" */
				'@fincommerce/block-library/assets/js/blocks/active-filters/block-wrapper'
			)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/price-filter',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "price-filter-wrapper" */
				'@fincommerce/block-library/assets/js/blocks/price-filter/block-wrapper'
			)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/stock-filter',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "stock-filter-wrapper" */
				'@fincommerce/block-library/assets/js/blocks/stock-filter/block-wrapper'
			)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/attribute-filter',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "attribute-filter-wrapper" */
				'@fincommerce/block-library/assets/js/blocks/attribute-filter/block-wrapper'
			)
	),
} );

registerBlockComponent( {
	blockName: 'fincommerce/rating-filter',
	component: lazy(
		() =>
			import(
				/* webpackChunkName: "rating-filter-wrapper" */
				'@fincommerce/block-library/assets/js/blocks/rating-filter/block-wrapper'
			)
	),
} );
