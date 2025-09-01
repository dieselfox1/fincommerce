<?php
/**
 * FinCommerce Template Hooks
 *
 * Action/filter hooks used for FinCommerce functions/templates.
 *
 * @package FinCommerce\Templates
 * @version 2.1.0
 */

defined( 'ABSPATH' ) || exit;

add_filter( 'body_class', 'wc_body_class' );
add_filter( 'post_class', 'wc_product_post_class', 20, 3 );

/**
 * WP Header.
 *
 * @see wc_generator_tag()
 */
add_filter( 'get_the_generator_html', 'wc_generator_tag', 10, 2 );
add_filter( 'get_the_generator_xhtml', 'wc_generator_tag', 10, 2 );

/**
 * Content Wrappers.
 *
 * @see fincommerce_output_content_wrapper()
 * @see fincommerce_output_content_wrapper_end()
 */
add_action( 'fincommerce_before_main_content', 'fincommerce_output_content_wrapper', 10 );
add_action( 'fincommerce_after_main_content', 'fincommerce_output_content_wrapper_end', 10 );

/**
 * Sale flashes.
 *
 * @see fincommerce_show_product_loop_sale_flash()
 * @see fincommerce_show_product_sale_flash()
 */
add_action( 'fincommerce_before_shop_loop_item_title', 'fincommerce_show_product_loop_sale_flash', 10 );
add_action( 'fincommerce_before_single_product_summary', 'fincommerce_show_product_sale_flash', 10 );

/**
 * Breadcrumbs.
 *
 * @see fincommerce_breadcrumb()
 */
add_action( 'fincommerce_before_main_content', 'fincommerce_breadcrumb', 20, 0 );

/**
 * Sidebar.
 *
 * @see fincommerce_get_sidebar()
 */
add_action( 'fincommerce_sidebar', 'fincommerce_get_sidebar', 10 );

/**
 * Archive header.
 *
 * @see fincommerce_product_taxonomy_archive_header()
 */
add_action( 'fincommerce_shop_loop_header', 'fincommerce_product_taxonomy_archive_header' );

/**
 * Archive descriptions.
 *
 * @see fincommerce_taxonomy_archive_description()
 * @see fincommerce_product_archive_description()
 */
add_action( 'fincommerce_archive_description', 'fincommerce_taxonomy_archive_description', 10 );
add_action( 'fincommerce_archive_description', 'fincommerce_product_archive_description', 10 );

/**
 * Product loop start.
 */
add_filter( 'fincommerce_product_loop_start', 'fincommerce_maybe_show_product_subcategories' );

/**
 * Products Loop.
 *
 * @see fincommerce_result_count()
 * @see fincommerce_catalog_ordering()
 */
add_action( 'fincommerce_before_shop_loop', 'fincommerce_result_count', 20 );
add_action( 'fincommerce_before_shop_loop', 'fincommerce_catalog_ordering', 30 );
add_action( 'fincommerce_no_products_found', 'wc_no_products_found' );

/**
 * Product Loop Items.
 *
 * @see fincommerce_template_loop_product_link_open()
 * @see fincommerce_template_loop_product_link_close()
 * @see fincommerce_template_loop_add_to_cart()
 * @see fincommerce_template_loop_product_thumbnail()
 * @see fincommerce_template_loop_product_title()
 * @see fincommerce_template_loop_category_link_open()
 * @see fincommerce_template_loop_category_title()
 * @see fincommerce_template_loop_category_link_close()
 * @see fincommerce_template_loop_price()
 * @see fincommerce_template_loop_rating()
 */
add_action( 'fincommerce_before_shop_loop_item', 'fincommerce_template_loop_product_link_open', 10 );
add_action( 'fincommerce_after_shop_loop_item', 'fincommerce_template_loop_product_link_close', 5 );
add_action( 'fincommerce_after_shop_loop_item', 'fincommerce_template_loop_add_to_cart', 10 );
add_action( 'fincommerce_before_shop_loop_item_title', 'fincommerce_template_loop_product_thumbnail', 10 );
add_action( 'fincommerce_shop_loop_item_title', 'fincommerce_template_loop_product_title', 10 );

add_action( 'fincommerce_before_subcategory', 'fincommerce_template_loop_category_link_open', 10 );
add_action( 'fincommerce_shop_loop_subcategory_title', 'fincommerce_template_loop_category_title', 10 );
add_action( 'fincommerce_after_subcategory', 'fincommerce_template_loop_category_link_close', 10 );

add_action( 'fincommerce_after_shop_loop_item_title', 'fincommerce_template_loop_price', 10 );
add_action( 'fincommerce_after_shop_loop_item_title', 'fincommerce_template_loop_rating', 5 );

/**
 * Subcategories.
 *
 * @see fincommerce_subcategory_thumbnail()
 */
add_action( 'fincommerce_before_subcategory_title', 'fincommerce_subcategory_thumbnail', 10 );

/**
 * Before Single Products Summary Div.
 *
 * @see fincommerce_show_product_images()
 * @see fincommerce_show_product_thumbnails()
 */
