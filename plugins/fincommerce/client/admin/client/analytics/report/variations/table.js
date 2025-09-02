/**
 * External dependencies
 */
import { __, _n, _x } from '@finpress/i18n';
import { applyFilters } from '@finpress/hooks';
import { Component } from '@finpress/element';
import { map } from 'lodash';
import { Link } from '@fincommerce/components';
import { getNewPath, getPersistedQuery } from '@fincommerce/navigation';
import { formatValue } from '@fincommerce/number';
import { getAdminLink } from '@fincommerce/settings';
import { CurrencyContext } from '@fincommerce/currency';

/**
 * Internal dependencies
 */
import ReportTable from '../../components/report-table';
import { isLowStock } from '../products/utils';
import { getVariationName } from '../../../lib/async-requests';
import { getAdminSetting } from '~/utils/admin-settings';

const EXPERIMENTAL_VARIATIONS_REPORT_TABLE_TITLE_FILTER =
	'experimental_fincommerce_admin_variations_report_table_title';
const EXPERIMENTAL_VARIATIONS_REPORT_TABLE_SUMMARY_VARIATIONS_COUNT_LABEL_FILTER =
	'experimental_fincommerce_admin_variations_report_table_summary_variations_count_label';

const manageStock = getAdminSetting( 'manageStock', 'no' );
const stockStatuses = getAdminSetting( 'stockStatuses', {} );

const getFullVariationName = ( rowData ) =>
	getVariationName( rowData.extended_info || {} );

class VariationsReportTable extends Component {
	constructor() {
		super();

		this.getHeadersContent = this.getHeadersContent.bind( this );
		this.getRowsContent = this.getRowsContent.bind( this );
		this.getSummary = this.getSummary.bind( this );
	}

	getHeadersContent() {
		return [
			{
				label: __( 'Product / Variation title', 'fincommerce' ),
				key: 'name',
				required: true,
				isLeftAligned: true,
			},
			{
				label: __( 'SKU', 'fincommerce' ),
				key: 'sku',
				hiddenByDefault: true,
				isSortable: true,
			},
			{
				label: __( 'Items sold', 'fincommerce' ),
				key: 'items_sold',
				required: true,
				defaultSort: true,
				isSortable: true,
				isNumeric: true,
			},
			{
				label: __( 'Net sales', 'fincommerce' ),
				screenReaderLabel: __( 'Net sales', 'fincommerce' ),
				key: 'net_revenue',
				required: true,
				isSortable: true,
				isNumeric: true,
			},
			{
				label: __( 'Orders', 'fincommerce' ),
				key: 'orders_count',
				isSortable: true,
				isNumeric: true,
			},
			manageStock === 'yes'
				? {
						label: __( 'Status', 'fincommerce' ),
						key: 'stock_status',
				  }
				: null,
			manageStock === 'yes'
				? {
						label: __( 'Stock', 'fincommerce' ),
						key: 'stock',
						isNumeric: true,
				  }
				: null,
		].filter( Boolean );
	}

	getRowsContent( data = [] ) {
		const { query } = this.props;
		const persistedQuery = getPersistedQuery( query );
		const {
			formatAmount,
			formatDecimal: getCurrencyFormatDecimal,
			getCurrencyConfig,
		} = this.context;

		return map( data, ( row ) => {
			const {
				items_sold: itemsSold,
				net_revenue: netRevenue,
				orders_count: ordersCount,
				product_id: productId,
				variation_id: variationId,
			} = row;
			const extendedInfo = row.extended_info || {};
			const {
				stock_status: stockStatus,
				stock_quantity: stockQuantity,
				low_stock_amount: lowStockAmount,
				deleted,
				sku,
			} = extendedInfo;
			const name = getFullVariationName( row );
			const ordersLink = getNewPath(
				persistedQuery,
				'/analytics/orders',
				{
					filter: 'advanced',
					variation_includes: variationId,
				}
			);
			const editPostLink = getAdminLink(
				`post.php?post=${ productId }&action=edit`
			);

			return [
				{
					display: deleted ? (
						name + ' ' + __( '(Deleted)', 'fincommerce' )
					) : (
						<Link href={ editPostLink } type="wp-admin">
							{ name }
						</Link>
					),
					value: name,
				},
				{
					display: sku,
					value: sku,
				},
				{
					display: formatValue(
						getCurrencyConfig(),
						'number',
						itemsSold
					),
					value: itemsSold,
				},
				{
					display: formatAmount( netRevenue ),
					value: getCurrencyFormatDecimal( netRevenue ),
				},
				{
					display: (
						<Link href={ ordersLink } type="wc-admin">
							{ ordersCount }
						</Link>
					),
					value: ordersCount,
				},
				manageStock === 'yes'
					? {
							display: isLowStock(
								stockStatus,
								stockQuantity,
								lowStockAmount
							) ? (
								<Link href={ editPostLink } type="wp-admin">
									{ _x(
										'Low',
										'Indication of a low quantity',
										'fincommerce'
									) }
								</Link>
							) : (
								stockStatuses[ stockStatus ]
							),
							value: stockStatuses[ stockStatus ],
					  }
					: null,
				manageStock === 'yes'
					? {
							display: stockQuantity,
							value: stockQuantity,
					  }
					: null,
			].filter( Boolean );
		} );
	}

