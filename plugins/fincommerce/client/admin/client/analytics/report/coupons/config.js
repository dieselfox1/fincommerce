/**
 * External dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { dispatch } from '@wordpress/data';
import { STORE_KEY as CES_STORE_KEY } from '@fincommerce/customer-effort-score';

/**
 * Internal dependencies
 */
import { getCouponLabels } from '../../../lib/async-requests';

const COUPON_REPORT_CHARTS_FILTER = 'fincommerce_admin_coupons_report_charts';
const COUPON_REPORT_FILTERS_FILTER = 'fincommerce_admin_coupons_report_filters';
const COUPON_REPORT_ADVANCED_FILTERS_FILTER =
	'fincommerce_admin_coupon_report_advanced_filters';

const { addCesSurveyForAnalytics } = dispatch( CES_STORE_KEY );

/**
 * @typedef {import('../index.js').chart} chart
 */

/**
 * Coupons Report charts filter.
 *
 * @filter fincommerce_admin_coupons_report_charts
 * @param {Array.<chart>} charts Report charts.
 */
export const charts = applyFilters( COUPON_REPORT_CHARTS_FILTER, [
	{
		key: 'orders_count',
		label: __( 'Discounted orders', 'fincommerce' ),
		order: 'desc',
		orderby: 'orders_count',
		type: 'number',
	},
	{
		key: 'amount',
		label: __( 'Amount', 'fincommerce' ),
		order: 'desc',
		orderby: 'amount',
		type: 'currency',
	},
] );

/**
 * Coupons Report Advanced Filters.
 *
 * @filter fincommerce_admin_coupon_report_advanced_filters
 * @param {Object} advancedFilters         Report Advanced Filters.
 * @param {string} advancedFilters.title   Interpolated component string for Advanced Filters title.
 * @param {Object} advancedFilters.filters An object specifying a report's Advanced Filters.
 */
export const advancedFilters = applyFilters(
	COUPON_REPORT_ADVANCED_FILTERS_FILTER,
	{
		filters: {},
		title: _x(
			'Coupons match <select/> filters',
			'A sentence describing filters for Coupons. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ',
			'fincommerce'
		),
	}
);

const filterValues = [
	{ label: __( 'All coupons', 'fincommerce' ), value: 'all' },
	{
		label: __( 'Single coupon', 'fincommerce' ),
		value: 'select_coupon',
		chartMode: 'item-comparison',
		subFilters: [
			{
				component: 'Search',
				value: 'single_coupon',
				chartMode: 'item-comparison',
				path: [ 'select_coupon' ],
				settings: {
					type: 'coupons',
					param: 'coupons',
					getLabels: getCouponLabels,
					labels: {
						placeholder: __(
							'Type to search for a coupon',
							'fincommerce'
						),
						button: __( 'Single Coupon', 'fincommerce' ),
					},
				},
			},
		],
	},
	{
		label: __( 'Comparison', 'fincommerce' ),
		value: 'compare-coupons',
		settings: {
			type: 'coupons',
			param: 'coupons',
			getLabels: getCouponLabels,
			labels: {
				title: __( 'Compare Coupon Codes', 'fincommerce' ),
				update: __( 'Compare', 'fincommerce' ),
				helpText: __(
					'Check at least two coupon codes below to compare',
					'fincommerce'
				),
			},
			onClick: addCesSurveyForAnalytics,
		},
	},
];

if ( Object.keys( advancedFilters.filters ).length ) {
	filterValues.push( {
		label: __( 'Advanced filters', 'fincommerce' ),
		value: 'advanced',
	} );
}

/**
 * @typedef {import('../index.js').filter} filter
 */

/**
 * Coupons Report Filters.
 *
 * @filter fincommerce_admin_coupons_report_filters
 * @param {Array.<filter>} filters Report filters.
 */
export const filters = applyFilters( COUPON_REPORT_FILTERS_FILTER, [
	{
		label: __( 'Show', 'fincommerce' ),
		staticParams: [ 'chartType', 'paged', 'per_page' ],
		param: 'filter',
		showFilters: () => true,
		filters: filterValues,
	},
] );
