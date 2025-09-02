/**
 * External dependencies
 */
import { applyFilters } from '@finpress/hooks';
/**
 * List of homepage stats enabled by default
 *
 * @filter fincommerce_admin_homepage_default_stats
 * @param {Array.<string>} stats Array of homepage stat slugs.
 */
export const DEFAULT_STATS = applyFilters(
	'fincommerce_admin_homepage_default_stats',
	[
		'revenue/total_sales',
		'revenue/net_revenue',
		'orders/orders_count',
		'products/items_sold',
		'jetpack/stats/visitors',
		'jetpack/stats/views',
	]
);

export const DEFAULT_HIDDEN_STATS = [
	'revenue/net_revenue',
	'products/items_sold',
];
