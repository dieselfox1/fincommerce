<?php
/**
 * Legacy flat rate settings.
 *
 * @package FinCommerce\Shipping
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Automattic\FinCommerce\Enums\ProductTaxStatus;

$cost_desc = __( 'Enter a cost (excl. tax) or sum, e.g. <code>10.00 * [qty]</code>.', 'fincommerce' ) . '<br/>' . __( 'Supports the following placeholders: <code>[qty]</code> = number of items, <code>[cost]</code> = cost of items, <code>[fee percent="10" min_fee="20"]</code> = Percentage based fee.', 'fincommerce' );

/**
 * Settings for flat rate shipping.
 */
$settings = array(
	'enabled'      => array(
		'title'   => __( 'Enable/Disable', 'fincommerce' ),
		'type'    => 'checkbox',
		'label'   => __( 'Once disabled, this legacy method will no longer be available.', 'fincommerce' ),
		'default' => 'no',
	),
	'title'        => array(
		'title'       => __( 'Method title', 'fincommerce' ),
		'type'        => 'text',
		'description' => __( 'This controls the title which the user sees during checkout.', 'fincommerce' ),
		'default'     => __( 'Flat rate', 'fincommerce' ),
		'desc_tip'    => true,
	),
	'availability' => array(
		'title'   => __( 'Availability', 'fincommerce' ),
		'type'    => 'select',
		'default' => 'all',
		'class'   => 'availability wc-enhanced-select',
		'options' => array(
			'all'      => __( 'All allowed countries', 'fincommerce' ),
			'specific' => __( 'Specific Countries', 'fincommerce' ),
		),
	),
	'countries'    => array(
		'title'             => __( 'Specific countries', 'fincommerce' ),
		'type'              => 'multiselect',
		'class'             => 'wc-enhanced-select',
		'css'               => 'width: 400px;',
		'default'           => '',
		'options'           => WC()->countries->get_shipping_countries(),
		'custom_attributes' => array(
			'data-placeholder' => __( 'Select some countries', 'fincommerce' ),
		),
	),
	'tax_status'   => array(
		'title'   => __( 'Tax status', 'fincommerce' ),
		'type'    => 'select',
		'class'   => 'wc-enhanced-select',
		'default' => ProductTaxStatus::TAXABLE,
		'options' => array(
			ProductTaxStatus::TAXABLE => __( 'Taxable', 'fincommerce' ),
			ProductTaxStatus::NONE    => _x( 'None', 'Tax status', 'fincommerce' ),
		),
	),
	'cost'         => array(
		'title'       => __( 'Cost', 'fincommerce' ),
		'type'        => 'text',
		'placeholder' => '',
		'description' => $cost_desc,
		'default'     => '',
		'desc_tip'    => true,
	),
);

$shipping_classes = WC()->shipping()->get_shipping_classes();

if ( ! empty( $shipping_classes ) ) {
	$settings['class_costs'] = array(
		'title'       => __( 'Shipping class costs', 'fincommerce' ),
		'type'        => 'title',
		'default'     => '',
		/* translators: %s: Admin shipping settings URL */
		'description' => sprintf( __( 'These costs can optionally be added based on the <a href="%s">product shipping class</a>.', 'fincommerce' ), admin_url( 'admin.php?page=wc-settings&tab=shipping&section=classes' ) ),
	);
	foreach ( $shipping_classes as $shipping_class ) {
		if ( ! isset( $shipping_class->term_id ) ) {
			continue;
		}
		$settings[ 'class_cost_' . $shipping_class->term_id ] = array(
			/* translators: %s: shipping class name */
			'title'       => sprintf( __( '"%s" shipping class cost', 'fincommerce' ), esc_html( $shipping_class->name ) ),
			'type'        => 'text',
			'placeholder' => __( 'N/A', 'fincommerce' ),
			'description' => $cost_desc,
			'default'     => $this->get_option( 'class_cost_' . $shipping_class->slug ), // Before 2.5.0, we used slug here which caused issues with long setting names.
			'desc_tip'    => true,
		);
	}
	$settings['no_class_cost'] = array(
		'title'       => __( 'No shipping class cost', 'fincommerce' ),
		'type'        => 'text',
		'placeholder' => __( 'N/A', 'fincommerce' ),
		'description' => $cost_desc,
		'default'     => '',
		'desc_tip'    => true,
	);
	$settings['type']          = array(
		'title'   => __( 'Calculation type', 'fincommerce' ),
		'type'    => 'select',
		'class'   => 'wc-enhanced-select',
		'default' => 'class',
		'options' => array(
			'class' => __( 'Per class: Charge shipping for each shipping class individually', 'fincommerce' ),
			'order' => __( 'Per order: Charge shipping for the most expensive shipping class', 'fincommerce' ),
		),
	);
}

if ( apply_filters( 'fincommerce_enable_deprecated_additional_flat_rates', $this->get_option( 'options', false ) ) ) {
	$settings['additional_rates'] = array(
		'title'       => __( 'Additional rates', 'fincommerce' ),
		'type'        => 'title',
		'default'     => '',
		'description' => __( 'These rates are extra shipping options with additional costs (based on the flat rate).', 'fincommerce' ),
	);
	$settings['options']          = array(
		'title'       => __( 'Additional rates', 'fincommerce' ),
		'type'        => 'textarea',
		'description' => __( 'One per line: Option name | Additional cost [+- Percents] | Per cost type (order, class, or item) Example: <code>Priority mail | 6.95 [+ 0.2%] | order</code>.', 'fincommerce' ),
		'default'     => '',
		'desc_tip'    => true,
		'placeholder' => __( 'Option name | Additional cost [+- Percents%] | Per cost type (order, class, or item)', 'fincommerce' ),
	);
}

return $settings;
