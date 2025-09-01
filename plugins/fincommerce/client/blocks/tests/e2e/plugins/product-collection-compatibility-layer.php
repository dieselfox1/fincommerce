<?php
/**
 * Plugin Name: FinCommerce Blocks Test Product Collection Compatibility Layer
 * Description: Adds custom content to the Shop page with Product Collection included
 * Plugin URI: https://github.com/dieselfox1/fincommerce
 * Author: FinCommerce
 *
 * @package fincommerce-blocks-test-product-collection-compatibility-layer
 */

add_action(
	'fincommerce_before_main_content',
	function () {
		echo '<p data-testid="fincommerce_before_main_content">
			Hook: fincommerce_before_main_content
		</p>';
	}
);

add_action(
	'fincommerce_after_main_content',
	function () {
		echo '<p data-testid="fincommerce_after_main_content">
			Hook: fincommerce_after_main_content
		</p>';
	}
);
add_action(
	'fincommerce_before_shop_loop_item_title',
	function () {
		echo '<p data-testid="fincommerce_before_shop_loop_item_title">
			Hook: fincommerce_before_shop_loop_item_title
		</p>';
	}
);

add_action(
	'fincommerce_shop_loop_item_title',
	function () {
		echo '<p data-testid="fincommerce_shop_loop_item_title">
			Hook: fincommerce_shop_loop_item_title
		</p>';
	}
);

add_action(
	'fincommerce_after_shop_loop_item_title',
	function () {
		echo '<p data-testid="fincommerce_after_shop_loop_item_title">
			Hook: fincommerce_after_shop_loop_item_title
		</p>';
	}
);

add_action(
	'fincommerce_before_shop_loop_item',
	function () {
		echo '<p data-testid="fincommerce_before_shop_loop_item">
			Hook: fincommerce_before_shop_loop_item
		</p>';
	}
);

add_action(
	'fincommerce_after_shop_loop_item',
	function () {
		echo '<p data-testid="fincommerce_after_shop_loop_item">
			Hook: fincommerce_after_shop_loop_item
		</p>';
	}
);

add_action(
	'fincommerce_before_shop_loop',
	function () {
		echo '<p data-testid="fincommerce_before_shop_loop">
			Hook: fincommerce_before_shop_loop
		</p>';
	}
);

add_action(
	'fincommerce_after_shop_loop',
	function () {
		echo '<p data-testid="fincommerce_after_shop_loop">
			Hook: fincommerce_after_shop_loop
		</p>';
	}
);

add_action(
	'fincommerce_no_products_found',
	function () {
		echo '<p data-testid="fincommerce_no_products_found">
			Hook: fincommerce_no_products_found
		</p>';
	}
);
