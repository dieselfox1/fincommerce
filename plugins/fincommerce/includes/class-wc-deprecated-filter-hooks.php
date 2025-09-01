<?php
/**
 * Deprecated filter hooks
 *
 * @package FinCommerce\Abstracts
 * @since   3.0.0
 * @version 3.3.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Handles deprecation notices and triggering of legacy filter hooks
 */
class WC_Deprecated_Filter_Hooks extends WC_Deprecated_Hooks {

	/**
	 * Array of deprecated hooks we need to handle.
	 * Format of 'new' => 'old'.
	 *
	 * @var array
	 */
	protected $deprecated_hooks = array(
		'fincommerce_account_orders_columns'              => 'fincommerce_my_account_my_orders_columns',
		'fincommerce_structured_data_order'               => 'fincommerce_email_order_schema_markup',
		'fincommerce_add_to_cart_fragments'               => 'add_to_cart_fragments',
		'fincommerce_add_to_cart_redirect'                => 'add_to_cart_redirect',
		'fincommerce_product_get_width'                   => 'fincommerce_product_width',
		'fincommerce_product_get_height'                  => 'fincommerce_product_height',
		'fincommerce_product_get_length'                  => 'fincommerce_product_length',
		'fincommerce_product_get_weight'                  => 'fincommerce_product_weight',
		'fincommerce_product_get_sku'                     => 'fincommerce_get_sku',
		'fincommerce_product_get_price'                   => 'fincommerce_get_price',
		'fincommerce_product_get_regular_price'           => 'fincommerce_get_regular_price',
		'fincommerce_product_get_sale_price'              => 'fincommerce_get_sale_price',
		'fincommerce_product_get_tax_class'               => 'fincommerce_product_tax_class',
		'fincommerce_product_get_stock_quantity'          => 'fincommerce_get_stock_quantity',
		'fincommerce_product_get_attributes'              => 'fincommerce_get_product_attributes',
		'fincommerce_product_get_gallery_image_ids'       => 'fincommerce_product_gallery_attachment_ids',
		'fincommerce_product_get_review_count'            => 'fincommerce_product_review_count',
		'fincommerce_product_get_downloads'               => 'fincommerce_product_files',
		'fincommerce_order_get_currency'                  => 'fincommerce_get_currency',
		'fincommerce_order_get_discount_total'            => 'fincommerce_order_amount_discount_total',
		'fincommerce_order_get_discount_tax'              => 'fincommerce_order_amount_discount_tax',
		'fincommerce_order_get_shipping_total'            => 'fincommerce_order_amount_shipping_total',
		'fincommerce_order_get_shipping_tax'              => 'fincommerce_order_amount_shipping_tax',
		'fincommerce_order_get_cart_tax'                  => 'fincommerce_order_amount_cart_tax',
		'fincommerce_order_get_total'                     => 'fincommerce_order_amount_total',
		'fincommerce_order_get_total_tax'                 => 'fincommerce_order_amount_total_tax',
		'fincommerce_order_get_total_discount'            => 'fincommerce_order_amount_total_discount',
		'fincommerce_order_get_subtotal'                  => 'fincommerce_order_amount_subtotal',
		'fincommerce_order_get_tax_totals'                => 'fincommerce_order_tax_totals',
		'fincommerce_get_order_refund_get_amount'         => 'fincommerce_refund_amount',
		'fincommerce_get_order_refund_get_reason'         => 'fincommerce_refund_reason',
		'default_checkout_billing_country'                => 'default_checkout_country',
		'default_checkout_billing_state'                  => 'default_checkout_state',
		'default_checkout_billing_postcode'               => 'default_checkout_postcode',
		'fincommerce_system_status_environment_rows'      => 'fincommerce_debug_posting',
		'fincommerce_credit_card_type_labels'             => 'wocommerce_credit_card_type_labels',
		'fincommerce_settings_tabs_advanced'              => 'fincommerce_settings_tabs_api',
		'fincommerce_settings_advanced'                   => 'fincommerce_settings_api',
		'fincommerce_csv_importer_check_import_file_path' => 'fincommerce_product_csv_importer_check_import_file_path',
	);

