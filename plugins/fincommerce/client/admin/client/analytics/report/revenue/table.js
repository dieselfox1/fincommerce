/**
 * External dependencies
 */
import { __, _n } from '@finpress/i18n';
import { Component } from '@finpress/element';
import { format as formatDate } from '@finpress/date';
import { withSelect } from '@finpress/data';
import { compose } from '@finpress/compose';
import { get, memoize } from 'lodash';
import { Date, Link } from '@fincommerce/components';
import { formatValue } from '@fincommerce/number';
import {
	getReportTableQuery,
	reportsStore,
	settingsStore,
	QUERY_DEFAULTS,
	optionsStore,
} from '@fincommerce/data';
import {
	appendTimestamp,
	defaultTableDateFormat,
	getCurrentDates,
} from '@fincommerce/date';
import { stringify } from 'qs';
import { CurrencyContext } from '@fincommerce/currency';

/**
 * Internal dependencies
 */
import ReportTable from '../../components/report-table';
import { getAdminSetting } from '~/utils/admin-settings';

const EMPTY_ARRAY = [];

const summaryFields = [
	'orders_count',
	'gross_sales',
	'total_sales',
	'refunds',
	'coupons',
	'taxes',
	'shipping',
	'net_revenue',
];

class RevenueReportTable extends Component {
	constructor() {
		super();

		this.getHeadersContent = this.getHeadersContent.bind( this );
		this.getRowsContent = this.getRowsContent.bind( this );
		this.getSummary = this.getSummary.bind( this );
	}

	getHeadersContent() {
		return [
			{
				label: __( 'Date', 'fincommerce' ),
				key: 'date',
				required: true,
				defaultSort: true,
				isLeftAligned: true,
				isSortable: true,
			},
			{
				label: __( 'Orders', 'fincommerce' ),
				key: 'orders_count',
				required: false,
				isSortable: true,
				isNumeric: true,
			},
			{
				label: __( 'Gross sales', 'fincommerce' ),
				key: 'gross_sales',
				required: false,
				isSortable: true,
				isNumeric: true,
			},
			{
				label: __( 'Returns', 'fincommerce' ),
				key: 'refunds',
				required: false,
				isSortable: true,
				isNumeric: true,
			},
			{
				label: __( 'Coupons', 'fincommerce' ),
				key: 'coupons',
				required: false,
				isSortable: true,
				isNumeric: true,
			},
			{
				label: __( 'Net sales', 'fincommerce' ),
				key: 'net_revenue',
				required: false,
				isSortable: true,
				isNumeric: true,
			},
			{
				label: __( 'Taxes', 'fincommerce' ),
				key: 'taxes',
				required: false,
				isSortable: true,
				isNumeric: true,
			},
			{
				label: __( 'Shipping', 'fincommerce' ),
				key: 'shipping',
				required: false,
				isSortable: true,
				isNumeric: true,
			},
			{
				label: __( 'Total sales', 'fincommerce' ),
				key: 'total_sales',
				required: false,
				isSortable: true,
				isNumeric: true,
			},
		];
	}

	getRowsContent( data = [] ) {
		const dateFormat = getAdminSetting(
			'dateFormat',
			defaultTableDateFormat
		);
		const {
			formatAmount,
			render: renderCurrency,
			formatDecimal: getCurrencyFormatDecimal,
			getCurrencyConfig,
		} = this.context;

		return data.map( ( row ) => {
			const {
				coupons,
				gross_sales: grossSales,
				total_sales: totalSales,
				net_revenue: netRevenue,
				orders_count: ordersCount,
				refunds,
				shipping,
				taxes,
			} = row.subtotals;

			// @todo How to create this per-report? Can use `w`, `year`, `m` to build time-specific order links
			// we need to know which kind of report this is, and parse the `label` to get this row's date
			const orderLink = (
				<Link
					href={
						`edit.php?post_type=shop_order&order_date_type=${ this.props.dateType }&m=` +
						formatDate( 'Ymd', row.date_start )
					}
					type="wp-admin"
				>
					{ formatValue(
						getCurrencyConfig(),
						'number',
						ordersCount
					) }
				</Link>
			);
			return [
				{
					display: (
						<Date
							date={ row.date_start }
							visibleFormat={ dateFormat }
						/>
					),
					value: row.date_start,
				},
				{
					display: orderLink,
					value: Number( ordersCount ),
				},
				{
					display: renderCurrency( grossSales ),
					value: getCurrencyFormatDecimal( grossSales ),
				},
				{
					display: formatAmount( refunds ),
					value: getCurrencyFormatDecimal( refunds ),
				},
				{
					display: formatAmount( coupons ),
					value: getCurrencyFormatDecimal( coupons ),
				},
				{
					display: renderCurrency( netRevenue ),
					value: getCurrencyFormatDecimal( netRevenue ),
				},
				{
					display: renderCurrency( taxes ),
					value: getCurrencyFormatDecimal( taxes ),
				},
				{
					display: renderCurrency( shipping ),
					value: getCurrencyFormatDecimal( shipping ),
				},
				{
					display: renderCurrency( totalSales ),
					value: getCurrencyFormatDecimal( totalSales ),
				},
			];
		} );
	}

