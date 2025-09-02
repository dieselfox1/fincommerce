/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { applyFilters } from '@finpress/hooks';
import { lazy, Suspense } from '@finpress/element';
import { Spinner } from '@fincommerce/components';
import { arrowRight, chartBar } from '@finpress/icons';
import ListOrdered from 'gridicons/dist/list-ordered';

/**
 * Internal dependencies
 */
const LazyDashboardCharts = lazy( () =>
	import( /* webpackChunkName: "dashboard-charts" */ './dashboard-charts' )
);
const LazyLeaderboards = lazy( () =>
	import( /* webpackChunkName: "leaderboards" */ './leaderboards' )
);
const LazyStorePerformance = lazy( () =>
	import( /* webpackChunkName: "store-performance" */ './store-performance' )
);

const DashboardCharts = ( props ) => (
	<Suspense fallback={ <Spinner /> }>
		<LazyDashboardCharts { ...props } />
	</Suspense>
);

const Leaderboards = ( props ) => (
	<Suspense fallback={ <Spinner /> }>
		<LazyLeaderboards { ...props } />
	</Suspense>
);

const StorePerformance = ( props ) => (
	<Suspense fallback={ <Spinner /> }>
		<LazyStorePerformance { ...props } />
	</Suspense>
);

export const DEFAULT_SECTIONS_FILTER = 'fincommerce_dashboard_default_sections';

/**
 * An object defining a dashboard section.
 *
 * @typedef {Object} section
 * @property {string}         key          Unique identifying string.
 * @property {Node}           component    React component to render.
 * @property {string}         title        Title.
 * @property {boolean}        isVisible    The default visibility.
 * @property {Node}           icon         Section icon.
 * @property {Array.<string>} hiddenBlocks Blocks that are hidden by default.
 */

/**
 * Default Dashboard sections. Defaults are Store Performance, Charts, and Leaderboards
 *
 * @filter fincommerce_dashboard_default_sections
 * @param {Array.<section>} sections Report filters.
 */
export default applyFilters( DEFAULT_SECTIONS_FILTER, [
	{
		key: 'store-performance',
		component: StorePerformance,
		title: __( 'Performance', 'fincommerce' ),
		isVisible: true,
		icon: arrowRight,
		hiddenBlocks: [
			'coupons/amount',
			'coupons/orders_count',
			'downloads/download_count',
			'taxes/order_tax',
			'taxes/total_tax',
			'taxes/shipping_tax',
			'revenue/shipping',
			'orders/avg_order_value',
			'revenue/refunds',
			'revenue/gross_sales',
		],
	},
	{
		key: 'charts',
		component: DashboardCharts,
		title: __( 'Charts', 'fincommerce' ),
		isVisible: true,
		icon: chartBar,
		hiddenBlocks: [
			'orders_avg_order_value',
			'avg_items_per_order',
			'products_items_sold',
			'revenue_total_sales',
			'revenue_refunds',
			'coupons_amount',
			'coupons_orders_count',
			'revenue_shipping',
			'taxes_total_tax',
			'taxes_order_tax',
			'taxes_shipping_tax',
			'downloads_download_count',
		],
	},
	{
		key: 'leaderboards',
		component: Leaderboards,
		title: __( 'Leaderboards', 'fincommerce' ),
		isVisible: true,
		icon: <ListOrdered />,
		hiddenBlocks: [ 'coupons', 'customers' ],
	},
] );
