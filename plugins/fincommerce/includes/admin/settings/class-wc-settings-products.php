<?php
/**
 * FinCommerce Product Settings
 *
 * @package FinCommerce\Admin
 * @version 2.4.0
 */

use Automattic\FinCommerce\Utilities\I18nUtil;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( class_exists( 'WC_Settings_Products', false ) ) {
	return new WC_Settings_Products();
}

/**
 * WC_Settings_Products.
 */
class WC_Settings_Products extends WC_Settings_Page {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->id    = 'products';
		$this->label = __( 'Products', 'fincommerce' );

		parent::__construct();
	}

	/**
	 * Setting page icon.
	 *
	 * @var string
	 */
	public $icon = 'box';

	/**
	 * Get own sections.
	 *
	 * @return array
	 */
	protected function get_own_sections() {
		return array(
			''             => __( 'General', 'fincommerce' ),
			'inventory'    => __( 'Inventory', 'fincommerce' ),
			'downloadable' => __( 'Downloadable products', 'fincommerce' ),
		);
	}

	/**
	 * Get settings for the default section.
	 *
	 * @return array
	 */
	protected function get_settings_for_default_section() {
		$locale_info            = include WC()->plugin_path() . '/i18n/locale-info.php';
		$default_weight_unit    = $locale_info['US']['weight_unit'];
		$default_dimension_unit = $locale_info['US']['dimension_unit'];

		$settings =
			array(
				array(
					'title' => __( 'Shop pages', 'fincommerce' ),
					'type'  => 'title',
					'desc'  => '',
					'id'    => 'catalog_options',
				),
				array(
					'title'    => __( 'Shop page', 'fincommerce' ),
					/* translators: %s: URL to settings. */
					'desc'     => sprintf( __( 'The base page can also be used in your <a href="%s">product permalinks</a>.', 'fincommerce' ), admin_url( 'options-permalink.php' ) ),
					'id'       => 'fincommerce_shop_page_id',
					'type'     => 'single_select_page',
					'default'  => '',
					'class'    => 'wc-enhanced-select-nostd',
					'css'      => 'min-width:300px;',
					'desc_tip' => __( 'This sets the base page of your shop - this is where your product archive will be.', 'fincommerce' ),
				),
				array(
					'title'         => __( 'Add to cart behaviour', 'fincommerce' ),
					'desc'          => __( 'Redirect to the cart page after successful addition', 'fincommerce' ),
					'id'            => 'fincommerce_cart_redirect_after_add',
					'default'       => 'no',
					'type'          => 'checkbox',
					'checkboxgroup' => 'start',
				),
				array(
					'desc'          => __( 'Enable AJAX add to cart buttons on archives', 'fincommerce' ),
					'id'            => 'fincommerce_enable_ajax_add_to_cart',
					'default'       => 'yes',
					'type'          => 'checkbox',
					'checkboxgroup' => 'end',
				),
				array(
					'title'       => __( 'Placeholder image', 'fincommerce' ),
					'id'          => 'fincommerce_placeholder_image',
					'type'        => 'text',
					'default'     => '',
					'class'       => '',
					'css'         => '',
					'placeholder' => __( 'Enter attachment ID or URL to an image', 'fincommerce' ),
					'desc_tip'    => __( 'This is the attachment ID, or image URL, used for placeholder images in the product catalog. Products with no image will use this.', 'fincommerce' ),
				),
				array(
					'type' => 'sectionend',
					'id'   => 'catalog_options',
				),

				array(
					'title' => __( 'Measurements', 'fincommerce' ),
					'type'  => 'title',
					'id'    => 'product_measurement_options',
				),

				array(
					'title'    => __( 'Weight unit', 'fincommerce' ),
					'desc'     => __( 'This controls what unit you will define weights in.', 'fincommerce' ),
					'id'       => 'fincommerce_weight_unit',
					'class'    => 'wc-enhanced-select',
					'css'      => 'min-width:300px;',
					'default'  => $default_weight_unit,
					'type'     => 'select',
					'options'  => array(
						'kg'  => I18nUtil::get_weight_unit_label( 'kg' ),
						'g'   => I18nUtil::get_weight_unit_label( 'g' ),
						'lbs' => I18nUtil::get_weight_unit_label( 'lbs' ),
						'oz'  => I18nUtil::get_weight_unit_label( 'oz' ),
					),
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Dimensions unit', 'fincommerce' ),
					'desc'     => __( 'This controls what unit you will define lengths in.', 'fincommerce' ),
					'id'       => 'fincommerce_dimension_unit',
					'class'    => 'wc-enhanced-select',
					'css'      => 'min-width:300px;',
					'default'  => $default_dimension_unit,
					'type'     => 'select',
					'options'  => array(
						'm'  => I18nUtil::get_dimensions_unit_label( 'm' ),
						'cm' => I18nUtil::get_dimensions_unit_label( 'cm' ),
						'mm' => I18nUtil::get_dimensions_unit_label( 'mm' ),
						'in' => I18nUtil::get_dimensions_unit_label( 'in' ),
						'yd' => I18nUtil::get_dimensions_unit_label( 'yd' ),
					),
					'desc_tip' => true,
				),

				array(
					'type' => 'sectionend',
					'id'   => 'product_measurement_options',
				),

				array(
					'title' => __( 'Reviews', 'fincommerce' ),
					'type'  => 'title',
					'desc'  => '',
					'id'    => 'product_rating_options',
				),

				array(
					'title'           => __( 'Enable reviews', 'fincommerce' ),
					'desc'            => __( 'Enable product reviews', 'fincommerce' ),
					'id'              => 'fincommerce_enable_reviews',
					'default'         => 'yes',
					'type'            => 'checkbox',
					'checkboxgroup'   => 'start',
					'show_if_checked' => 'option',
				),

				array(
					'desc'            => __( 'Show "verified owner" label on customer reviews', 'fincommerce' ),
					'id'              => 'fincommerce_review_rating_verification_label',
					'default'         => 'yes',
					'type'            => 'checkbox',
					'checkboxgroup'   => '',
					'show_if_checked' => 'yes',
					'autoload'        => false,
				),

				array(
					'desc'            => __( 'Reviews can only be left by "verified owners"', 'fincommerce' ),
					'id'              => 'fincommerce_review_rating_verification_required',
					'default'         => 'no',
					'type'            => 'checkbox',
					'checkboxgroup'   => 'end',
					'show_if_checked' => 'yes',
					'autoload'        => false,
				),

				array(
					'title'           => __( 'Product ratings', 'fincommerce' ),
					'desc'            => __( 'Enable star rating on reviews', 'fincommerce' ),
					'id'              => 'fincommerce_enable_review_rating',
					'default'         => 'yes',
					'type'            => 'checkbox',
					'checkboxgroup'   => 'start',
					'show_if_checked' => 'option',
				),

				array(
					'desc'            => __( 'Star ratings should be required, not optional', 'fincommerce' ),
					'id'              => 'fincommerce_review_rating_required',
					'default'         => 'yes',
					'type'            => 'checkbox',
					'checkboxgroup'   => 'end',
					'show_if_checked' => 'yes',
					'autoload'        => false,
				),

				array(
					'type' => 'sectionend',
					'id'   => 'product_rating_options',
				),
			);

		$settings = apply_filters( 'fincommerce_products_general_settings', $settings );
		return apply_filters( 'fincommerce_product_settings', $settings );
	}

	/**
	 * Get settings for the inventory section.
	 *
	 * @return array
	 */
	protected function get_settings_for_inventory_section() {
		$settings =
			array(
				array(
					'title' => __( 'Inventory', 'fincommerce' ),
					'type'  => 'title',
					'desc'  => '',
					'id'    => 'product_inventory_options',
				),

				array(
					'title'   => __( 'Manage stock', 'fincommerce' ),
					'desc'    => __( 'Enable stock management', 'fincommerce' ),
					'id'      => 'fincommerce_manage_stock',
					'default' => 'yes',
					'type'    => 'checkbox',
				),

				array(
					'title'             => __( 'Hold stock (minutes)', 'fincommerce' ),
					'desc'              => __( 'Hold stock (for unpaid orders) for x minutes. When this limit is reached, the pending order will be cancelled. Leave blank to disable.', 'fincommerce' ),
					'id'                => 'fincommerce_hold_stock_minutes',
					'type'              => 'number',
					'custom_attributes' => array(
						'min'  => 0,
						'step' => 1,
					),
					'css'               => 'width: 80px;',
					'default'           => '60',
					'autoload'          => false,
					'class'             => 'manage_stock_field',
				),

				array(
					'title'         => __( 'Notifications', 'fincommerce' ),
					'desc'          => __( 'Enable low stock notifications', 'fincommerce' ),
					'id'            => 'fincommerce_notify_low_stock',
					'default'       => 'yes',
					'type'          => 'checkbox',
					'checkboxgroup' => 'start',
					'autoload'      => false,
					'class'         => 'manage_stock_field',
				),

				array(
					'desc'          => __( 'Enable out of stock notifications', 'fincommerce' ),
					'id'            => 'fincommerce_notify_no_stock',
					'default'       => 'yes',
					'type'          => 'checkbox',
					'checkboxgroup' => 'end',
					'autoload'      => false,
					'class'         => 'manage_stock_field',
				),

				array(
					'title'    => __( 'Notification recipient(s)', 'fincommerce' ),
					'desc'     => __( 'Enter recipients (comma separated) that will receive this notification.', 'fincommerce' ),
					'id'       => 'fincommerce_stock_email_recipient',
					'type'     => 'text',
					'default'  => get_option( 'admin_email' ),
					'css'      => 'width: 250px;',
					'autoload' => false,
					'desc_tip' => true,
					'class'    => 'manage_stock_field',
				),

				array(
					'title'             => __( 'Low stock threshold', 'fincommerce' ),
					'desc'              => __( 'When product stock reaches this amount you will be notified via email.', 'fincommerce' ),
					'id'                => 'fincommerce_notify_low_stock_amount',
					'css'               => 'width:50px;',
					'type'              => 'number',
					'custom_attributes' => array(
						'min'  => 0,
						'step' => 1,
					),
					'default'           => '2',
					'autoload'          => false,
					'desc_tip'          => true,
					'class'             => 'manage_stock_field',
				),

				array(
					'title'             => __( 'Out of stock threshold', 'fincommerce' ),
					'desc'              => __( 'When product stock reaches this amount the stock status will change to "out of stock" and you will be notified via email. This setting does not affect existing "in stock" products.', 'fincommerce' ),
					'id'                => 'fincommerce_notify_no_stock_amount',
					'css'               => 'width:50px;',
					'type'              => 'number',
					'custom_attributes' => array(
						'min'  => 0,
						'step' => 1,
					),
					'default'           => '0',
					'desc_tip'          => true,
					'class'             => 'manage_stock_field',
				),

				array(
					'title'   => __( 'Out of stock visibility', 'fincommerce' ),
					'desc'    => __( 'Hide out of stock items from the catalog', 'fincommerce' ),
					'id'      => 'fincommerce_hide_out_of_stock_items',
					'default' => 'no',
					'type'    => 'checkbox',
				),

				array(
					'title'    => __( 'Stock display format', 'fincommerce' ),
					'desc'     => __( 'This controls how stock quantities are displayed on the frontend.', 'fincommerce' ),
					'id'       => 'fincommerce_stock_format',
					'css'      => 'min-width:150px;',
					'class'    => 'wc-enhanced-select',
					'default'  => '',
					'type'     => 'select',
					'options'  => array(
						''           => __( 'Always show quantity remaining in stock e.g. "12 in stock"', 'fincommerce' ),
						'low_amount' => __( 'Only show quantity remaining in stock when low e.g. "Only 2 left in stock"', 'fincommerce' ),
						'no_amount'  => __( 'Never show quantity remaining in stock', 'fincommerce' ),
					),
					'desc_tip' => true,
				),

				array(
					'type' => 'sectionend',
					'id'   => 'product_inventory_options',
				),
			);

		return apply_filters( 'fincommerce_inventory_settings', $settings );
	}

	/**
	 * Get settings for the downloadable section.
	 *
	 * @return array
	 */
	protected function get_settings_for_downloadable_section() {
		$settings =
			array(
				array(
					'title' => __( 'Downloadable products', 'fincommerce' ),
					'type'  => 'title',
					'id'    => 'digital_download_options',
				),

				array(
					'title'    => __( 'File download method', 'fincommerce' ),
					'desc_tip' => sprintf(
					/* translators: 1: X-Accel-Redirect 2: X-Sendfile 3: mod_xsendfile */
						__( 'Forcing downloads will keep URLs hidden, but some servers may serve large files unreliably. If supported, %1$s / %2$s can be used to serve downloads instead (server requires %3$s).', 'fincommerce' ),
						'<code>X-Accel-Redirect</code>',
						'<code>X-Sendfile</code>',
						'<code>mod_xsendfile</code>'
					),
					'id'       => 'fincommerce_file_download_method',
					'type'     => 'select',
					'class'    => 'wc-enhanced-select',
					'css'      => 'min-width:300px;',
					'default'  => 'force',
					'desc'     => sprintf(
					// translators: Link to FinCommerce Docs.
						__( "If you are using X-Accel-Redirect download method along with NGINX server, make sure that you have applied settings as described in <a href='%s'>Digital/Downloadable Product Handling</a> guide.", 'fincommerce' ),
						'https://fincommerce.com/document/digital-downloadable-product-handling#nginx-setting'
					),
					'options'  => array(
						'force'     => __( 'Force downloads', 'fincommerce' ),
						'xsendfile' => __( 'X-Accel-Redirect/X-Sendfile', 'fincommerce' ),
						'redirect'  => apply_filters( 'fincommerce_redirect_only_method_is_secure', false ) ? __( 'Redirect only', 'fincommerce' ) : __( 'Redirect only (Insecure)', 'fincommerce' ),
					),
					'autoload' => false,
				),

				array(
					'desc'          => __( 'Allow using redirect mode (insecure) as a last resort', 'fincommerce' ),
					'id'            => 'fincommerce_downloads_redirect_fallback_allowed',
					'type'          => 'checkbox',
					'default'       => 'no',
					'desc_tip'      => sprintf(
						/* translators: %1$s is a link to the FinCommerce documentation. */
						__( 'If the "Force Downloads" or "X-Accel-Redirect/X-Sendfile" download method is selected but does not work, the system will use the "Redirect" method as a last resort. <a href="%1$s">See this guide</a> for more details.', 'fincommerce' ),
						'https://fincommerce.com/document/digital-downloadable-product-handling/'
					),
					'checkboxgroup' => 'start',
					'autoload'      => false,
				),

				array(
					'title'         => __( 'Access restriction', 'fincommerce' ),
					'desc'          => __( 'Downloads require login', 'fincommerce' ),
					'id'            => 'fincommerce_downloads_require_login',
					'type'          => 'checkbox',
					'default'       => 'no',
					'desc_tip'      => __( 'This setting does not apply to guest purchases.', 'fincommerce' ),
					'checkboxgroup' => 'start',
					'autoload'      => false,
				),

				array(
					'desc'          => __( 'Grant access to downloadable products after payment', 'fincommerce' ),
					'id'            => 'fincommerce_downloads_grant_access_after_payment',
					'type'          => 'checkbox',
					'default'       => 'yes',
					'desc_tip'      => __( 'Enable this option to grant access to downloads when orders are "processing", rather than "completed".', 'fincommerce' ),
					'checkboxgroup' => 'end',
					'autoload'      => false,
				),

				array(
					'title'    => __( 'Open in browser', 'fincommerce' ),
					'desc'     => __( 'Open downloadable files in the browser, instead of saving them to the device.', 'fincommerce' ),
					'id'       => 'fincommerce_downloads_deliver_inline',
					'type'     => 'checkbox',
					'default'  => false,
					'desc_tip' => __( 'Customers can still save the file to their device, but by default file will be opened instead of being downloaded (does not work with redirects).', 'fincommerce' ),
					'autoload' => false,
				),

				array(
					'title'    => __( 'Filename', 'fincommerce' ),
					'desc'     => __( 'Append a unique string to filename for security', 'fincommerce' ),
					'id'       => 'fincommerce_downloads_add_hash_to_filename',
					'type'     => 'checkbox',
					'default'  => 'yes',
					'desc_tip' => sprintf(
					// translators: Link to FinCommerce Docs.
						__( "Not required if your download directory is protected. <a href='%s'>See this guide</a> for more details. Files already uploaded will not be affected.", 'fincommerce' ),
						'https://fincommerce.com/document/digital-downloadable-product-handling#unique-string'
					),
				),

				array(
					'title'    => __( 'Count partial downloads', 'fincommerce' ),
					'desc'     => __( 'Count downloads even if only part of a file is fetched.', 'fincommerce' ),
					'id'       => 'fincommerce_downloads_count_partial',
					'type'     => 'checkbox',
					'default'  => 'yes',
					'desc_tip' => sprintf(
						/* Translators: 1: opening link tag 2: closing link tag. */
						__( 'Repeat fetches made within a reasonable window of time (by default, 30 minutes) will not be counted twice. This is a generally reasonably way to enforce download limits in relation to ranged requests. %1$sLearn more.%2$s', 'fincommerce' ),
						'<a href="https://fincommerce.com/document/digital-downloadable-product-handling/">',
						'</a>'
					),
				),

				array(
					'type' => 'sectionend',
					'id'   => 'digital_download_options',
				),
			);

		return apply_filters( 'fincommerce_downloadable_products_settings', $settings );
	}

	/**
	 * Save settings and trigger the 'fincommerce_update_options_'.id action.
	 */
	public function save() {
		$this->save_settings_for_current_section();

		/*
		 * Product->Inventory has a setting `Out of stock visibility`.
		 * Because of this, we need to recount the terms to keep them in-sync.
		 */
		WC()->call_function( 'wc_recount_all_terms', false );

		$this->do_update_options_action();
	}
}

return new WC_Settings_Products();
