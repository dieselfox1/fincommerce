<?php
/**
 * Plugin Name: FinCommerce Blocks Test Single Product Template Compatibility Layer
 * Description: Adds custom content to the Shop page with Product Collection included
 * Plugin URI: https://github.com/dieselfox1/fincommerce
 * Author: FinCommerce
 *
 * @package fincommerce-blocks-test-single-product-template-compatibility-layer
 */

$hooks = array(
	'fincommerce_before_main_content',
	'fincommerce_sidebar',
	'fincommerce_before_add_to_cart_button',
	'fincommerce_before_single_product',
	'fincommerce_before_single_product_summary',
	'fincommerce_single_product_summary',
	'fincommerce_product_meta_start',
	'fincommerce_product_meta_end',
	'fincommerce_share',
	'fincommerce_after_single_product_summary',
	'fincommerce_after_single_product',
	'fincommerce_after_main_content',
	'fincommerce_before_add_to_cart_form',
	'fincommerce_after_add_to_cart_form',
	'fincommerce_before_add_to_cart_quantity',
	'fincommerce_after_add_to_cart_quantity',
	'fincommerce_after_add_to_cart_button',
	'fincommerce_before_variations_form',
	'fincommerce_after_variations_form'
);

foreach ( $hooks as $hook ) {
	add_action(
		$hook,
		function () use ( $hook ) {
			echo '<p data-testid="' . esc_attr( $hook ) . '">
			Hook: ' . esc_html( $hook ) . '
		</p>';
		}
	);
}