	getSummary( totals ) {
		const { query } = this.props;
		const {
			variations_count: variationsCount = 0,
			items_sold: itemsSold = 0,
			net_revenue: netRevenue = 0,
			orders_count: ordersCount = 0,
		} = totals;
		const { formatAmount, getCurrencyConfig } = this.context;
		const currency = getCurrencyConfig();
		return [
			{
				/**
				 * Experimental: Filter the label used for the number of variations in the report table summary.
				 *
				 * @filter experimental_fincommerce_admin_variations_report_table_summary_variations_count_label
				 *
				 * @param {string} label           Label used for the count.
				 * @param {string} variationsCount Number of variations.
				 * @param {Array}  query           Query parameters.
				 */
				label: applyFilters(
					EXPERIMENTAL_VARIATIONS_REPORT_TABLE_SUMMARY_VARIATIONS_COUNT_LABEL_FILTER,
					_n(
						'variation sold',
						'variations sold',
						variationsCount,
						'fincommerce'
					),
					variationsCount,
					query
				),
				value: formatValue( currency, 'number', variationsCount ),
			},
			{
				label: _n(
					'item sold',
					'items sold',
					itemsSold,
					'fincommerce'
				),
				value: formatValue( currency, 'number', itemsSold ),
			},
			{
				label: __( 'net sales', 'fincommerce' ),
				value: formatAmount( netRevenue ),
			},
			{
				label: _n( 'orders', 'orders', ordersCount, 'fincommerce' ),
				value: formatValue( currency, 'number', ordersCount ),
			},
		];
	}

	render() {
		const {
			advancedFilters,
			baseSearchQuery,
			filters,
			isRequesting,
			query,
		} = this.props;

		const labels = {
			helpText: __(
				'Check at least two variations below to compare',
				'fincommerce'
			),
			placeholder: __( 'Search by variation name or SKU', 'fincommerce' ),
		};

		return (
			<ReportTable
				baseSearchQuery={ baseSearchQuery }
				compareBy="variations"
				compareParam="filter-variations"
				endpoint="variations"
				getHeadersContent={ this.getHeadersContent }
				getRowsContent={ this.getRowsContent }
				isRequesting={ isRequesting }
				itemIdField="variation_id"
				labels={ labels }
				query={ query }
				getSummary={ this.getSummary }
				summaryFields={ [
					'variations_count',
					'items_sold',
					'net_revenue',
					'orders_count',
				] }
				tableQuery={ {
					orderby: query.orderby || 'items_sold',
					order: query.order || 'desc',
					extended_info: true,
					product_includes: query.product_includes,
					variations: query.variations,
				} }
				/**
				 * Experimental: Filter the title used for the report table.
				 *
				 * @filter experimental_fincommerce_admin_variations_report_table_title
				 *
				 * @param {string} title Title used for the report table.
				 * @param {Array}  query Query parameters.
				 */
				title={ applyFilters(
					EXPERIMENTAL_VARIATIONS_REPORT_TABLE_TITLE_FILTER,
					__( 'Variations', 'fincommerce' ),
					query
				) }
				columnPrefsKey="variations_report_columns"
				filters={ filters }
				advancedFilters={ advancedFilters }
			/>
		);
	}
}

VariationsReportTable.contextType = CurrencyContext;

export default VariationsReportTable;
