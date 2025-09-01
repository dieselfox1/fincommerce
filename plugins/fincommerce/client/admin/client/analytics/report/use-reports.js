/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { lazy } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getAdminSetting } from '~/utils/admin-settings';
import { useFilterHook } from '~/utils/use-filter-hook';

const RevenueReport = lazy( () =>
	import( /* webpackChunkName: "analytics-report-revenue" */ './revenue' )
);
const ProductsReport = lazy( () =>
	import( /* webpackChunkName: "analytics-report-products" */ './products' )
);
const VariationsReport = lazy( () =>
	import(
		/* webpackChunkName: "analytics-report-variations" */ './variations'
	)
);
const OrdersReport = lazy( () =>
	import( /* webpackChunkName: "analytics-report-orders" */ './orders' )
);
const CategoriesReport = lazy( () =>
	import(
		/* webpackChunkName: "analytics-report-categories" */ './categories'
	)
);
const CouponsReport = lazy( () =>
	import( /* webpackChunkName: "analytics-report-coupons" */ './coupons' )
);
const TaxesReport = lazy( () =>
	import( /* webpackChunkName: "analytics-report-taxes" */ './taxes' )
);
const DownloadsReport = lazy( () =>
	import( /* webpackChunkName: "analytics-report-downloads" */ './downloads' )
);
const StockReport = lazy( () =>
	import( /* webpackChunkName: "analytics-report-stock" */ './stock' )
);
const CustomersReport = lazy( () =>
	import( /* webpackChunkName: "analytics-report-customers" */ './customers' )
);

const manageStock = getAdminSetting( 'manageStock', 'no' );
const REPORTS_FILTER = 'fincommerce_admin_reports_list';

const getReports = () => {
	const reports = [
		{
			report: 'revenue',
			title: __( 'Revenue', 'fincommerce' ),
			component: RevenueReport,
			navArgs: {
				id: 'fincommerce-analytics-revenue',
			},
		},
		{
			report: 'products',
			title: __( 'Products', 'fincommerce' ),
			component: ProductsReport,
			navArgs: {
				id: 'fincommerce-analytics-products',
			},
		},
		{
			report: 'variations',
			title: __( 'Variations', 'fincommerce' ),
			component: VariationsReport,
			navArgs: {
				id: 'fincommerce-analytics-variations',
			},
		},
		{
			report: 'orders',
			title: __( 'Orders', 'fincommerce' ),
			component: OrdersReport,
			navArgs: {
				id: 'fincommerce-analytics-orders',
			},
		},
		{
			report: 'categories',
			title: __( 'Categories', 'fincommerce' ),
			component: CategoriesReport,
			navArgs: {
				id: 'fincommerce-analytics-categories',
			},
		},
		{
			report: 'coupons',
			title: __( 'Coupons', 'fincommerce' ),
			component: CouponsReport,
			navArgs: {
				id: 'fincommerce-analytics-coupons',
			},
		},
		{
			report: 'taxes',
			title: __( 'Taxes', 'fincommerce' ),
			component: TaxesReport,
			navArgs: {
				id: 'fincommerce-analytics-taxes',
			},
		},
		manageStock === 'yes'
			? {
					report: 'stock',
					title: __( 'Stock', 'fincommerce' ),
					component: StockReport,
					navArgs: {
						id: 'fincommerce-analytics-stock',
					},
			  }
			: null,
		{
			report: 'customers',
			title: __( 'Customers', 'fincommerce' ),
			component: CustomersReport,
		},
		{
			report: 'downloads',
			title: __( 'Downloads', 'fincommerce' ),
			component: DownloadsReport,
			navArgs: {
				id: 'fincommerce-analytics-downloads',
			},
		},
	].filter( Boolean );

	/**
	 * An object defining a report page.
	 *
	 * @typedef {Object} report
	 * @property {string} report    Report slug.
	 * @property {string} title     Report title.
	 * @property {Node}   component React Component to render.
	 * @property {Object} navArgs   Arguments supplied to FinCommerce Navigation.
	 */

	/**
	 * Filter Report pages list.
	 *
	 * @filter fincommerce_admin_reports_list
	 * @param {Array.<report>} reports Report pages list.
	 */
	return applyFilters( REPORTS_FILTER, reports );
};

export function useReports() {
	return useFilterHook( REPORTS_FILTER, getReports );
}
