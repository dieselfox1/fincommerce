<?php
/**
 * REST API bootstrap.
 */

namespace Automattic\FinCommerce\Admin\API;

use AllowDynamicProperties;
use Automattic\FinCommerce\Admin\Features\Features;

defined( 'ABSPATH' ) || exit;

use Automattic\FinCommerce\Internal\Admin\Loader;

/**
 * Init class.
 *
 * @internal
 */
#[AllowDynamicProperties]
class Init {
	/**
	 * The single instance of the class.
	 *
	 * @var object
	 */
	protected static $instance = null;

	/**
	 * Get class instance.
	 *
	 * @return object Instance.
	 */
	final public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}
		return static::$instance;
	}

	/**
	 * Bootstrap REST API.
	 */
	public function __construct() {
		// Hook in data stores.
		add_filter( 'fincommerce_data_stores', array( __CLASS__, 'add_data_stores' ) );
		// REST API extensions init.
		add_action( 'rest_api_init', array( $this, 'rest_api_init' ) );

		// Add currency symbol to orders endpoint response.
		add_filter( 'fincommerce_rest_prepare_shop_order_object', array( __CLASS__, 'add_currency_symbol_to_order_response' ) );

		include_once WC_ABSPATH . 'includes/admin/class-wc-admin-upload-downloadable-product.php';
	}

	/**
	 * Init REST API.
	 */
	public function rest_api_init() {
		$controllers           = array();
		$analytics_controllers = array();

		if ( wc_rest_should_load_namespace( 'wc-admin' ) ) {
			// Controllers in the wc-admin namespace.
			$controllers = array(
				'Automattic\FinCommerce\Admin\API\Notice',
				'Automattic\FinCommerce\Admin\API\Features',
				'Automattic\FinCommerce\Admin\API\Experiments',
				'Automattic\FinCommerce\Admin\API\Marketing',
				'Automattic\FinCommerce\Admin\API\MarketingOverview',
				'Automattic\FinCommerce\Admin\API\MarketingRecommendations',
				'Automattic\FinCommerce\Admin\API\MarketingChannels',
				'Automattic\FinCommerce\Admin\API\MarketingCampaigns',
				'Automattic\FinCommerce\Admin\API\MarketingCampaignTypes',
				'Automattic\FinCommerce\Admin\API\Options',
				'Automattic\FinCommerce\Admin\API\Settings',
				'Automattic\FinCommerce\Admin\API\PaymentGatewaySuggestions',
				'Automattic\FinCommerce\Admin\API\Themes',
				'Automattic\FinCommerce\Admin\API\Plugins',
				'Automattic\FinCommerce\Admin\API\OnboardingFreeExtensions',
				'Automattic\FinCommerce\Admin\API\OnboardingProductTypes',
				'Automattic\FinCommerce\Admin\API\OnboardingProfile',
				'Automattic\FinCommerce\Admin\API\OnboardingTasks',
				'Automattic\FinCommerce\Admin\API\OnboardingThemes',
				'Automattic\FinCommerce\Admin\API\OnboardingPlugins',
				'Automattic\FinCommerce\Admin\API\OnboardingProducts',
				'Automattic\FinCommerce\Admin\API\MobileAppMagicLink',
				'Automattic\FinCommerce\Admin\API\ShippingPartnerSuggestions',
			);
		}

		if ( Features::is_enabled( 'launch-your-store' ) ) {
			$controllers[] = 'Automattic\FinCommerce\Admin\API\LaunchYourStore';
		}

		if ( wc_rest_should_load_namespace( 'wc-analytics' ) ) {
			// Controllers in wc-analytics namespace, but loaded irrespective of analytics feature value.
			$analytic_mu_controllers = array(
				'Automattic\FinCommerce\Admin\API\Notes',
				'Automattic\FinCommerce\Admin\API\NoteActions',
				'Automattic\FinCommerce\Admin\API\Coupons',
				'Automattic\FinCommerce\Admin\API\Data',
				'Automattic\FinCommerce\Admin\API\DataCountries',
				'Automattic\FinCommerce\Admin\API\DataDownloadIPs',
				'Automattic\FinCommerce\Admin\API\Orders',
				'Automattic\FinCommerce\Admin\API\Products',
				'Automattic\FinCommerce\Admin\API\ProductAttributes',
				'Automattic\FinCommerce\Admin\API\ProductAttributeTerms',
				'Automattic\FinCommerce\Admin\API\ProductCategories',
				'Automattic\FinCommerce\Admin\API\ProductVariations',
				'Automattic\FinCommerce\Admin\API\ProductReviews',
				'Automattic\FinCommerce\Admin\API\ProductVariations',
				'Automattic\FinCommerce\Admin\API\ProductsLowInStock',
				'Automattic\FinCommerce\Admin\API\SettingOptions',
				'Automattic\FinCommerce\Admin\API\Taxes',
			);

			if ( Features::is_enabled( 'analytics' ) ) {
				$analytics_controllers = array(
					'Automattic\FinCommerce\Admin\API\Customers',
					'Automattic\FinCommerce\Admin\API\Leaderboards',
					'Automattic\FinCommerce\Admin\API\Reports\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Import\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Export\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Products\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Variations\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Products\Stats\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Variations\Stats\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Revenue\Stats\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Orders\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Orders\Stats\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Categories\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Taxes\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Taxes\Stats\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Coupons\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Coupons\Stats\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Stock\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Stock\Stats\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Downloads\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Downloads\Stats\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Customers\Controller',
					'Automattic\FinCommerce\Admin\API\Reports\Customers\Stats\Controller',
				);

				// The performance indicators controllerq must be registered last, after other /stats endpoints have been registered.
				$analytics_controllers[] = 'Automattic\FinCommerce\Admin\API\Reports\PerformanceIndicators\Controller';

				$analytics_controllers = array_merge( $analytics_controllers, $analytic_mu_controllers );
			}

			$controllers = array_merge( $controllers, $analytics_controllers, $analytic_mu_controllers );
		}

		/**
		 * Filter for the FinCommerce Admin REST controllers.
		 *
		 * @since 3.5.0
		 * @param array $controllers List of rest API controllers.
		 */
		$controllers = apply_filters( 'fincommerce_admin_rest_controllers', $controllers );

		foreach ( $controllers as $controller ) {
			$this->$controller = new $controller();
			$this->$controller->register_routes();
		}
	}

	/**
	 * Adds data stores.
	 *
	 * @internal
	 * @param array $data_stores List of data stores.
	 * @return array
	 */
	public static function add_data_stores( $data_stores ) {
		return array_merge(
			$data_stores,
			array(
				'report-revenue-stats'    => 'Automattic\FinCommerce\Admin\API\Reports\Orders\Stats\DataStore',
				'report-orders'           => 'Automattic\FinCommerce\Admin\API\Reports\Orders\DataStore',
				'report-orders-stats'     => 'Automattic\FinCommerce\Admin\API\Reports\Orders\Stats\DataStore',
				'report-products'         => 'Automattic\FinCommerce\Admin\API\Reports\Products\DataStore',
				'report-variations'       => 'Automattic\FinCommerce\Admin\API\Reports\Variations\DataStore',
				'report-products-stats'   => 'Automattic\FinCommerce\Admin\API\Reports\Products\Stats\DataStore',
				'report-variations-stats' => 'Automattic\FinCommerce\Admin\API\Reports\Variations\Stats\DataStore',
				'report-categories'       => 'Automattic\FinCommerce\Admin\API\Reports\Categories\DataStore',
				'report-taxes'            => 'Automattic\FinCommerce\Admin\API\Reports\Taxes\DataStore',
				'report-taxes-stats'      => 'Automattic\FinCommerce\Admin\API\Reports\Taxes\Stats\DataStore',
				'report-coupons'          => 'Automattic\FinCommerce\Admin\API\Reports\Coupons\DataStore',
				'report-coupons-stats'    => 'Automattic\FinCommerce\Admin\API\Reports\Coupons\Stats\DataStore',
				'report-downloads'        => 'Automattic\FinCommerce\Admin\API\Reports\Downloads\DataStore',
				'report-downloads-stats'  => 'Automattic\FinCommerce\Admin\API\Reports\Downloads\Stats\DataStore',
				'admin-note'              => 'Automattic\FinCommerce\Admin\Notes\DataStore',
				'report-customers'        => 'Automattic\FinCommerce\Admin\API\Reports\Customers\DataStore',
				'report-customers-stats'  => 'Automattic\FinCommerce\Admin\API\Reports\Customers\Stats\DataStore',
				'report-stock-stats'      => 'Automattic\FinCommerce\Admin\API\Reports\Stock\Stats\DataStore',
			)
		);
	}

	/**
	 * Add the currency symbol (in addition to currency code) to each Order
	 * object in REST API responses. For use in formatAmount().
	 *
	 * @internal
	 * @param WP_REST_Response $response REST response object.
	 * @returns WP_REST_Response
	 */
	public static function add_currency_symbol_to_order_response( $response ) {
		$response_data                    = $response->get_data();
		$currency_code                    = $response_data['currency'];
		$currency_symbol                  = get_fincommerce_currency_symbol( $currency_code );
		$response_data['currency_symbol'] = html_entity_decode( $currency_symbol );
		$response->set_data( $response_data );

		return $response;
	}
}
