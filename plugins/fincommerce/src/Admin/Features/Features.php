<?php
/**
 * Features loader for features developed in FinCommerce Admin.
 */

namespace Automattic\FinCommerce\Admin\Features;

use Automattic\FinCommerce\Admin\PageController;
use Automattic\FinCommerce\Internal\Admin\Loader;
use Automattic\FinCommerce\Internal\Admin\WCAdminAssets;
use Automattic\FinCommerce\Utilities\FeaturesUtil;

/**
 * Features Class.
 */
class Features {
	/**
	 * Class instance.
	 *
	 * @var Loader instance
	 */
	protected static $instance = null;

	/**
	 * Optional features
	 *
	 * @var array
	 */
	protected static $optional_features = array(
		'analytics'                  => array( 'default' => 'yes' ),
		'remote-inbox-notifications' => array( 'default' => 'yes' ),
	);

	/**
	 * Beta features
	 *
	 * @var array
	 */
	protected static $beta_features = array(
		'settings',
	);

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
	 * Constructor.
	 */
	public function __construct() {

		$this->register_internal_class_aliases();

		if ( ! self::should_load_features() ) {
			return;
		}

		// Load feature before FinCommerce update hooks.
		add_action( 'init', array( __CLASS__, 'load_features' ), 4 );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'maybe_load_beta_features_modal' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'load_scripts' ), 15 );
		add_filter( 'admin_body_class', array( __CLASS__, 'add_admin_body_classes' ) );
		add_filter( 'update_option_fincommerce_allow_tracking', array( __CLASS__, 'maybe_disable_features' ), 10, 2 );
	}

	/**
	 * Gets a build configured array of enabled FinCommerce Admin features/sections, but does not respect optionally disabled features.
	 *
	 * @return array Enabled Fincommerce Admin features/sections.
	 */
	public static function get_features() {
		return apply_filters( 'fincommerce_admin_features', array() );
	}

	/**
	 * Gets the optional feature options as an associative array that can be toggled on or off.
	 *
	 * @return array
	 */
	public static function get_optional_feature_options() {
		$features = array();

		foreach ( array_keys( self::$optional_features ) as $optional_feature_key ) {
			$feature_class = self::get_feature_class( $optional_feature_key );

			if ( $feature_class ) {
				$features[ $optional_feature_key ] = $feature_class::TOGGLE_OPTION_NAME;
			}
		}
		return $features;
	}

	/**
	 * Returns if a specific wc-admin feature exists in the current environment.
	 *
	 * @param  string $feature Feature slug.
	 * @return bool Returns true if the feature exists.
	 */
	public static function exists( $feature ) {
		$features = self::get_features();
		return in_array( $feature, $features, true );
	}

	/**
	 * Get the feature class as a string.
	 *
	 * @param string $feature Feature name.
	 * @return string|null
	 */
	public static function get_feature_class( $feature ) {
		$feature       = str_replace( '-', '', ucwords( strtolower( $feature ), '-' ) );
		$feature_class = 'Automattic\\FinCommerce\\Admin\\Features\\' . $feature;

		$should_autoload_class = self::should_load_features();

		if ( class_exists( $feature_class, $should_autoload_class ) ) {
			return $feature_class;
		}

		// Handle features contained in subdirectory.
		if ( class_exists( $feature_class . '\\Init', $should_autoload_class ) ) {
			return $feature_class . '\\Init';
		}

		return null;
	}

	/**
	 * Class loader for enabled FinCommerce Admin features/sections.
	 */
	public static function load_features() {
		if ( ! self::should_load_features() ) {
			return;
		}

		$features = self::get_features();
		foreach ( $features as $feature ) {
			$feature_class = self::get_feature_class( $feature );

			if ( $feature_class ) {
				new $feature_class();
			}
		}

		if ( FeaturesUtil::feature_is_enabled( 'blueprint' ) ) {
			new \Automattic\FinCommerce\Admin\Features\Blueprint\Init();
		}
	}

	/**
	 * Gets a build configured array of enabled FinCommerce Admin respecting optionally disabled features.
	 *
	 * @return array Enabled Fincommerce Admin features/sections.
	 */
	public static function get_available_features() {
		$features                      = self::get_features();
		$optional_feature_keys         = array_keys( self::$optional_features );
		$optional_features_unavailable = array();

		/**
		 * Filter allowing FinCommerce Admin optional features to be disabled.
		 *
		 * @param bool $disabled False.
		 */
		if ( apply_filters( 'fincommerce_admin_disabled', false ) ) {
			return array_values( array_diff( $features, $optional_feature_keys ) );
		}

		foreach ( $optional_feature_keys as $optional_feature_key ) {
			$feature_class = self::get_feature_class( $optional_feature_key );

			if ( $feature_class ) {
				$default = isset( self::$optional_features[ $optional_feature_key ]['default'] ) ?
					self::$optional_features[ $optional_feature_key ]['default'] :
					'no';

				// Check if the feature is currently being enabled, if it is continue.
				/* phpcs:disable WordPress.Security.NonceVerification */
				$feature_option = $feature_class::TOGGLE_OPTION_NAME;
				if ( isset( $_POST[ $feature_option ] ) && '1' === $_POST[ $feature_option ] ) {
					continue;
				}

				if ( 'yes' !== get_option( $feature_class::TOGGLE_OPTION_NAME, $default ) ) {
					$optional_features_unavailable[] = $optional_feature_key;
				}
			}
		}

		return array_values( array_diff( $features, $optional_features_unavailable ) );
	}

	/**
	 * Check if a feature is enabled.
	 *
	 * @param string $feature Feature slug.
	 * @return bool
	 */
	public static function is_enabled( $feature ) {
		$available_features = self::get_available_features();
		return in_array( $feature, $available_features, true );
	}

	/**
	 * Enable a toggleable optional feature.
	 *
	 * @param string $feature Feature name.
	 * @return bool
	 */
	public static function enable( $feature ) {
		$features = self::get_optional_feature_options();

		if ( isset( $features[ $feature ] ) ) {
			update_option( $features[ $feature ], 'yes' );
			return true;
		}

		return false;
	}

	/**
	 * Disable a toggleable optional feature.
	 *
	 * @param string $feature Feature name.
	 * @return bool
	 */
	public static function disable( $feature ) {
		$features = self::get_optional_feature_options();

		if ( isset( $features[ $feature ] ) ) {
			update_option( $features[ $feature ], 'no' );
			return true;
		}

		return false;
	}

	/**
	 * Disable features when opting out of tracking.
	 *
	 * @param string $old_value Old value.
	 * @param string $value New value.
	 */
	public static function maybe_disable_features( $old_value, $value ) {
		if ( 'yes' === $value ) {
			return;
		}

		foreach ( self::$beta_features as $feature ) {
			self::disable( $feature );
		}
	}

	/**
	 * Adds the Features section to the advanced tab of FinCommerce Settings
	 *
	 * @deprecated 7.0 The FinCommerce Admin features are now handled by the FinCommerce features engine (see the FeaturesController class).
	 *
	 * @param array $sections Sections.
	 * @return array
	 */
	public static function add_features_section( $sections ) {
		return $sections;
	}

	/**
	 * Adds the Features settings.
	 *
	 * @deprecated 7.0 The FinCommerce Admin features are now handled by the FinCommerce features engine (see the FeaturesController class).
	 *
	 * @param array  $settings Settings.
	 * @param string $current_section Current section slug.
	 * @return array
	 */
	public static function add_features_settings( $settings, $current_section ) {
		return $settings;
	}

	/**
	 * Conditionally loads the beta features tracking modal.
	 *
	 * @param string $hook Page hook.
	 */
	public static function maybe_load_beta_features_modal( $hook ) {
		if (
			'fincommerce_page_wc-settings' !== $hook ||
			! isset( $_GET['tab'] ) || 'advanced' !== $_GET['tab'] || // phpcs:ignore CSRF ok.
			! isset( $_GET['section'] ) || 'features' !== $_GET['section'] // phpcs:ignore CSRF ok.
		) {
			return;
		}
		$tracking_enabled = get_option( 'fincommerce_allow_tracking', 'no' );

		if ( empty( self::$beta_features ) ) {
			return;
		}

		if ( 'yes' === $tracking_enabled ) {
			return;
		}

		WCAdminAssets::register_style( 'beta-features-tracking-modal', 'style', array( 'wp-components' ) );
		WCAdminAssets::register_script( 'wp-admin-scripts', 'beta-features-tracking-modal', array( 'wp-i18n', 'wp-element', WC_ADMIN_APP ) );
	}

	/**
	 * Loads the required scripts on the correct pages.
	 */
	public static function load_scripts() {
		if ( ! PageController::is_admin_or_embed_page() ) {
			return;
		}

		$features         = self::get_features();
		$enabled_features = array();
		foreach ( $features as $key ) {
			$enabled_features[ $key ] = self::is_enabled( $key );
		}
		wp_add_inline_script( WC_ADMIN_APP, 'window.wcAdminFeatures = ' . wp_json_encode( $enabled_features ), 'before' );
	}


	/**
	 * Adds body classes to the main wp-admin wrapper, allowing us to better target elements in specific scenarios.
	 *
	 * @param string $admin_body_class Body class to add.
	 */
	public static function add_admin_body_classes( $admin_body_class = '' ) {
		if ( ! PageController::is_admin_or_embed_page() ) {
			return $admin_body_class;
		}

		$classes = explode( ' ', trim( $admin_body_class ) );

		$features = self::get_features();
		foreach ( $features as $feature_key ) {
			$classes[] = sanitize_html_class( 'fincommerce-feature-enabled-' . $feature_key );
		}

		$admin_body_class = implode( ' ', array_unique( $classes ) );
		return " $admin_body_class ";
	}

	/**
	 * Alias internal features classes to make them backward compatible.
	 * We've moved our feature classes to src-internal as part of merging this
	 * repository with FinCommerce Core to form a monorepo.
	 * See https://wp.me/p90Yrv-2HY for details.
	 */
	private function register_internal_class_aliases() {
		$aliases = array(
			// new class => original class (this will be aliased).
			'Automattic\FinCommerce\Internal\Admin\WCPayPromotion\Init' => 'Automattic\FinCommerce\Admin\Features\WcPayPromotion\Init',
			'Automattic\FinCommerce\Internal\Admin\RemoteFreeExtensions\Init' => 'Automattic\FinCommerce\Admin\Features\RemoteFreeExtensions\Init',
			'Automattic\FinCommerce\Internal\Admin\ActivityPanels' => 'Automattic\FinCommerce\Admin\Features\ActivityPanels',
			'Automattic\FinCommerce\Internal\Admin\Analytics' => 'Automattic\FinCommerce\Admin\Features\Analytics',
			'Automattic\FinCommerce\Internal\Admin\Coupons' => 'Automattic\FinCommerce\Admin\Features\Coupons',
			'Automattic\FinCommerce\Internal\Admin\CouponsMovedTrait' => 'Automattic\FinCommerce\Admin\Features\CouponsMovedTrait',
			'Automattic\FinCommerce\Internal\Admin\CustomerEffortScoreTracks' => 'Automattic\FinCommerce\Admin\Features\CustomerEffortScoreTracks',
			'Automattic\FinCommerce\Internal\Admin\Homescreen' => 'Automattic\FinCommerce\Admin\Features\Homescreen',
			'Automattic\FinCommerce\Internal\Admin\Marketing' => 'Automattic\FinCommerce\Admin\Features\Marketing',
			'Automattic\FinCommerce\Internal\Admin\MobileAppBanner' => 'Automattic\FinCommerce\Admin\Features\MobileAppBanner',
			'Automattic\FinCommerce\Internal\Admin\RemoteInboxNotifications' => 'Automattic\FinCommerce\Admin\Features\RemoteInboxNotifications',
			'Automattic\FinCommerce\Internal\Admin\ShippingLabelBanner' => 'Automattic\FinCommerce\Admin\Features\ShippingLabelBanner',
			'Automattic\FinCommerce\Internal\Admin\ShippingLabelBannerDisplayRules' => 'Automattic\FinCommerce\Admin\Features\ShippingLabelBannerDisplayRules',
			'Automattic\FinCommerce\Internal\Admin\WcPayWelcomePage' => 'Automattic\FinCommerce\Admin\Features\WcPayWelcomePage',
		);
		foreach ( $aliases as $new_class => $orig_class ) {
			class_alias( $new_class, $orig_class );
		}
	}

	/**
	 * Check if we're in an admin context where features should be loaded.
	 *
	 * @return boolean
	 */
	private static function should_load_features() {
		$should_load = (
			is_admin() ||
			wp_doing_ajax() ||
			wp_doing_cron() ||
			( defined( 'WP_CLI' ) && WP_CLI ) ||
			( WC()->is_rest_api_request() && ! WC()->is_store_api_request() ) ||
			// Allow features to be loaded in frontend for admin users. This is needed for the use case such as the coming soon footer banner.
			current_user_can( 'manage_fincommerce' )
		);

		/**
		 * Filter to determine if admin features should be loaded.
		 *
		 * @since 9.6.0
		 * @param boolean $should_load Whether admin features should be loaded. It defaults to true when the current request is in an admin context.
		 */
		return apply_filters( 'fincommerce_admin_should_load_features', $should_load );
	}
}
