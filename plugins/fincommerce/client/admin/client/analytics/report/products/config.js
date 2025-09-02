/**
 * External dependencies
 */
import { __, _x } from '@finpress/i18n';
import { applyFilters } from '@finpress/hooks';
import { dispatch } from '@finpress/data';
import { STORE_KEY as CES_STORE_KEY } from '@fincommerce/customer-effort-score';

/**
 * Internal dependencies
 */
import {
	getProductLabels,
	getVariationLabels,
} from '../../../lib/async-requests';

const PRODUCTS_REPORT_CHARTS_FILTER =
	'fincommerce_admin_products_report_charts';
const PRODUCTS_REPORT_FILTERS_FILTER =
	'fincommerce_admin_products_report_filters';
const PRODUCTS_REPORT_ADVANCED_FILTERS_FILTER =
	'fincommerce_admin_products_report_advanced_filters';

const { addCesSurveyForAnalytics } = dispatch( CES_STORE_KEY );

/**
 * @typedef {import('../index.js').chart} chart
 */

/**
 * Products Report charts filter.
 *
 * @filter fincommerce_admin_products_report_charts
 * @param {Array.<chart>} charts Report charts.
 */
export const charts = applyFilters( PRODUCTS_REPORT_CHARTS_FILTER, [
	{
		key: 'items_sold',
		label: __( 'Items sold', 'fincommerce' ),
		order: 'desc',
		orderby: 'items_sold',
		type: 'number',
	},
	{
		key: 'net_revenue',
		label: __( 'Net sales', 'fincommerce' ),
		order: 'desc',
		orderby: 'net_revenue',
		type: 'currency',
	},
	{
		key: 'orders_count',
		label: __( 'Orders', 'fincommerce' ),
		order: 'desc',
		orderby: 'orders_count',
		type: 'number',
	},
] );

const filterConfig = {
	label: __( 'Show', 'fincommerce' ),
	staticParams: [ 'chartType', 'paged', 'per_page' ],
	param: 'filter',
	showFilters: () => true,
	filters: [
		{ label: __( 'All products', 'fincommerce' ), value: 'all' },
		{
			label: __( 'Single product', 'fincommerce' ),
			value: 'select_product',
			chartMode: 'item-comparison',
			subFilters: [
				{
					component: 'Search',
					value: 'single_product',
					chartMode: 'item-comparison',
					path: [ 'select_product' ],
					settings: {
						type: 'products',
						param: 'products',
						getLabels: getProductLabels,
						labels: {
							placeholder: __(
								'Type to search for a product',
								'fincommerce'
							),
							button: __( 'Single product', 'fincommerce' ),
						},
					},
				},
			],
		},
		{
			label: __( 'Comparison', 'fincommerce' ),
			value: 'compare-products',
			chartMode: 'item-comparison',
			settings: {
				type: 'products',
				param: 'products',
				getLabels: getProductLabels,
				labels: {
					helpText: __(
						'Check at least two products below to compare',
						'fincommerce'
					),
					placeholder: __(
						'Search for products to compare',
						'fincommerce'
					),
					title: __( 'Compare Products', 'fincommerce' ),
					update: __( 'Compare', 'fincommerce' ),
				},
				onClick: addCesSurveyForAnalytics,
			},
		},
	],
};

const variationsConfig = {
	showFilters: ( query ) =>
		query.filter === 'single_product' &&
		!! query.products &&
		query[ 'is-variable' ],
	staticParams: [ 'filter', 'products', 'chartType', 'paged', 'per_page' ],
	param: 'filter-variations',
	filters: [
		{
			label: __( 'All variations', 'fincommerce' ),
			chartMode: 'item-comparison',
			value: 'all',
		},
		{
			label: __( 'Single variation', 'fincommerce' ),
			value: 'select_variation',
			subFilters: [
				{
					component: 'Search',
					value: 'single_variation',
					path: [ 'select_variation' ],
					settings: {
						type: 'variations',
						param: 'variations',
						getLabels: getVariationLabels,
						labels: {
							placeholder: __(
								'Type to search for a variation',
								'fincommerce'
							),
							button: __( 'Single variation', 'fincommerce' ),
						},
					},
				},
			],
		},
		{
			label: __( 'Comparison', 'fincommerce' ),
			chartMode: 'item-comparison',
			value: 'compare-variations',
			settings: {
				type: 'variations',
				param: 'variations',
				getLabels: getVariationLabels,
				labels: {
					helpText: __(
						'Check at least two variations below to compare',
						'fincommerce'
					),
					placeholder: __(
						'Search for variations to compare',
						'fincommerce'
					),
					title: __( 'Compare Variations', 'fincommerce' ),
					update: __( 'Compare', 'fincommerce' ),
				},
			},
		},
	],
};

/**
 * Products Report Advanced Filters.
 *
 * @filter fincommerce_admin_products_report_advanced_filters
 * @param {Object} advancedFilters         Report Advanced Filters.
 * @param {string} advancedFilters.title   Interpolated component string for Advanced Filters title.
 * @param {Object} advancedFilters.filters An object specifying a report's Advanced Filters.
 */
export const advancedFilters = applyFilters(
	PRODUCTS_REPORT_ADVANCED_FILTERS_FILTER,
	{
		filters: {},
		title: _x(
			'Products Match <select/> Filters',
			'A sentence describing filters for Products. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ',
			'fincommerce'
		),
	}
);

if ( Object.keys( advancedFilters.filters ).length ) {
	filterConfig.filters.push( {
		label: __( 'Advanced Filters', 'fincommerce' ),
		value: 'advanced',
	} );
	variationsConfig.filters.push( {
		label: __( 'Advanced Filters', 'fincommerce' ),
		value: 'advanced',
	} );
}

/**
 * @typedef {import('../index.js').filter} filter
 */

/**
 * Products Report Filters.
 *
 * @filter fincommerce_admin_products_report_filters
 * @param {Array.<filter>} filters Report filters.
 */
export const filters = applyFilters( PRODUCTS_REPORT_FILTERS_FILTER, [
	filterConfig,
	variationsConfig,
] );
