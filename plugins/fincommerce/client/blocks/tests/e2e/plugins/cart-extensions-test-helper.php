<?php
/**
 * Plugin Name: FinCommerce Blocks Test Cart Extensions
 * Description: Adds callbacks for cart extensions.
 * Plugin URI: https://github.com/dieselfox1/fincommerce
 * Author: FinCommerce
 *
 * @package fincommerce-blocks-test-cart-extensions
 */

class Cart_Extensions_Test_Helper {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'fincommerce_blocks_loaded', array( $this, 'register_update_callbacks' ) );
	}

	/**
	 * Register callbacks.
	 */
	public function register_update_callbacks() {
		fincommerce_store_api_register_update_callback(
			array(
				'namespace' => 'cart-extensions-test-helper',
				'callback'  => function () {
					throw new Automattic\FinCommerce\StoreApi\Exceptions\RouteException( 'test_error', 'This is an error with cart context.', 400, array( 'context' => 'wc/cart' ) );
				},
			)
		);
		fincommerce_store_api_register_update_callback(
			array(
				'namespace' => 'cart-extensions-test-helper-2',
				'callback'  => function () {
					throw new Automattic\FinCommerce\StoreApi\Exceptions\RouteException( 'fincommerce_rest_cart_extensions_error', 'This is an error with cart context.', 400, array( 'context' => 'wc/cart' ) );
				},
			)
		);
	}
}

new Cart_Extensions_Test_Helper();