	getSummary( totals, totalResults = 0 ) {
		const {
			orders_count: ordersCount = 0,
			gross_sales: grossSales = 0,
			total_sales: totalSales = 0,
			refunds = 0,
			coupons = 0,
			taxes = 0,
			shipping = 0,
			net_revenue: netRevenue = 0,
		} = totals;
		const { formatAmount, getCurrencyConfig } = this.context;
		const currency = getCurrencyConfig();
		return [
			{
				label: _n( 'day', 'days', totalResults, 'fincommerce' ),
				value: formatValue( currency, 'number', totalResults ),
			},
			{
				label: _n( 'order', 'orders', ordersCount, 'fincommerce' ),
				value: formatValue( currency, 'number', ordersCount ),
			},
			{
				label: __( 'Gross sales', 'fincommerce' ),
				value: formatAmount( grossSales ),
			},
			{
				label: __( 'Returns', 'fincommerce' ),
				value: formatAmount( refunds ),
			},
			{
				label: __( 'Coupons', 'fincommerce' ),
				value: formatAmount( coupons ),
			},
			{
				label: __( 'Net sales', 'fincommerce' ),
				value: formatAmount( netRevenue ),
			},
			{
				label: __( 'Taxes', 'fincommerce' ),
				value: formatAmount( taxes ),
			},
			{
				label: __( 'Shipping', 'fincommerce' ),
				value: formatAmount( shipping ),
			},
			{
				label: __( 'Total sales', 'fincommerce' ),
				value: formatAmount( totalSales ),
			},
		];
	}

	render() {
		const { advancedFilters, filters, tableData, query } = this.props;

		return (
			<ReportTable
				endpoint="revenue"
				getHeadersContent={ this.getHeadersContent }
				getRowsContent={ this.getRowsContent }
				getSummary={ this.getSummary }
				summaryFields={ summaryFields }
				query={ query }
				tableData={ tableData }
				title={ __( 'Revenue', 'fincommerce' ) }
				columnPrefsKey="revenue_report_columns"
				filters={ filters }
				advancedFilters={ advancedFilters }
			/>
		);
	}
}

RevenueReportTable.contextType = CurrencyContext;

/**
 * Memoized props object formatting function.
 *
 * @param {boolean} isError
 * @param {boolean} isRequesting
 * @param {Object}  tableQuery
 * @param {Object}  revenueData
 * @return {Object} formatted tableData prop
 */
const formatProps = memoize(
	( isError, isRequesting, tableQuery, revenueData, dateType ) => ( {
		tableData: {
			items: {
				data: get( revenueData, [ 'data', 'intervals' ], EMPTY_ARRAY ),
				totalResults: get( revenueData, [ 'totalResults' ], 0 ),
			},
			isError,
			isRequesting,
			query: tableQuery,
		},
		dateType,
	} ),
	( isError, isRequesting, tableQuery, revenueData, dateType ) =>
		[
			isError,
			isRequesting,
			stringify( tableQuery ),
			get( revenueData, [ 'totalResults' ], 0 ),
			get( revenueData, [ 'data', 'intervals' ], EMPTY_ARRAY ).length,
			dateType,
		].join( ':' )
);

/**
 * Memoized table query formatting function.
 *
 * @param {string} order
 * @param {string} orderBy
 * @param {number} page
 * @param {number} pageSize
 * @param {Object} datesFromQuery
 * @return {Object} formatted tableQuery object
 */
const formatTableQuery = memoize(
	// @todo Support hour here when viewing a single day
	( order, orderBy, page, pageSize, datesFromQuery ) => ( {
		interval: 'day',
		orderby: orderBy,
		order,
		page,
		per_page: pageSize,
		after: appendTimestamp( datesFromQuery.primary.after, 'start' ),
		before: appendTimestamp( datesFromQuery.primary.before, 'end' ),
	} ),
	( order, orderBy, page, pageSize, datesFromQuery ) =>
		[
			order,
			orderBy,
			page,
			pageSize,
			datesFromQuery.primary.after,
			datesFromQuery.primary.before,
		].join( ':' )
);

export default compose(
	withSelect( ( select, props ) => {
		const { query, filters, advancedFilters } = props;
		const { fincommerce_default_date_range: defaultDateRange } = select(
			settingsStore
		).getSetting( 'wc_admin', 'wcAdminSettings' );
		const { getOption } = select( optionsStore );
		const dateType = getOption( 'fincommerce_date_type' ) || 'date_paid';
		const datesFromQuery = getCurrentDates( query, defaultDateRange );
		const { getReportStats, getReportStatsError, isResolving } =
			select( reportsStore );

		const tableQuery = formatTableQuery(
			query.order || 'desc',
			query.orderby || 'date',
			query.paged || 1,
			query.per_page || QUERY_DEFAULTS.pageSize,
			datesFromQuery
		);
		const filteredTableQuery = getReportTableQuery( {
			endpoint: 'revenue',
			query,
			select,
			tableQuery,
			filters,
			advancedFilters,
		} );
		const revenueData = getReportStats( 'revenue', filteredTableQuery );
		const isError = Boolean(
			getReportStatsError( 'revenue', filteredTableQuery )
		);
		const isRequesting = isResolving( 'getReportStats', [
			'revenue',
			filteredTableQuery,
		] );

		return formatProps(
			isError,
			isRequesting,
			tableQuery,
			revenueData,
			dateType
		);
	} )
)( RevenueReportTable );
