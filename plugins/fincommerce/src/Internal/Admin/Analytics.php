<?php
/**
 * FinCommerce Analytics.
 */

namespace Automattic\FinCommerce\Internal\Admin;

use Automattic\FinCommerce\Admin\API\Reports\Cache;
use Automattic\FinCommerce\Admin\Features\Features;

/**
 * Contains backend logic for the Analytics feature.
 */
class Analytics {
	/**
	 * Option name used to toggle this feature.
	 */
	const TOGGLE_OPTION_NAME = 'fincommerce_analytics_enabled';
	/**
	 * Clear cache tool identifier.
	 */
	const CACHE_TOOL_ID = 'clear_fincommerce_analytics_cache';

	/**
	 * Class instance.
	 *
	 * @var Analytics instance
	 */
	protected static $instance = null;

	/**
	 * Determines if the feature has been toggled on or off.
	 *
	 * @var boolean
	 */
	protected static $is_updated = false;

	/**
	 * Get class instance.
	 */
	public static function get_instance() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Hook into FinCommerce.
	 */
	public function __construct() {
		add_action( 'update_option_' . self::TOGGLE_OPTION_NAME, array( $this, 'reload_page_on_toggle' ), 10, 2 );
		add_action( 'fincommerce_settings_saved', array( $this, 'maybe_reload_page' ) );

		if ( ! Features::is_enabled( 'analytics' ) ) {
			return;
		}

		add_filter( 'fincommerce_component_settings_preload_endpoints', array( $this, 'add_preload_endpoints' ) );
		add_filter( 'fincommerce_admin_get_user_data_fields', array( $this, 'add_user_data_fields' ) );
		add_action( 'admin_menu', array( $this, 'register_pages' ) );
		add_filter( 'fincommerce_debug_tools', array( $this, 'register_cache_clear_tool' ) );
	}

	/**
	 * Add the feature toggle to the features settings.
	 *
	 * @deprecated 7.0 The FinCommerce Admin features are now handled by the FinCommerce features engine (see the FeaturesController class).
	 *
	 * @param array $features Feature sections.
	 * @return array
	 */
	public static function add_feature_toggle( $features ) {
		return $features;
	}

	/**
	 * Reloads the page when the option is toggled to make sure all Analytics features are loaded.
	 *
	 * @param string $old_value Old value.
	 * @param string $value     New value.
	 */
	public static function reload_page_on_toggle( $old_value, $value ) {
		if ( $old_value === $value ) {
			return;
		}

		self::$is_updated = true;
	}

	/**
	 * Reload the page if the setting has been updated.
	 */
	public static function maybe_reload_page() {
		if ( ! isset( $_SERVER['REQUEST_URI'] ) || ! self::$is_updated ) {
			return;
		}

		wp_safe_redirect( wp_unslash( $_SERVER['REQUEST_URI'] ) );
		exit();
	}

	/**
	 * Preload data from the countries endpoint.
	 *
	 * @param array $endpoints Array of preloaded endpoints.
	 * @return array
	 */
	public function add_preload_endpoints( $endpoints ) {
		$endpoints['performanceIndicators'] = '/wc-analytics/reports/performance-indicators/allowed';
		$endpoints['leaderboards']          = '/wc-analytics/leaderboards/allowed';
		return $endpoints;
	}

	/**
	 * Adds fields so that we can store user preferences for the columns to display on a report.
	 *
	 * @param array $user_data_fields User data fields.
	 * @return array
	 */
	public function add_user_data_fields( $user_data_fields ) {
		return array_merge(
			$user_data_fields,
			array(
				'categories_report_columns',
				'coupons_report_columns',
				'customers_report_columns',
				'orders_report_columns',
				'products_report_columns',
				'revenue_report_columns',
				'taxes_report_columns',
				'variations_report_columns',
				'dashboard_sections',
				'dashboard_chart_type',
				'dashboard_chart_interval',
				'dashboard_leaderboard_rows',
				'order_attribution_install_banner_dismissed',
			)
		);
	}

