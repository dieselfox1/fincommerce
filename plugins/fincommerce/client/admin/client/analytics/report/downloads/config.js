/**
 * External dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import {
	getCustomerLabels,
	getProductLabels,
} from '../../../lib/async-requests';

const DOWLOADS_REPORT_CHARTS_FILTER =
	'fincommerce_admin_downloads_report_charts';
const DOWLOADS_REPORT_FILTERS_FILTER =
	'fincommerce_admin_downloads_report_filters';
const DOWLOADS_REPORT_ADVANCED_FILTERS_FILTER =
	'fincommerce_admin_downloads_report_advanced_filters';

/**
 * @typedef {import('../index.js').chart} chart
 */

/**
 * Downloads Report charts filter.
 *
 * @filter fincommerce_admin_downloads_report_charts
 * @param {Array.<chart>} charts Report charts.
 */
export const charts = applyFilters( DOWLOADS_REPORT_CHARTS_FILTER, [
	{
		key: 'download_count',
		label: __( 'Downloads', 'fincommerce' ),
		type: 'number',
	},
] );

/**
 * @typedef {import('../index.js').filter} filter
 */

/**
 * Downloads Report Filters.
 *
 * @filter fincommerce_admin_downloads_report_filters
 * @param {Array.<filter>} filters Report filters.
 */
export const filters = applyFilters( DOWLOADS_REPORT_FILTERS_FILTER, [
	{
		label: __( 'Show', 'fincommerce' ),
		staticParams: [ 'chartType', 'paged', 'per_page' ],
		param: 'filter',
		showFilters: () => true,
		filters: [
			{ label: __( 'All downloads', 'fincommerce' ), value: 'all' },
			{
				label: __( 'Advanced filters', 'fincommerce' ),
				value: 'advanced',
			},
		],
	},
] );

/*eslint-disable max-len*/

/**
 * Downloads Report Advanced Filters.
 *
 * @filter fincommerce_admin_downloads_report_advanced_filters
 * @param {Object} advancedFilters         Report Advanced Filters.
 * @param {string} advancedFilters.title   Interpolated component string for Advanced Filters title.
 * @param {Object} advancedFilters.filters An object specifying a report's Advanced Filters.
 */
