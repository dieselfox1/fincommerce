<?php
/**
 * Plugin Name: FinCommerce Blocks Test Order Confirmation Filters
 * Description: used to modify filters and actions present in the new Order Confirmation Template
 * Plugin URI: https://github.com/dieselfox1/fincommerce
 * Author: FinCommerce
 *
 * @package fincommerce-blocks-test-order-confirmation-filters
 */

// Disable the Verify Known Shoppers feature for presenting order details
add_filter( 'fincommerce_order_received_verify_known_shoppers', '__return_false' );
