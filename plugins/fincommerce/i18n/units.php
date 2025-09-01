<?php
/**
 * Units
 *
 * Returns a multidimensional array of measurement units and their labels.
 * Unit labels should be defined in English and translated native through localization files.
 *
 * @package FinCommerce\i18n
 * @version
 */

defined( 'ABSPATH' ) || exit;

return array(
	'weight'     => array(
		'kg'  => __( 'kg', 'fincommerce' ),
		'g'   => __( 'g', 'fincommerce' ),
		'lbs' => __( 'lbs', 'fincommerce' ),
		'oz'  => __( 'oz', 'fincommerce' ),
	),
	'dimensions' => array(
		'm'  => __( 'm', 'fincommerce' ),
		'cm' => __( 'cm', 'fincommerce' ),
		'mm' => __( 'mm', 'fincommerce' ),
		'in' => __( 'in', 'fincommerce' ),
		'yd' => __( 'yd', 'fincommerce' ),
	),
);
