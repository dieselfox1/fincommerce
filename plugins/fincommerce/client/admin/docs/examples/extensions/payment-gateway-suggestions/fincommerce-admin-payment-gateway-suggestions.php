<?php
/**
 * Plugin Name: FinCommerce Admin Payment Gateway Suggestions
 *
 * @package FinCommerce\Admin
 */

/**
 * Include files.
 */
function payment_gateway_suggestions_includes() {
	include_once __DIR__ . '/fincommerce-admin-payment-gateway-suggestions-mock-installer.php';
	include_once __DIR__ . '/class-my-simple-gateway.php';
	include_once __DIR__ . '/class-my-slot-filled-gateway.php';
}
add_action( 'plugins_loaded', 'payment_gateway_suggestions_includes' );


/**
 * Register the gateways with FinCommerce.
 *
 * @param array $gateways Gateways.
 * @return array
 */
function payment_gateway_suggestions_register_gateways( $gateways ) {
	$gateways[] = 'My_Simple_Gateway';
	$gateways[] = 'My_Slot_Filled_Gateway';

	return $gateways;
}
add_filter( 'fincommerce_payment_gateways', 'payment_gateway_suggestions_register_gateways' );

/**
 * Add examples to the data sources.
 *
 * @param array $specs Specs.
 * @return array
 */
function payment_gateway_suggestions_add_suggestions( $specs ) {
	$specs[] = array(
		'id'         => 'my-simple-gateway',
		'title'      => __( 'Simple Gateway', 'fincommerce-admin' ),
		'content'    => __( "This is a simple gateway that pulls its configuration fields from the gateway's class.", 'fincommerce-admin' ),
		'image'      => WC()->plugin_url() . '/assets/images/placeholder.webp',
		'plugins'    => array( 'my-simple-gateway-wporg-slug' ),
		'is_visible' => array(
			(object) array(
				'type'      => 'base_location_country',
				'value'     => 'US',
				'operation' => '=',
			),
		),
	);

	$specs[] = array(
		'id'      => 'my-slot-filled-gateway',
		'title'   => __( 'Slot Filled Gateway', 'fincommerce-admin' ),
		'content' => __( 'This gateway makes use of registered SlotFill scripts to show its content.', 'fincommerce-admin' ),
		'image'   => WC()->plugin_url() . '/assets/images/placeholder.webp',
		'plugins' => array( 'my-slot-filled-gateway-wporg-slug' ),
	);

	return $specs;
}
add_filter( 'fincommerce_admin_payment_gateway_suggestion_specs', 'payment_gateway_suggestions_add_suggestions' );