	/**
	 * Array of versions on each hook has been deprecated.
	 *
	 * @var array
	 */
	protected $deprecated_version = array(
		'fincommerce_my_account_my_orders_columns'   => '2.6.0',
		'fincommerce_email_order_schema_markup'      => '3.0.0',
		'add_to_cart_fragments'                      => '3.0.0',
		'add_to_cart_redirect'                       => '3.0.0',
		'fincommerce_product_width'                  => '3.0.0',
		'fincommerce_product_height'                 => '3.0.0',
		'fincommerce_product_length'                 => '3.0.0',
		'fincommerce_product_weight'                 => '3.0.0',
		'fincommerce_get_sku'                        => '3.0.0',
		'fincommerce_get_price'                      => '3.0.0',
		'fincommerce_get_regular_price'              => '3.0.0',
		'fincommerce_get_sale_price'                 => '3.0.0',
		'fincommerce_product_tax_class'              => '3.0.0',
		'fincommerce_get_stock_quantity'             => '3.0.0',
		'fincommerce_get_product_attributes'         => '3.0.0',
		'fincommerce_product_gallery_attachment_ids' => '3.0.0',
		'fincommerce_product_review_count'           => '3.0.0',
		'fincommerce_product_files'                  => '3.0.0',
		'fincommerce_get_currency'                   => '3.0.0',
		'fincommerce_order_amount_discount_total'    => '3.0.0',
		'fincommerce_order_amount_discount_tax'      => '3.0.0',
		'fincommerce_order_amount_shipping_total'    => '3.0.0',
		'fincommerce_order_amount_shipping_tax'      => '3.0.0',
		'fincommerce_order_amount_cart_tax'          => '3.0.0',
		'fincommerce_order_amount_total'             => '3.0.0',
		'fincommerce_order_amount_total_tax'         => '3.0.0',
		'fincommerce_order_amount_total_discount'    => '3.0.0',
		'fincommerce_order_amount_subtotal'          => '3.0.0',
		'fincommerce_order_tax_totals'               => '3.0.0',
		'fincommerce_refund_amount'                  => '3.0.0',
		'fincommerce_refund_reason'                  => '3.0.0',
		'default_checkout_country'                   => '3.0.0',
		'default_checkout_state'                     => '3.0.0',
		'default_checkout_postcode'                  => '3.0.0',
		'fincommerce_debug_posting'                  => '3.0.0',
		'wocommerce_credit_card_type_labels'         => '3.0.0',
		'fincommerce_settings_tabs_api'              => '3.4.0',
		'fincommerce_settings_api'                   => '3.4.0',
		'fincommerce_product_csv_importer_check_import_file_path' => '6.5.0',
	);

	/**
	 * Hook into the new hook so we can handle deprecated hooks once fired.
	 *
	 * @param string $hook_name Hook name.
	 */
	public function hook_in( $hook_name ) {
		add_filter( $hook_name, array( $this, 'maybe_handle_deprecated_hook' ), -1000, 8 );
	}

	/**
	 * If the old hook is in-use, trigger it.
	 *
	 * @param  string $new_hook          New hook name.
	 * @param  string $old_hook          Old hook name.
	 * @param  array  $new_callback_args New callback args.
	 * @param  mixed  $return_value      Returned value.
	 * @return mixed
	 */
	public function handle_deprecated_hook( $new_hook, $old_hook, $new_callback_args, $return_value ) {
		if ( has_filter( $old_hook ) ) {
			$this->display_notice( $old_hook, $new_hook );
			$return_value = $this->trigger_hook( $old_hook, $new_callback_args );
		}
		return $return_value;
	}

	/**
	 * Fire off a legacy hook with it's args.
	 *
	 * @param  string $old_hook          Old hook name.
	 * @param  array  $new_callback_args New callback args.
	 * @return mixed
	 */
	protected function trigger_hook( $old_hook, $new_callback_args ) {
		return apply_filters_ref_array( $old_hook, $new_callback_args );
	}
}