add_action( 'fincommerce_before_single_product_summary', 'fincommerce_show_product_images', 20 );
add_action( 'fincommerce_product_thumbnails', 'fincommerce_show_product_thumbnails', 20 );

/**
 * After Single Products Summary Div.
 *
 * @see fincommerce_output_product_data_tabs()
 * @see fincommerce_upsell_display()
 * @see fincommerce_output_related_products()
 */
add_action( 'fincommerce_after_single_product_summary', 'fincommerce_output_product_data_tabs', 10 );
add_action( 'fincommerce_after_single_product_summary', 'fincommerce_upsell_display', 15 );
add_action( 'fincommerce_after_single_product_summary', 'fincommerce_output_related_products', 20 );

/**
 * Product Summary Box.
 *
 * @see fincommerce_template_single_title()
 * @see fincommerce_template_single_rating()
 * @see fincommerce_template_single_price()
 * @see fincommerce_template_single_excerpt()
 * @see fincommerce_template_single_meta()
 * @see fincommerce_template_single_sharing()
 */
add_action( 'fincommerce_single_product_summary', 'fincommerce_template_single_title', 5 );
add_action( 'fincommerce_single_product_summary', 'fincommerce_template_single_rating', 10 );
add_action( 'fincommerce_single_product_summary', 'fincommerce_template_single_price', 10 );
add_action( 'fincommerce_single_product_summary', 'fincommerce_template_single_excerpt', 20 );
add_action( 'fincommerce_single_product_summary', 'fincommerce_template_single_meta', 40 );
add_action( 'fincommerce_single_product_summary', 'fincommerce_template_single_sharing', 50 );

/**
 * Reviews
 *
 * @see fincommerce_review_display_gravatar()
 * @see fincommerce_review_display_rating()
 * @see fincommerce_review_display_meta()
 * @see fincommerce_review_display_comment_text()
 */
add_action( 'fincommerce_review_before', 'fincommerce_review_display_gravatar', 10 );
add_action( 'fincommerce_review_before_comment_meta', 'fincommerce_review_display_rating', 10 );
add_action( 'fincommerce_review_meta', 'fincommerce_review_display_meta', 10 );
add_action( 'fincommerce_review_comment_text', 'fincommerce_review_display_comment_text', 10 );

/**
 * Product Add to cart.
 *
 * @see fincommerce_template_single_add_to_cart()
 * @see fincommerce_simple_add_to_cart()
 * @see fincommerce_grouped_add_to_cart()
 * @see fincommerce_variable_add_to_cart()
 * @see fincommerce_external_add_to_cart()
 * @see fincommerce_single_variation()
 * @see fincommerce_single_variation_add_to_cart_button()
 */
add_action( 'fincommerce_single_product_summary', 'fincommerce_template_single_add_to_cart', 30 );
add_action( 'fincommerce_simple_add_to_cart', 'fincommerce_simple_add_to_cart', 30 );
add_action( 'fincommerce_grouped_add_to_cart', 'fincommerce_grouped_add_to_cart', 30 );
add_action( 'fincommerce_variable_add_to_cart', 'fincommerce_variable_add_to_cart', 30 );
add_action( 'fincommerce_external_add_to_cart', 'fincommerce_external_add_to_cart', 30 );
add_action( 'fincommerce_single_variation', 'fincommerce_single_variation', 10 );
add_action( 'fincommerce_single_variation', 'fincommerce_single_variation_add_to_cart_button', 20 );

/**
 * Pagination after shop loops.
 *
 * @see fincommerce_pagination()
 */
add_action( 'fincommerce_after_shop_loop', 'fincommerce_pagination', 10 );

/**
 * Product page tabs.
 */
add_filter( 'fincommerce_product_tabs', 'fincommerce_default_product_tabs' );
add_filter( 'fincommerce_product_tabs', 'fincommerce_sort_product_tabs', 99 );

/**
 * Additional Information tab.
 *
 * @see wc_display_product_attributes()
 */
add_action( 'fincommerce_product_additional_information', 'wc_display_product_attributes', 10 );

/**
 * Checkout.
 *
 * @see fincommerce_checkout_login_form()
 * @see fincommerce_checkout_coupon_form()
 * @see fincommerce_order_review()
 * @see fincommerce_checkout_payment()
 * @see wc_checkout_privacy_policy_text()
 * @see wc_terms_and_conditions_page_content()
 * @see wc_get_pay_buttons()
 */
add_action( 'fincommerce_before_checkout_form', 'fincommerce_checkout_login_form', 10 );
add_action( 'fincommerce_before_checkout_form', 'fincommerce_checkout_coupon_form', 10 );
add_action( 'fincommerce_checkout_order_review', 'fincommerce_order_review', 10 );
add_action( 'fincommerce_checkout_order_review', 'fincommerce_checkout_payment', 20 );
add_action( 'fincommerce_checkout_terms_and_conditions', 'wc_checkout_privacy_policy_text', 20 );
add_action( 'fincommerce_checkout_terms_and_conditions', 'wc_terms_and_conditions_page_content', 30 );
add_action( 'fincommerce_checkout_before_customer_details', 'wc_get_pay_buttons', 30 );

/**
 * Cart widget
 */
