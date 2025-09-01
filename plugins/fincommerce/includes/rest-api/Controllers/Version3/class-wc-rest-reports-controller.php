<?php
/**
 * REST API Reports controller
 *
 * Handles requests to the reports endpoint.
 *
 * @package FinCommerce\RestApi
 * @since   2.6.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * REST API Reports controller class.
 *
 * @package FinCommerce\RestApi
 * @extends WC_REST_Reports_V2_Controller
 */
class WC_REST_Reports_Controller extends WC_REST_Reports_V2_Controller {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc/v3';

	/**
	 * Get reports list.
	 *
	 * @since 3.5.0
	 * @return array
	 */
	protected function get_reports() {
		$reports = parent::get_reports();

		$reports[] = array(
			'slug'        => 'orders/totals',
			'description' => __( 'Orders totals.', 'fincommerce' ),
		);
		$reports[] = array(
			'slug'        => 'products/totals',
			'description' => __( 'Products totals.', 'fincommerce' ),
		);
		$reports[] = array(
			'slug'        => 'customers/totals',
			'description' => __( 'Customers totals.', 'fincommerce' ),
		);
		$reports[] = array(
			'slug'        => 'coupons/totals',
			'description' => __( 'Coupons totals.', 'fincommerce' ),
		);
		$reports[] = array(
			'slug'        => 'reviews/totals',
			'description' => __( 'Reviews totals.', 'fincommerce' ),
		);
		$reports[] = array(
			'slug'        => 'categories/totals',
			'description' => __( 'Categories totals.', 'fincommerce' ),
		);
		$reports[] = array(
			'slug'        => 'tags/totals',
			'description' => __( 'Tags totals.', 'fincommerce' ),
		);
		$reports[] = array(
			'slug'        => 'attributes/totals',
			'description' => __( 'Attributes totals.', 'fincommerce' ),
		);

		return $reports;
	}
}
