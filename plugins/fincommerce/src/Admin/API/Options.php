<?php
/**
 * REST API Options Controller
 *
 * Handles requests to get and update options in the wp_options table.
 *
 * IMPORTANT: This API is for legacy support only. DO NOT add new options here. See p90Yrv-2vK-p2#comment-6482 for more details.
 * For new settings/options, use Settings REST API (https://fincommerce.github.io/fincommerce-rest-api-docs/#setting-option-properties) or create dedicated endpoints instead.
 *
 * Example:
 * - Use register_rest_route() to create a new endpoint
 * - Follow FinCommerce REST API standards
 * - Implement proper permission checks
 * - Add proper documentation
 * See Automattic\FinCommerce\Admin\API\OnboardingProfile for examples.
 */

declare(strict_types=1);

namespace Automattic\FinCommerce\Admin\API;

defined( 'ABSPATH' ) || exit;

/**
 * Options Controller.
 *
 * @deprecated since 6.2.0
 *
 * @extends WC_REST_Data_Controller
 */
class Options extends \WC_REST_Data_Controller {
	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc-admin';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'options';

	/**
	 * Register routes.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_options' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
				),
				'schema' => array( $this, 'get_item_schema' ),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_options' ),
					'permission_callback' => array( $this, 'update_item_permissions_check' ),
				),
				'schema' => array( $this, 'get_item_schema' ),
			)
		);
	}

	/**
	 * Check if a given request has access to get options.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 */
	public function get_item_permissions_check( $request ) {
		$params = ( isset( $request['options'] ) && is_string( $request['options'] ) ) ? explode( ',', $request['options'] ) : array();

		if ( ! $params ) {
			return new \WP_Error( 'fincommerce_rest_cannot_view', __( 'You must supply an array of options.', 'fincommerce' ), 500 );
		}

		foreach ( $params as $option ) {
			if ( ! $this->user_has_permission( $option, $request ) ) {
				return new \WP_Error( 'fincommerce_rest_cannot_view', __( 'Sorry, you cannot view these options.', 'fincommerce' ), array( 'status' => rest_authorization_required_code() ) );
			}
		}

		return true;
	}

	/**
	 * Check if the user has permission given an option name.
	 *
	 * @param  string          $option Option name.
	 * @param  WP_REST_Request $request Full details about the request.
	 * @param  bool            $is_update If the request is to update the option.
	 * @return boolean
	 */
	public function user_has_permission( $option, $request, $is_update = false ) {
		$permissions = $this->get_option_permissions( $request );

		if ( isset( $permissions[ $option ] ) ) {
			return $permissions[ $option ];
		}

		wc_deprecated_function( 'Automattic\FinCommerce\Admin\API\Options::' . ( $is_update ? 'update_options' : 'get_options' ), '6.3' );

		// Disallow option updates in non-production environments unless the option is whitelisted, prompting developers to create specific endpoints in case they miss the deprecation notice.
		if ( 'production' !== wp_get_environment_type() ) {
			return false;
		}

		return current_user_can( 'manage_options' );
	}

	/**
	 * Check if a given request has access to update options.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 */
	public function update_item_permissions_check( $request ) {
		$params = $request->get_json_params();

		if ( ! is_array( $params ) ) {
			return new \WP_Error( 'fincommerce_rest_cannot_update', __( 'You must supply an array of options and values.', 'fincommerce' ), 500 );
		}

		foreach ( $params as $option_name => $option_value ) {
			if ( ! $this->user_has_permission( $option_name, $request, true ) ) {
				return new \WP_Error( 'fincommerce_rest_cannot_update', __( 'Sorry, you cannot manage these options.', 'fincommerce' ), array( 'status' => rest_authorization_required_code() ) );
			}
		}

		return true;
	}

	/**
	 * Get an array of options and respective permissions for the current user.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return array
	 */
	public function get_option_permissions( $request ) {
		$permissions = self::get_default_option_permissions();
		return apply_filters_deprecated( 'fincommerce_rest_api_option_permissions', array( $permissions, $request ), '6.3.0' );
	}