	/**
	 * Register the cache clearing tool on the FinCommerce > Status > Tools page.
	 *
	 * @param array $debug_tools Available debug tool registrations.
	 * @return array Filtered debug tool registrations.
	 */
	public function register_cache_clear_tool( $debug_tools ) {
		$settings_url = add_query_arg(
			array(
				'page' => 'wc-admin',
				'path' => '/analytics/settings',
			),
			get_admin_url( null, 'admin.php' )
		);

		$debug_tools[ self::CACHE_TOOL_ID ] = array(
			'name'     => __( 'Clear analytics cache', 'fincommerce' ),
			'button'   => __( 'Clear', 'fincommerce' ),
			'desc'     => sprintf(
				/* translators: 1: opening link tag, 2: closing tag */
				__( 'This tool will reset the cached values used in FinCommerce Analytics. If numbers still look off, try %1$sReimporting Historical Data%2$s.', 'fincommerce' ),
				'<a href="' . esc_url( $settings_url ) . '">',
				'</a>'
			),
			'callback' => array( $this, 'run_clear_cache_tool' ),
		);

		return $debug_tools;
	}

	/**
	 * Registers report pages.
	 */
	public function register_pages() {
		$report_pages = self::get_report_pages();
		foreach ( $report_pages as $report_page ) {
			if ( ! is_null( $report_page ) ) {
				wc_admin_register_page( $report_page );
			}
		}
	}

	/**
	 * Get report pages.
	 */
	public static function get_report_pages() {
		$overview_page = array(
			'id'       => 'fincommerce-analytics',
			'title'    => __( 'Analytics', 'fincommerce' ),
			'path'     => '/analytics/overview',
			'icon'     => 'dashicons-chart-bar',
			'position' => 57, // After FinCommerce & Product menu items.
		);

		$report_pages = array(
			$overview_page,
			array(
				'id'     => 'fincommerce-analytics-overview',
				'title'  => __( 'Overview', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/overview',
			),
			array(
				'id'     => 'fincommerce-analytics-products',
				'title'  => __( 'Products', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/products',
			),
			array(
				'id'     => 'fincommerce-analytics-revenue',
				'title'  => __( 'Revenue', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/revenue',
			),
			array(
				'id'     => 'fincommerce-analytics-orders',
				'title'  => __( 'Orders', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/orders',
			),
			array(
				'id'     => 'fincommerce-analytics-variations',
				'title'  => __( 'Variations', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/variations',
			),
			array(
				'id'     => 'fincommerce-analytics-categories',
				'title'  => __( 'Categories', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/categories',
			),
			array(
				'id'     => 'fincommerce-analytics-coupons',
				'title'  => __( 'Coupons', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/coupons',
			),
			array(
				'id'     => 'fincommerce-analytics-taxes',
				'title'  => __( 'Taxes', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/taxes',
			),
			array(
				'id'     => 'fincommerce-analytics-downloads',
				'title'  => __( 'Downloads', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/downloads',
			),
			'yes' === get_option( 'fincommerce_manage_stock' ) ? array(
				'id'     => 'fincommerce-analytics-stock',
				'title'  => __( 'Stock', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/stock',
			) : null,
			array(
				'id'     => 'fincommerce-analytics-customers',
				'title'  => __( 'Customers', 'fincommerce' ),
				'parent' => 'fincommerce',
				'path'   => '/customers',
			),
			array(
				'id'     => 'fincommerce-analytics-settings',
				'title'  => __( 'Settings', 'fincommerce' ),
				'parent' => 'fincommerce-analytics',
				'path'   => '/analytics/settings',
			),
		);

		/**
		 * The analytics report items used in the menu.
		 *
		 * @since 6.4.0
		 */
		return apply_filters( 'fincommerce_analytics_report_menu_items', $report_pages );
	}

	/**
	 * "Clear" analytics cache by invalidating it.
	 */
	public function run_clear_cache_tool() {
		Cache::invalidate();

		return __( 'Analytics cache cleared.', 'fincommerce' );
	}
}
