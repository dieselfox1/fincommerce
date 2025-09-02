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
	getCategoryLabels,
	getProductLabels,
	getVariationLabels,
} from '../../../lib/async-requests';

const VARIATIONS_REPORT_CHARTS_FILTER =
	'fincommerce_admin_variations_report_charts';
const VARIATIONS_REPORT_FILTERS_FILTER =
	'fincommerce_admin_variations_report_filters';
const VARIATIONS_REPORT_ADVANCED_FILTERS_FILTER =
	'fincommerce_admin_variations_report_advanced_filters';

const { addCesSurveyForAnalytics } = dispatch( CES_STORE_KEY );

/**
 * @typedef {import('../index.js').chart} chart
 */

/**
 * Variations Report charts filter.
 *
 * @filter fincommerce_admin_variations_report_charts
 * @param {Array.<chart>} charts Report charts.
 */
export const charts = applyFilters( VARIATIONS_REPORT_CHARTS_FILTER, [
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

/**
 * @typedef {import('../index.js').filter} filter
 */

/**
 * Variations Report Filters.
 *
 * @filter fincommerce_admin_variations_report_filters
 * @param {Array.<filter>} filters Report filters.
 */
export const filters = applyFilters( VARIATIONS_REPORT_FILTERS_FILTER, [
	{
		label: __( 'Show', 'fincommerce' ),
		staticParams: [ 'chartType', 'paged', 'per_page' ],
		param: 'filter-variations',
		showFilters: () => true,
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
					onClick: addCesSurveyForAnalytics,
				},
			},
			{
				label: __( 'Advanced filters', 'fincommerce' ),
				value: 'advanced',
			},
		],
	},
] );

/**
 * Variations Report Advanced Filters.
 *
 * @filter fincommerce_admin_variations_report_advanced_filters
 * @param {Object} advancedFilters         Report Advanced Filters.
 * @param {string} advancedFilters.title   Interpolated component string for Advanced Filters title.
 * @param {Object} advancedFilters.filters An object specifying a report's Advanced Filters.
 */
export const advancedFilters = applyFilters(
	VARIATIONS_REPORT_ADVANCED_FILTERS_FILTER,
	{
		title: _x(
			'Variations match <select/> filters',
			'A sentence describing filters for Variations. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ',
			'fincommerce'
		),
		filters: {
			attribute: {
				allowMultiple: true,
				labels: {
					add: __( 'Product attribute', 'fincommerce' ),
					placeholder: __(
						'Search product attributes',
						'fincommerce'
					),
					remove: __(
						'Remove product attribute filter',
						'fincommerce'
					),
					rule: __(
						'Select a product attribute filter match',
						'fincommerce'
					),
					/* translators: A sentence describing a Product filter. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ */
					title: __(
						'<title>Product attribute</title> <rule/> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select product attributes', 'fincommerce' ),
				},
				rules: [
					{
						value: 'is',
						/* translators: Sentence fragment, logical, "Is" refers to searching for product variations matching a chosen attribute. Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Is', 'product attribute', 'fincommerce' ),
					},
					{
						value: 'is_not',
						/* translators: Sentence fragment, logical, "Is Not" refers to searching for product variations that don\'t match a chosen attribute. Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x(
							'Is Not',
							'product attribute',
							'fincommerce'
						),
					},
				],
				input: {
					component: 'ProductAttribute',
				},
			},
			category: {
				labels: {
					add: __( 'Product category', 'fincommerce' ),
					placeholder: __(
						'Search product categories',
						'fincommerce'
					),
					remove: __(
						'Remove product category filter',
						'fincommerce'
					),
					rule: __(
						'Select a product category filter match',
						'fincommerce'
					),
					/* translators: A sentence describing a Category filter. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ */
					title: __(
						'<title>Product category</title> <rule/> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select product categories', 'fincommerce' ),
				},
				rules: [
					{
						value: 'includes',
						/* translators: Sentence fragment, logical, "Includes" refers to variations including a given category. Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Includes', 'categories', 'fincommerce' ),
					},
					{
						value: 'excludes',
						/* translators: Sentence fragment, logical, "Excludes" refers to variations excluding a given category. Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Excludes', 'categories', 'fincommerce' ),
					},
				],
				input: {
					component: 'Search',
					type: 'categories',
					getLabels: getCategoryLabels,
				},
			},
			product: {
				labels: {
					add: __( 'Product', 'fincommerce' ),
					placeholder: __( 'Search products', 'fincommerce' ),
					remove: __( 'Remove product filter', 'fincommerce' ),
					rule: __( 'Select a product filter match', 'fincommerce' ),
					/* translators: A sentence describing a Product filter. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ */
					title: __(
						'<title>Product</title> <rule/> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select products', 'fincommerce' ),
				},
				rules: [
					{
						value: 'includes',
						/* translators: Sentence fragment, logical, "Includes" refers to orders including a given product(s). Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Includes', 'products', 'fincommerce' ),
					},
					{
						value: 'excludes',
						/* translators: Sentence fragment, logical, "Excludes" refers to orders excluding a given product(s). Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Excludes', 'products', 'fincommerce' ),
					},
				],
				input: {
					component: 'Search',
					type: 'variableProducts',
					getLabels: getProductLabels,
				},
			},
		},
	}
);
