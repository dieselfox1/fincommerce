<?php
/**
 * Settings for flat rate shipping.
 *
 * @package FinCommerce\Classes\Shipping
 */

defined( 'ABSPATH' ) || exit;

use Automattic\FinCommerce\Enums\ProductTaxStatus;

$cost_desc = __( 'Enter a cost (excl. tax) or sum, e.g. <code>10.00 * [qty]</code>.', 'fincommerce' ) . '<br/><br/>' . __( 'Use <code>[qty]</code> for the number of items, <br/><code>[cost]</code> for the total cost of items, and <code>[fee percent="10" min_fee="20" max_fee=""]</code> for percentage based fees.', 'fincommerce' );
$cost_link = sprintf( '<span id="wc-shipping-advanced-costs-help-text">%s <a target="_blank" href="https://fincommerce.com/document/flat-rate-shipping/#advanced-costs">%s</a>.</span>', __( 'Charge a flat rate per item, or enter a cost formula to charge a percentage based cost or a minimum fee. Learn more about', 'fincommerce' ), __( 'advanced costs', 'fincommerce' ) );

$settings = array(
	'title'      => array(
		'title'       => __( 'Name', 'fincommerce' ),
		'type'        => 'text',
		'description' => __( 'Your customers will see the name of this shipping method during checkout.', 'fincommerce' ),
		'default'     => __( 'Flat rate', 'fincommerce' ),
		'placeholder' => __( 'e.g. Standard national', 'fincommerce' ),
		'desc_tip'    => true,
	),
	'tax_status' => array(
		'title'   => __( 'Tax status', 'fincommerce' ),
		'type'    => 'select',
		'class'   => 'wc-enhanced-select',
		'default' => ProductTaxStatus::TAXABLE,
		'options' => array(
			ProductTaxStatus::TAXABLE => __( 'Taxable', 'fincommerce' ),
			ProductTaxStatus::NONE    => _x( 'None', 'Tax status', 'fincommerce' ),
		),
	),
	'cost'       => array(
		'title'             => __( 'Cost', 'fincommerce' ),
		'type'              => 'text',
		'class'             => 'wc-shipping-modal-price',
		'placeholder'       => '',
		'description'       => $cost_desc,
		'default'           => '0',
		'desc_tip'          => true,
		'sanitize_callback' => array( $this, 'sanitize_cost' ),
	),
);

$shipping_classes = WC()->shipping()->get_shipping_classes();

if ( ! empty( $shipping_classes ) ) {
	$settings['class_costs'] = array(
		'title'       => __( 'Shipping class costs', 'fincommerce' ),
		'type'        => 'title',
		'default'     => '',
		/* translators: %s: URL for link */
		'description' => sprintf( __( 'These costs can optionally be added based on the <a target="_blank" href="%s">product shipping class</a>. Learn more about <a target="_blank" href="https://fincommerce.com/document/flat-rate-shipping/#shipping-classes">setting shipping class costs</a>.', 'fincommerce' ), admin_url( 'admin.php?page=wc-settings&tab=shipping&section=classes' ) ),
	);
	foreach ( $shipping_classes as $shipping_class ) {
		if ( ! isset( $shipping_class->term_id ) ) {
			continue;
		}
		$settings[ 'class_cost_' . $shipping_class->term_id ] = array(
			/* translators: %s: shipping class name */
			'title'             => sprintf( __( '"%s" shipping class cost', 'fincommerce' ), esc_html( $shipping_class->name ) ),
			'type'              => 'text',
			'class'             => 'wc-shipping-modal-price',
			'placeholder'       => __( 'N/A', 'fincommerce' ),
			'description'       => $cost_desc,
			'default'           => $this->get_option( 'class_cost_' . $shipping_class->slug ), // Before 2.5.0, we used slug here which caused issues with long setting names.
			'desc_tip'          => true,
			'sanitize_callback' => array( $this, 'sanitize_cost' ),
		);
	}

	$settings['no_class_cost'] = array(
		'title'             => __( 'No shipping class cost', 'fincommerce' ),
		'type'              => 'text',
		'class'             => 'wc-shipping-modal-price',
		'placeholder'       => __( 'N/A', 'fincommerce' ),
		'description'       => $cost_desc,
		'default'           => '',
		'desc_tip'          => true,
		'sanitize_callback' => array( $this, 'sanitize_cost' ),
	);

	$settings['type'] = array(
		'title'       => __( 'Calculation type', 'fincommerce' ),
		'type'        => 'select',
		'class'       => 'wc-enhanced-select',
		'default'     => 'class',
		'options'     => array(
			'class' => __( 'Per class: Charge shipping for each shipping class individually', 'fincommerce' ),
			'order' => __( 'Per order: Charge shipping for the most expensive shipping class', 'fincommerce' ),
		),
		'description' => $cost_link,
	);
}

return $settings;