export const advancedFilters = applyFilters(
	DOWLOADS_REPORT_ADVANCED_FILTERS_FILTER,
	{
		title: _x(
			'Downloads match <select/> filters',
			'A sentence describing filters for Downloads. See screen shot for context: https://cloudup.com/ccxhyH2mEDg',
			'fincommerce'
		),
		filters: {
			product: {
				labels: {
					add: __( 'Product', 'fincommerce' ),
					placeholder: __( 'Search', 'fincommerce' ),
					remove: __( 'Remove product filter', 'fincommerce' ),
					rule: __( 'Select a product filter match', 'fincommerce' ),
					/* translators: A sentence describing a Product filter. See screen shot for context: https://cloudup.com/ccxhyH2mEDg */
					title: __(
						'<title>Product</title> <rule/> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select product', 'fincommerce' ),
				},
				rules: [
					{
						value: 'includes',
						/* translators: Sentence fragment, logical, "Includes" refers to products including a given product(s). Screenshot for context: https://cloudup.com/ccxhyH2mEDg */
						label: _x( 'Includes', 'products', 'fincommerce' ),
					},
					{
						value: 'excludes',
						/* translators: Sentence fragment, logical, "Excludes" refers to products excluding a products(s). Screenshot for context: https://cloudup.com/ccxhyH2mEDg */
						label: _x( 'Excludes', 'products', 'fincommerce' ),
					},
				],
				input: {
					component: 'Search',
					type: 'products',
					getLabels: getProductLabels,
				},
			},
			customer: {
				labels: {
					add: __( 'Username', 'fincommerce' ),
					placeholder: __(
						'Search customer username',
						'fincommerce'
					),
					remove: __(
						'Remove customer username filter',
						'fincommerce'
					),
					rule: __(
						'Select a customer username filter match',
						'fincommerce'
					),
					/* translators: A sentence describing a customer username filter. See screen shot for context: https://cloudup.com/ccxhyH2mEDg */
					title: __(
						'<title>Username</title> <rule/> <filter />',
						'fincommerce'
					),
					filter: __( 'Select customer username', 'fincommerce' ),
				},
				rules: [
					{
						value: 'includes',
						/* translators: Sentence fragment, logical, "Includes" refers to customer usernames including a given username(s). Screenshot for context: https://cloudup.com/ccxhyH2mEDg */
						label: _x(
							'Includes',
							'customer usernames',
							'fincommerce'
						),
					},
					{
						value: 'excludes',
						/* translators: Sentence fragment, logical, "Excludes" refers to customer usernames excluding a given username(s). Screenshot for context: https://cloudup.com/ccxhyH2mEDg */
						label: _x(
							'Excludes',
							'customer usernames',
							'fincommerce'
						),
					},
				],
				input: {
					component: 'Search',
					type: 'usernames',
					getLabels: getCustomerLabels,
				},
			},
			order: {
				labels: {
					add: __( 'Order #', 'fincommerce' ),
					placeholder: __( 'Search order number', 'fincommerce' ),
					remove: __( 'Remove order number filter', 'fincommerce' ),
					rule: __(
						'Select an order number filter match',
						'fincommerce'
					),
					/* translators: A sentence describing an order number filter. See screen shot for context: https://cloudup.com/ccxhyH2mEDg */
					title: __(
						'<title>Order #</title> <rule/> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select order number', 'fincommerce' ),
				},
				rules: [
					{
						value: 'includes',
						/* translators: Sentence fragment, logical, "Includes" refers to order numbers including a given order(s). Screenshot for context: https://cloudup.com/ccxhyH2mEDg */
						label: _x( 'Includes', 'order numbers', 'fincommerce' ),
					},
					{
						value: 'excludes',
						/* translators: Sentence fragment, logical, "Excludes" refers to order numbers excluding a given order(s). Screenshot for context: https://cloudup.com/ccxhyH2mEDg */
						label: _x( 'Excludes', 'order numbers', 'fincommerce' ),
					},
				],
				input: {
					component: 'Search',
					type: 'orders',
					getLabels: async ( value ) => {
						const orderIds = value.split( ',' );
						return await orderIds.map( ( orderId ) => ( {
							id: orderId,
							label: '#' + orderId,
						} ) );
					},
				},
			},
			ip_address: {
				labels: {
					add: __( 'IP Address', 'fincommerce' ),
					placeholder: __( 'Search IP address', 'fincommerce' ),
					remove: __( 'Remove IP address filter', 'fincommerce' ),
					rule: __(
						'Select an IP address filter match',
						'fincommerce'
					),
					/* translators: A sentence describing an order number filter. See screen shot for context: https://cloudup.com/ccxhyH2mEDg */
					title: __(
						'<title>IP Address</title> <rule/> <filter/>',
						'fincommerce'
					),
					filter: __( 'Select IP address', 'fincommerce' ),
				},
				rules: [
					{
						value: 'includes',
						/* translators: Sentence fragment, logical, "Includes" refers to IP addresses including a given address(s). Screenshot for context: https://cloudup.com/ccxhyH2mEDg */
						label: _x( 'Includes', 'IP addresses', 'fincommerce' ),
					},
					{
						value: 'excludes',
						/* translators: Sentence fragment, logical, "Excludes" refers to IP addresses excluding a given address(s). Screenshot for context: https://cloudup.com/ccxhyH2mEDg */
						label: _x( 'Excludes', 'IP addresses', 'fincommerce' ),
					},
				],
				input: {
					component: 'Search',
					type: 'downloadIps',
					getLabels: async ( value ) => {
						const ips = value.split( ',' );
						return await ips.map( ( ip ) => {
							return {
								id: ip,
								label: ip,
							};
						} );
					},
				},
			},
		},
	}
);
/*eslint-enable max-len*/