	/**
	 * Get the default available option permissions.
	 *
	 * @return array
	 */
	public static function get_default_option_permissions() {
		$is_fincommerce_admin = \Automattic\FinCommerce\Internal\Admin\Homescreen::is_admin_user();

		/**
		 * IMPORTANT: This list is frozen for legacy support.
		 * New options MUST use dedicated endpoints instead of being added here.
		 */
		$legacy_whitelisted_options = array(
			'fincommerce_setup_jetpack_opted_in',
			'fincommerce_stripe_settings',
			'fincommerce-ppcp-settings',
			'fincommerce_ppcp-gateway_setting',
			'fincommerce_demo_store',
			'fincommerce_demo_store_notice',
			'fincommerce_ces_tracks_queue',
			'fincommerce_navigation_intro_modal_dismissed',
			'fincommerce_shipping_dismissed_timestamp',
			'fincommerce_allow_tracking',
			'fincommerce_task_list_keep_completed',
			'fincommerce_default_homepage_layout',
			'fincommerce_setup_jetpack_opted_in',
			'fincommerce_no_sales_tax',
			'fincommerce_calc_taxes',
			'fincommerce_bacs_settings',
			'fincommerce_bacs_accounts',
			'fincommerce_settings_shipping_recommendations_hidden',
			'fincommerce_task_list_dismissed_tasks',
			'fincommerce_setting_payments_recommendations_hidden',
			'fincommerce_navigation_favorites_tooltip_hidden',
			'fincommerce_admin_transient_notices_queue',
			'fincommerce_task_list_hidden',
			'fincommerce_task_list_complete',
			'fincommerce_extended_task_list_hidden',
			'fincommerce_ces_shown_for_actions',
			'fincommerce_clear_ces_tracks_queue_for_page',
			'fincommerce_admin_install_timestamp',
			'fincommerce_task_list_tracked_completed_tasks',
			'fincommerce_show_marketplace_suggestions',
			'fincommerce_task_list_reminder_bar_hidden',
			'wc_connect_options',
			'fincommerce_admin_created_default_shipping_zones',
			'fincommerce_admin_reviewed_default_shipping_zones',
			'fincommerce_admin_reviewed_store_location_settings',
			'fincommerce_ces_product_feedback_shown',
			'fincommerce_marketing_overview_multichannel_banner_dismissed',
			'fincommerce_manage_stock',
			'fincommerce_dimension_unit',
			'fincommerce_weight_unit',
			'fincommerce_product_editor_show_feedback_bar',
			'fincommerce_single_variation_notice_dismissed',
			'fincommerce_product_tour_modal_hidden',
			'fincommerce_block_product_tour_shown',
			'fincommerce_revenue_report_date_tour_shown',
			'fincommerce_orders_report_date_tour_shown',
			'fincommerce_show_prepublish_checks_enabled',
			'fincommerce_date_type',
			'date_format',
			'time_format',
			'fincommerce_onboarding_profile',
			'fincommerce_default_country',
			'blogname',
			'wcpay_welcome_page_incentives_dismissed',
			'wcpay_welcome_page_viewed_timestamp',
			'wcpay_welcome_page_exit_survey_more_info_needed_timestamp',
			'fincommerce_customize_store_onboarding_tour_hidden',
			'fincommerce_customize_store_ai_suggestions',
			'fincommerce_admin_customize_store_completed',
			'fincommerce_admin_customize_store_completed_theme_id',
			'fincommerce_admin_customize_store_survey_completed',
			'fincommerce_coming_soon',
			'fincommerce_store_pages_only',
			'fincommerce_private_link',
			'fincommerce_share_key',
			'fincommerce_show_lys_tour',
			'fincommerce_remote_variant_assignment',
			'fincommerce_gateway_order',
			'fincommerce_woopayments_nox_profile',
			// WC Test helper options.
			'wc-admin-test-helper-rest-api-filters',
			'wc_admin_helper_feature_values',
		);

		$theme_permissions = array(
			'theme_mods_' . get_stylesheet() => current_user_can( 'edit_theme_options' ),
			'stylesheet'                     => current_user_can( 'edit_theme_options' ),
		);

		return array_merge(
			array_fill_keys( $theme_permissions, current_user_can( 'edit_theme_options' ) ),
			array_fill_keys( $legacy_whitelisted_options, $is_fincommerce_admin )
		);
	}

	/**
	 * Gets an array of options and respective values.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return array Options object with option values.
	 */
	public function get_options( $request ) {
		$options = array();

		if ( empty( $request['options'] ) || ! is_string( $request['options'] ) ) {
			return $options;
		}

		$params = explode( ',', $request['options'] );
		foreach ( $params as $option ) {
			$options[ $option ] = get_option( $option );
		}

		return $options;
	}

	/**
	 * Updates an array of objects.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return array Options object with a boolean if the option was updated.
	 */
	public function update_options( $request ) {
		$params  = $request->get_json_params();
		$updated = array();

		if ( ! is_array( $params ) ) {
			return array();
		}

		foreach ( $params as $key => $value ) {
			$updated[ $key ] = update_option( $key, $value );
		}

		return $updated;
	}

	/**
	 * Get the schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		$schema = array(
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'options',
			'type'       => 'object',
			'properties' => array(
				'options' => array(
					'type'        => 'array',
					'description' => __( 'Array of options with associated values.', 'fincommerce' ),
					'context'     => array( 'view' ),
					'readonly'    => true,
				),
			),
		);

		return $this->add_additional_fields_schema( $schema );
	}
}
