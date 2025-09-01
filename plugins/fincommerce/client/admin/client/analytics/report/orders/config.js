/**
 * External dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import {
	getCouponLabels,
	getProductLabels,
	getTaxRateLabels,
	getVariationLabels,
} from '../../../lib/async-requests';
import { ORDER_STATUSES } from '~/utils/admin-settings';

const ORDERS_REPORT_CHARTS_FILTER = 'fincommerce_admin_orders_report_charts';
const ORDERS_REPORT_FILTERS_FILTER = 'fincommerce_admin_orders_report_filters';
const ORDERS_REPORT_ADVANCED_FILTERS_FILTER =
	'fincommerce_admin_orders_report_advanced_filters';

/**
 * @typedef {import('../index.js').chart} chart
 */

/**
 * Orders Report charts filter.
 *
 * @filter fincommerce_admin_orders_report_charts
 * @param {Array.<chart>} charts Report charts.
 */
export const charts = applyFilters( ORDERS_REPORT_CHARTS_FILTER, [
	{
		key: 'orders_count',
		label: __( 'Orders', 'fincommerce' ),
		type: 'number',
	},
	{
		key: 'net_revenue',
		label: __( 'Net sales', 'fincommerce' ),
		order: 'desc',
		orderby: 'net_total',
		type: 'currency',
	},
	{
		key: 'avg_order_value',
		label: __( 'Average order value', 'fincommerce' ),
		type: 'currency',
	},
	{
		key: 'avg_items_per_order',
		label: __( 'Average items per order', 'fincommerce' ),
		order: 'desc',
		orderby: 'num_items_sold',
		type: 'average',
	},
] );

/**
 * @typedef {import('../index.js').filter} filter
 */

/**
 * Orders Report Filters.
 *
 * @filter fincommerce_admin_orders_report_filters
 * @param {Array.<filter>} filters Report filters.
 */
export const filters = applyFilters( ORDERS_REPORT_FILTERS_FILTER, [
	{
		label: __( 'Show', 'fincommerce' ),
		staticParams: [ 'chartType', 'paged', 'per_page' ],
		param: 'filter',
		showFilters: () => true,
		filters: [
			{ label: __( 'All orders', 'fincommerce' ), value: 'all' },
			{
				label: __( 'Advanced filters', 'fincommerce' ),
				value: 'advanced',
			},
		],
	},
] );

/*eslint-disable max-len*/

/**
 * Orders Report Advanced Filters.
 *
 * @filter fincommerce_admin_orders_report_advanced_filters
 * @param {Object} advancedFilters         Report Advanced Filters.
 * @param {string} advancedFilters.title   Interpolated component string for Advanced Filters title.
 * @param {Object} advancedFilters.filters An object specifying a report's Advanced Filters.
 */
