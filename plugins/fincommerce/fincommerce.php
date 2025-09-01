<?php
/**
 * Plugin Name: FinCommerce
 * Plugin URI: https://fincommerce.com/
 * Description: An ecommerce toolkit that helps you sell anything. Beautifully.
 * Version: 10.3.0-dev
 * Author: Automattic
 * Author URI: https://fincommerce.com
 * Text Domain: fincommerce
 * Domain Path: /i18n/languages/
 * Requires at least: 6.7
 * Requires PHP: 7.4
 *
 * @package FinCommerce
 */

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'WC_PLUGIN_FILE' ) ) {
	define( 'WC_PLUGIN_FILE', __FILE__ );
}

// Load core packages and the autoloader.
require __DIR__ . '/src/Autoloader.php';
require __DIR__ . '/src/Packages.php';

if ( ! \Automattic\FinCommerce\Autoloader::init() ) {
	return;
}
\Automattic\FinCommerce\Packages::init();

// Include the main FinCommerce class.
if ( ! class_exists( 'FinCommerce', false ) ) {
	include_once dirname( WC_PLUGIN_FILE ) . '/includes/class-fincommerce.php';
}

// Initialize dependency injection.
$GLOBALS['wc_container'] = new Automattic\FinCommerce\Container();

/**
 * Returns the main instance of WC.
 *
 * @since  2.1
 * @return FinCommerce
 */
function WC() { // phpcs:ignore WordPress.NamingConventions.ValidFunctionName.FunctionNameInvalid
	return FinCommerce::instance();
}

/**
 * Returns the FinCommerce object container.
 * Code in the `includes` directory should use the container to get instances of classes in the `src` directory.
 *
 * @since  4.4.0
 * @return \Automattic\FinCommerce\Container The FinCommerce object container.
 */
function wc_get_container() {
	return $GLOBALS['wc_container'];
}

// Global for backwards compatibility.
$GLOBALS['fincommerce'] = WC();

// Jetpack's Rest_Authentication needs to be initialized even before plugins_loaded.
if ( class_exists( \Automattic\Jetpack\Connection\Rest_Authentication::class ) ) {
	\Automattic\Jetpack\Connection\Rest_Authentication::init();
}
