<?php
/**
 * Plugin Name: FinCommerce Blocks Test Custom Product Type
 * Description: Registers a custom product type.
 * Plugin URI: https://github.com/dieselfox1/fincommerce
 * Author: FinCommerce
 *
 * @package fincommerce-blocks-test-custom-product-type
 */

function fincommerce_register_custom_product_type( $product_types ) {
	$product_types[ 'custom-product-type' ] = 'Custom Product Type';
	return $product_types;
}

add_filter( 'product_type_selector', 'fincommerce_register_custom_product_type' );
