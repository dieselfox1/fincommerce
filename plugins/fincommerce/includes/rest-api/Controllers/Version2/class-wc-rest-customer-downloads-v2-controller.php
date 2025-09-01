<?php
/**
 * REST API Customer Downloads controller
 *
 * Handles requests to the /customers/<customer_id>/downloads endpoint.
 *
 * @package FinCommerce\RestApi
 * @since   2.6.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * REST API Customers controller class.
 *
 * @package FinCommerce\RestApi
 * @extends WC_REST_Customer_Downloads_V1_Controller
 */
class WC_REST_Customer_Downloads_V2_Controller extends WC_REST_Customer_Downloads_V1_Controller {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc/v2';

	/**
	 * Prepare a single download output for response.
	 *
	 * @param stdClass        $download Download object.
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response $response Response data.
	 */
	public function prepare_item_for_response( $download, $request ) {
		$data = array(
			'download_id'         => $download->download_id,
			'download_url'        => $download->download_url,
			'product_id'          => $download->product_id,
			'product_name'        => $download->product_name,
			'download_name'       => $download->download_name,
			'order_id'            => $download->order_id,
			'order_key'           => $download->order_key,
			'downloads_remaining' => '' === $download->downloads_remaining ? 'unlimited' : $download->downloads_remaining,
			'access_expires'      => $download->access_expires ? wc_rest_prepare_date_response( $download->access_expires ) : 'never',
			'access_expires_gmt'  => $download->access_expires ? wc_rest_prepare_date_response( get_gmt_from_date( $download->access_expires ) ) : 'never',
			'file'                => $download->file,
		);

		$context = ! empty( $request['context'] ) ? $request['context'] : 'view';
		$data    = $this->add_additional_fields_to_object( $data, $request );
		$data    = $this->filter_response_by_context( $data, $context );

		// Wrap the data in a response object.
		$response = rest_ensure_response( $data );

		$response->add_links( $this->prepare_links( $download, $request ) );

		/**
		 * Filter customer download data returned from the REST API.
		 *
		 * @param WP_REST_Response $response  The response object.
		 * @param stdClass         $download  Download object used to create response.
		 * @param WP_REST_Request  $request   Request object.
		 */
		return apply_filters( 'fincommerce_rest_prepare_customer_download', $response, $download, $request );
	}

	/**
	 * Get the Customer Download's schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		$schema = array(
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'customer_download',
			'type'       => 'object',
			'properties' => array(
				'download_id'         => array(
					'description' => __( 'Download ID.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
				'download_url'        => array(
					'description' => __( 'Download file URL.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
				'product_id'          => array(
					'description' => __( 'Downloadable product ID.', 'fincommerce' ),
					'type'        => 'integer',
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
				'product_name'        => array(
					'description' => __( 'Product name.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
				'download_name'       => array(
					'description' => __( 'Downloadable file name.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
				'order_id'            => array(
					'description' => __( 'Order ID.', 'fincommerce' ),
					'type'        => 'integer',
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
				'order_key'           => array(
					'description' => __( 'Order key.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
				'downloads_remaining' => array(
					'description' => __( 'Number of downloads remaining.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
				'access_expires'      => array(
					'description' => __( "The date when download access expires, in the site's timezone.", 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
				'access_expires_gmt'  => array(
					'description' => __( 'The date when download access expires, as GMT.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
				'file'                => array(
					'description' => __( 'File details.', 'fincommerce' ),
					'type'        => 'object',
					'context'     => array( 'view' ),
					'readonly'    => true,
					'properties'  => array(
						'name' => array(
							'description' => __( 'File name.', 'fincommerce' ),
							'type'        => 'string',
							'context'     => array( 'view' ),
							'readonly'    => true,
						),
						'file' => array(
							'description' => __( 'File URL.', 'fincommerce' ),
							'type'        => 'string',
							'context'     => array( 'view' ),
							'readonly'    => true,
						),
					),
				),
			),
		);

		return $this->add_additional_fields_schema( $schema );
	}
}
