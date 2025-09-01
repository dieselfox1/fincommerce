<?php
/**
 * Plugin Name: FinCommerce Blocks Test Custom Add to Cart Button Text
 * Description: Modifies the "Add to Cart" button text for FinCommerce products.
 * Plugin URI: https://github.com/dieselfox1/fincommerce
 * Author: FinCommerce
 *
 * @package fincommerce-blocks-test-custom-add-to-cart-button-text
 */

function fincommerce_add_to_cart_button_text_archives() {
	return 'Buy Now';
}

add_filter( 'fincommerce_product_add_to_cart_text', 'fincommerce_add_to_cart_button_text_archives' );
