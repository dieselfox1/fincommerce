<?php
/**
 * Plugin Name: FinCommerce Blocks Test Update Price
 * Description: Update price of products.
 * Plugin URI: https://github.com/dieselfox1/fincommerce
 * Author: FinCommerce
 *
 * @package fincommerce-blocks-test-update-price
 */

function calc_price( $cart_object ) {
	foreach ( $cart_object->get_cart() as $hash => $value ) {
		$value['data']->set_price( 50 );
	}
}

add_action( 'fincommerce_before_calculate_totals', 'calc_price' );
