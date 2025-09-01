/**
 * Internal dependencies
 */
import { BlueprintStep } from './types';

const OPTIONS_GROUPS = {
	fincommerce_store_address: 'General',
	fincommerce_store_address_2: 'General',
	fincommerce_store_city: 'General',
	fincommerce_default_country: 'General',
	fincommerce_store_postcode: 'General',
	fincommerce_allowed_countries: 'General',
	fincommerce_all_except_countries: 'General',
	fincommerce_specific_allowed_countries: 'General',
	fincommerce_ship_to_countries: 'General',
	fincommerce_specific_ship_to_countries: 'General',
	fincommerce_default_customer_address: 'General',
	fincommerce_calc_taxes: 'General',
	fincommerce_enable_coupons: 'General',
	fincommerce_calc_discounts_sequentially: 'General',
	fincommerce_currency: 'General',
	fincommerce_currency_pos: 'General',
	fincommerce_price_thousand_sep: 'General',
	fincommerce_price_decimal_sep: 'General',
	fincommerce_price_num_decimals: 'General',
	fincommerce_shop_page_id: 'Products',
	fincommerce_cart_redirect_after_add: 'Products',
	fincommerce_enable_ajax_add_to_cart: 'Products',
	fincommerce_placeholder_image: 'Products',
	fincommerce_weight_unit: 'Products',
	fincommerce_dimension_unit: 'Products',
	fincommerce_enable_reviews: 'Products',
	fincommerce_review_rating_verification_label: 'Products',
	fincommerce_review_rating_verification_required: 'Products',
	fincommerce_enable_review_rating: 'Products',
	fincommerce_review_rating_required: 'Products',
	fincommerce_manage_stock: 'Products',
	fincommerce_hold_stock_minutes: 'Products',
	fincommerce_notify_low_stock: 'Products',
	fincommerce_notify_no_stock: 'Products',
	fincommerce_stock_email_recipient: 'Products',
	fincommerce_notify_low_stock_amount: 'Products',
	fincommerce_notify_no_stock_amount: 'Products',
	fincommerce_hide_out_of_stock_items: 'Products',
	fincommerce_stock_format: 'Products',
	fincommerce_file_download_method: 'Products',
	fincommerce_downloads_redirect_fallback_allowed: 'Products',
	fincommerce_downloads_require_login: 'Products',
	fincommerce_downloads_grant_access_after_payment: 'Products',
	fincommerce_downloads_deliver_inline: 'Products',
	fincommerce_downloads_add_hash_to_filename: 'Products',
	fincommerce_downloads_count_partial: 'Products',
	fincommerce_attribute_lookup_enabled: 'Products',
	fincommerce_attribute_lookup_direct_updates: 'Products',
	fincommerce_attribute_lookup_optimized_updates: 'Products',
	fincommerce_product_match_featured_image_by_sku: 'Products',
	fincommerce_bacs_settings: 'Payments',
	fincommerce_cheque_settings: 'Payments',
	fincommerce_cod_settings: 'Payments',
	fincommerce_enable_guest_checkout: 'Accounts',
	fincommerce_enable_checkout_login_reminder: 'Accounts',
	fincommerce_enable_delayed_account_creation: 'Accounts',
	fincommerce_enable_signup_and_login_from_checkout: 'Accounts',
	fincommerce_enable_myaccount_registration: 'Accounts',
	fincommerce_registration_generate_password: 'Accounts',
	fincommerce_erasure_request_removes_order_data: 'Accounts',
	fincommerce_erasure_request_removes_download_data: 'Accounts',
	fincommerce_allow_bulk_remove_personal_data: 'Accounts',
	fincommerce_registration_privacy_policy_text: 'Accounts',
	fincommerce_checkout_privacy_policy_text: 'Accounts',
	fincommerce_delete_inactive_accounts: 'Accounts',
	fincommerce_trash_pending_orders: 'Accounts',
	fincommerce_trash_failed_orders: 'Accounts',
	fincommerce_trash_cancelled_orders: 'Accounts',
	fincommerce_anonymize_refunded_orders: 'Accounts',
	fincommerce_anonymize_completed_orders: 'Accounts',
	fincommerce_email_from_name: 'Emails',
	fincommerce_email_from_address: 'Emails',
	fincommerce_email_header_image: 'Emails',
	fincommerce_email_base_color: 'Emails',
	fincommerce_email_background_color: 'Emails',
	fincommerce_email_body_background_color: 'Emails',
	fincommerce_email_text_color: 'Emails',
	fincommerce_email_footer_text: 'Emails',
	fincommerce_email_footer_text_color: 'Emails',
	fincommerce_email_auto_sync_with_theme: 'Emails',
	fincommerce_merchant_email_notifications: 'Emails',
	fincommerce_coming_soon: 'Site visibility',
	fincommerce_store_pages_only: 'Site visibility',
	fincommerce_cart_page_id: 'Advanced',
	fincommerce_checkout_page_id: 'Advanced',
	fincommerce_myaccount_page_id: 'Advanced',
	fincommerce_terms_page_id: 'Advanced',
	fincommerce_checkout_pay_endpoint: 'Advanced',
	fincommerce_checkout_order_received_endpoint: 'Advanced',
	fincommerce_myaccount_add_payment_method_endpoint: 'Advanced',
	fincommerce_myaccount_delete_payment_method_endpoint: 'Advanced',
	fincommerce_myaccount_set_default_payment_method_endpoint: 'Advanced',
	fincommerce_myaccount_orders_endpoint: 'Advanced',
	fincommerce_myaccount_view_order_endpoint: 'Advanced',
	fincommerce_myaccount_downloads_endpoint: 'Advanced',
	fincommerce_myaccount_edit_account_endpoint: 'Advanced',
	fincommerce_myaccount_edit_address_endpoint: 'Advanced',
	fincommerce_myaccount_payment_methods_endpoint: 'Advanced',
	fincommerce_myaccount_lost_password_endpoint: 'Advanced',
	fincommerce_logout_endpoint: 'Advanced',
	fincommerce_api_enabled: 'Advanced',
	fincommerce_allow_tracking: 'Advanced',
	fincommerce_show_marketplace_suggestions: 'Advanced',
	fincommerce_custom_orders_table_enabled: 'Advanced',
	fincommerce_custom_orders_table_data_sync_enabled: 'Advanced',
	fincommerce_analytics_enabled: 'Advanced',
	fincommerce_feature_rate_limit_checkout_enabled: 'Advanced',
	fincommerce_feature_order_attribution_enabled: 'Advanced',
	fincommerce_feature_site_visibility_badge_enabled: 'Advanced',
	fincommerce_feature_remote_logging_enabled: 'Advanced',
	fincommerce_feature_email_improvements_enabled: 'Advanced',
	fincommerce_feature_blueprint_enabled: 'Advanced',
	fincommerce_feature_product_block_editor_enabled: 'Advanced',
	fincommerce_hpos_fts_index_enabled: 'Advanced',
	fincommerce_feature_cost_of_goods_sold_enabled: 'Advanced',
};
/**
 * Get option groups from options
 *
 * Takes a list of options and return the groups they belong to.
 *
 * In this context, groups are the sections in the settings page (e.g. General, Products, Payments, etc).
 *
 * @param options a list of options
 * @return string[] a list of groups
 */
export const getOptionGroups = ( options: string[] ) => {
	const groups = new Set();
	options.forEach( ( option ) => {
		if ( OPTIONS_GROUPS[ option as keyof typeof OPTIONS_GROUPS ] ) {
			groups.add(
				OPTIONS_GROUPS[ option as keyof typeof OPTIONS_GROUPS ]
			);
		}
	} );
	return Array.from( groups );
};

/**
 * Take an array of Blueprint steps, filter `setSiteOptions` steps and return the groups of options
 *
 * @param steps a list of Blueprint steps
 * @return string[] a list of groups
 */
export const getOptionGroupsFromSteps = (
	steps: ( BlueprintStep & { options?: Record< string, string > } )[]
) => {
	const options = steps.reduce< string[] >( ( acc, step ) => {
		if ( step.step === 'setSiteOptions' && step.options ) {
			acc.push( ...Object.keys( step.options ) );
		}
		return acc;
	}, [] );

	return getOptionGroups( options );
};