add_action( 'fincommerce_widget_shopping_cart_buttons', 'fincommerce_widget_shopping_cart_button_view_cart', 10 );
add_action( 'fincommerce_widget_shopping_cart_buttons', 'fincommerce_widget_shopping_cart_proceed_to_checkout', 20 );
add_action( 'fincommerce_widget_shopping_cart_total', 'fincommerce_widget_shopping_cart_subtotal', 10 );

/**
 * Cart.
 *
 * @see fincommerce_cross_sell_display()
 * @see fincommerce_cart_totals()
 * @see wc_get_pay_buttons()
 * @see fincommerce_button_proceed_to_checkout()
 * @see wc_empty_cart_message()
 */
add_action( 'fincommerce_cart_collaterals', 'fincommerce_cross_sell_display' );
add_action( 'fincommerce_cart_collaterals', 'fincommerce_cart_totals', 10 );
add_action( 'fincommerce_proceed_to_checkout', 'wc_get_pay_buttons', 10 );
add_action( 'fincommerce_proceed_to_checkout', 'fincommerce_button_proceed_to_checkout', 20 );
add_action( 'fincommerce_cart_is_empty', 'wc_empty_cart_message', 10 );

/**
 * Footer.
 *
 * @see  wc_print_js()
 * @see fincommerce_demo_store()
 */
add_action( 'wp_footer', 'wc_print_js', 25 );
add_action( 'wp_body_open', 'fincommerce_demo_store' );
add_action(
	'wp_footer',
	function () {
		// Fallback for pre-WP5.2 themes that don't support wp_body_open.
		if ( 0 === did_action( 'wp_body_open' ) ) {
			fincommerce_demo_store();
		}
	}
);

/**
 * Order details.
 *
 * @see fincommerce_order_details_table()
 * @see fincommerce_order_again_button()
 */
add_action( 'fincommerce_view_order', 'fincommerce_order_details_table', 10 );
add_action( 'fincommerce_thankyou', 'fincommerce_order_details_table', 10 );
add_action( 'fincommerce_order_details_after_order_table', 'fincommerce_order_again_button' );

/**
 * Order downloads.
 *
 * @see fincommerce_order_downloads_table()
 */
add_action( 'fincommerce_available_downloads', 'fincommerce_order_downloads_table', 10 );

/**
 * Auth.
 *
 * @see fincommerce_output_auth_header()
 * @see fincommerce_output_auth_footer()
 */
add_action( 'fincommerce_auth_page_header', 'fincommerce_output_auth_header', 10 );
add_action( 'fincommerce_auth_page_footer', 'fincommerce_output_auth_footer', 10 );

/**
 * Comments.
 *
 * Disable Jetpack comments.
 */
add_filter( 'jetpack_comment_form_enabled_for_product', '__return_false' );

/**
 * My Account.
 */
add_action( 'fincommerce_account_navigation', 'fincommerce_account_navigation' );
add_action( 'fincommerce_account_content', 'fincommerce_account_content' );
add_action( 'fincommerce_account_orders_endpoint', 'fincommerce_account_orders' );
add_action( 'fincommerce_account_view-order_endpoint', 'fincommerce_account_view_order' );
add_action( 'fincommerce_account_downloads_endpoint', 'fincommerce_account_downloads' );
add_action( 'fincommerce_account_edit-address_endpoint', 'fincommerce_account_edit_address' );
add_action( 'fincommerce_account_payment-methods_endpoint', 'fincommerce_account_payment_methods' );
add_action( 'fincommerce_account_add-payment-method_endpoint', 'fincommerce_account_add_payment_method' );
add_action( 'fincommerce_account_edit-account_endpoint', 'fincommerce_account_edit_account' );
add_action( 'fincommerce_register_form', 'wc_registration_privacy_policy_text', 20 );

/**
 * Notices.
 */
add_action( 'fincommerce_cart_is_empty', 'fincommerce_output_all_notices', 5 );
add_action( 'fincommerce_shortcode_before_product_cat_loop', 'fincommerce_output_all_notices', 10 );
add_action( 'fincommerce_before_shop_loop', 'fincommerce_output_all_notices', 10 );
add_action( 'fincommerce_before_single_product', 'fincommerce_output_all_notices', 10 );
add_action( 'fincommerce_before_cart', 'fincommerce_output_all_notices', 10 );
add_action( 'fincommerce_before_checkout_form_cart_notices', 'fincommerce_output_all_notices', 10 );
add_action( 'fincommerce_before_checkout_form', 'fincommerce_output_all_notices', 10 );
add_action( 'fincommerce_account_content', 'fincommerce_output_all_notices', 5 );
add_action( 'fincommerce_before_customer_login_form', 'fincommerce_output_all_notices', 10 );
add_action( 'fincommerce_before_lost_password_form', 'fincommerce_output_all_notices', 10 );
add_action( 'before_fincommerce_pay', 'fincommerce_output_all_notices', 10 );
add_action( 'fincommerce_before_reset_password_form', 'fincommerce_output_all_notices', 10 );

/**
 * Hooked blocks.
 */
add_action( 'after_switch_theme', 'wc_after_switch_theme', 10, 2 );
