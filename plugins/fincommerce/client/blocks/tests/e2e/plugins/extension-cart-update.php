<?php
/**
 * Plugin Name: FinCommerce Blocks Test extensionCartUpdate
 * Description: Adds an extensionCartUpdate endpoint.
 * Plugin URI: https://github.com/dieselfox1/fincommerce
 * Author: FinCommerce
 *
 * @package fincommerce-blocks-test-extension-cart-update
 */

use Automattic\FinCommerce\StoreApi\Schemas\ExtendSchema;
use Automattic\FinCommerce\StoreApi\StoreApi;

add_action(
	'fincommerce_init',
	function () {
		$extend = StoreApi::container()->get( ExtendSchema::class );
		if (
			is_callable(
				array(
					$extend,
					'register_update_callback',
				)
			)
		) {
			$extend->register_update_callback(
				array(
					'namespace' => 'fincommerce-blocks-test-extension-cart-update',
					'callback'  => function ( $data ) {
						if ( ! empty( $data['test-name-change'] ) ) {
							WC()->cart->get_customer()->set_shipping_first_name( 'Mr. Test' );
							WC()->cart->get_customer()->save();
						}
					},
				)
			);
		}
	}
);