export const advancedFilters = applyFilters(
	ORDERS_REPORT_ADVANCED_FILTERS_FILTER,
	{
		title: _x(
			'Orders match <select/> filters',
			'A sentence describing filters for Orders. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ',
			'fincommerce'
		),
		filters: {
			status: {
				labels: {
					add: __( 'Order status', 'fincommerce' ),
					remove: __( 'Remove order status filter', 'fincommerce' ),
					rule: __(
						'Select an order status filter match',
						'fincommerce'
					),
					/* translators: A sentence describing an Order Status filter. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ */
					title: __(
						'<title>Order status</title> <rule/> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select an order status', 'fincommerce' ),
				},
				rules: [
					{
						value: 'is',
						/* translators: Sentence fragment, logical, "Is" refers to searching for orders matching a chosen order status. Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Is', 'order status', 'fincommerce' ),
					},
					{
						value: 'is_not',
						/* translators: Sentence fragment, logical, "Is Not" refers to searching for orders that don\'t match a chosen order status. Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Is Not', 'order status', 'fincommerce' ),
					},
				],
				input: {
					component: 'SelectControl',
					options: Object.keys( ORDER_STATUSES ).map( ( key ) => ( {
						value: key,
						label: ORDER_STATUSES[ key ],
					} ) ),
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
					type: 'products',
					getLabels: getProductLabels,
				},
			},
			variation: {
				labels: {
					add: __( 'Product variation', 'fincommerce' ),
					placeholder: __(
						'Search product variations',
						'fincommerce'
					),
					remove: __(
						'Remove product variation filter',
						'fincommerce'
					),
					rule: __(
						'Select a product variation filter match',
						'fincommerce'
					),
					/* translators: A sentence describing a Variation filter. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ */
					title: __(
						'<title>Product variation</title> <rule/> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select variation', 'fincommerce' ),
				},
				rules: [
					{
						value: 'includes',
						/* translators: Sentence fragment, logical, "Includes" refers to orders including a given variation(s). Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Includes', 'variations', 'fincommerce' ),
					},
					{
						value: 'excludes',
						/* translators: Sentence fragment, logical, "Excludes" refers to orders excluding a given variation(s). Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Excludes', 'variations', 'fincommerce' ),
					},
				],
				input: {
					component: 'Search',
					type: 'variations',
					getLabels: getVariationLabels,
				},
			},
			coupon: {
				labels: {
					add: __( 'Coupon code', 'fincommerce' ),
					placeholder: __( 'Search coupons', 'fincommerce' ),
					remove: __( 'Remove coupon filter', 'fincommerce' ),
					rule: __( 'Select a coupon filter match', 'fincommerce' ),
					/* translators: A sentence describing a Coupon filter. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ */
					title: __(
						'<title>Coupon code</title> <rule/> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select coupon codes', 'fincommerce' ),
				},
				rules: [
					{
						value: 'includes',
						/* translators: Sentence fragment, logical, "Includes" refers to orders including a given coupon code(s). Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Includes', 'coupon code', 'fincommerce' ),
					},
					{
						value: 'excludes',
						/* translators: Sentence fragment, logical, "Excludes" refers to orders excluding a given coupon code(s). Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Excludes', 'coupon code', 'fincommerce' ),
					},
				],
				input: {
					component: 'Search',
					type: 'coupons',
					getLabels: getCouponLabels,
				},
			},
			customer_type: {
				labels: {
					add: __( 'Customer type', 'fincommerce' ),
					remove: __( 'Remove customer filter', 'fincommerce' ),
					rule: __( 'Select a customer filter match', 'fincommerce' ),
					/* translators: A sentence describing a Customer filter. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ */
					title: __(
						'<title>Customer is</title> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select a customer type', 'fincommerce' ),
				},
				input: {
					component: 'SelectControl',
					options: [
						{
							value: 'new',
							label: __( 'New', 'fincommerce' ),
						},
						{
							value: 'returning',
							label: __( 'Returning', 'fincommerce' ),
						},
					],
					defaultOption: 'new',
				},
			},
			refunds: {
				labels: {
					add: __( 'Refund', 'fincommerce' ),
					remove: __( 'Remove refund filter', 'fincommerce' ),
					rule: __( 'Select a refund filter match', 'fincommerce' ),
					title: __(
						'<title>Refund</title> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select a refund type', 'fincommerce' ),
				},
				input: {
					component: 'SelectControl',
					options: [
						{
							value: 'all',
							label: __( 'All', 'fincommerce' ),
						},
						{
							value: 'partial',
							label: __( 'Partially refunded', 'fincommerce' ),
						},
						{
							value: 'full',
							label: __( 'Fully refunded', 'fincommerce' ),
						},
						{
							value: 'none',
							label: __( 'None', 'fincommerce' ),
						},
					],
					defaultOption: 'all',
				},
			},
			tax_rate: {
				labels: {
					add: __( 'Tax rate', 'fincommerce' ),
					placeholder: __( 'Search tax rates', 'fincommerce' ),
					remove: __( 'Remove tax rate filter', 'fincommerce' ),
					rule: __( 'Select a tax rate filter match', 'fincommerce' ),
					/* translators: A sentence describing a tax rate filter. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ */
					title: __(
						'<title>Tax Rate</title> <rule/> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select tax rates', 'fincommerce' ),
				},
				rules: [
					{
						value: 'includes',
						/* translators: Sentence fragment, logical, "Includes" refers to orders including a given tax rate(s). Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Includes', 'tax rate', 'fincommerce' ),
					},
					{
						value: 'excludes',
						/* translators: Sentence fragment, logical, "Excludes" refers to orders excluding a given tax rate(s). Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Excludes', 'tax rate', 'fincommerce' ),
					},
				],
				input: {
					component: 'Search',
					type: 'taxes',
					getLabels: getTaxRateLabels,
				},
			},
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
					filter: __( 'Select attributes', 'fincommerce' ),
				},
				rules: [
					{
						value: 'is',
						/* translators: Sentence fragment, logical, "Is" refers to searching for products matching a chosen attribute. Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
						label: _x( 'Is', 'product attribute', 'fincommerce' ),
					},
					{
						value: 'is_not',
						/* translators: Sentence fragment, logical, "Is Not" refers to searching for products that don\'t match a chosen attribute. Screenshot for context: https://cloudup.com/cSsUY9VeCVJ */
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
		},
	}
);
/*eslint-enable max-len*/
