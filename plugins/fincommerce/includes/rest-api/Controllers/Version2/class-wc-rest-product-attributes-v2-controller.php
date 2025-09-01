<?php
/**
 * REST API Product Attributes controller
 *
 * Handles requests to the products/attributes endpoint.
 *
 * @package FinCommerce\RestApi
 * @since   2.6.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * REST API Product Attributes controller class.
 *
 * @package FinCommerce\RestApi
 * @extends WC_REST_Product_Attributes_V1_Controller
 */
class WC_REST_Product_Attributes_V2_Controller extends WC_REST_Product_Attributes_V1_Controller {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc/v2';
}
