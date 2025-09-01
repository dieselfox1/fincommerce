<?php
/**
 * FinCommerce advanced settings
 *
 * @package  FinCommerce\Admin
 */

use Automattic\FinCommerce\Utilities\FeaturesUtil;

defined( 'ABSPATH' ) || exit;

/**
 * Settings for API.
 */
if ( class_exists( 'WC_Settings_Advanced', false ) ) {
	return new WC_Settings_Advanced();
}

/**
 * WC_Settings_Advanced.
 */
class WC_Settings_Advanced extends WC_Settings_Page {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->id    = 'advanced';
		$this->label = __( 'Advanced', 'fincommerce' );

		parent::__construct();
		$this->notices();
	}

	/**
	 * Setting page icon.
	 *
	 * @var string
	 */
	public $icon = 'more';

	/**
	 * Get own sections.
	 *
	 * @return array
	 */
	protected function get_own_sections() {
		$sections = array(
			''                => __( 'Page setup', 'fincommerce' ),
			'keys'            => __( 'REST API', 'fincommerce' ),
			'webhooks'        => __( 'Webhooks', 'fincommerce' ),
			'legacy_api'      => __( 'Legacy API', 'fincommerce' ),
			'fincommerce_com' => __( 'FinCommerce.com', 'fincommerce' ),
		);

		if ( FeaturesUtil::feature_is_enabled( 'blueprint' ) ) {
			$sections['blueprint'] = __( 'Blueprint (beta)', 'fincommerce' );
		}

		return $sections;
	}

	/**
	 * Get settings for the default section.
	 *
	 * @return array
	 */
	protected function get_settings_for_default_section() {
		$settings =
			array(
				array(
					'title' => __( 'Page setup', 'fincommerce' ),
					'desc'  => __( 'These pages need to be set so that FinCommerce knows where to send users to checkout.', 'fincommerce' ),
					'type'  => 'title',
					'id'    => 'advanced_page_options',
				),

				array(
					'title'    => __( 'Cart page', 'fincommerce' ),
					/* Translators: %s Page contents. */
					'desc'     => __( 'Page where shoppers review their shopping cart', 'fincommerce' ),
					'id'       => 'fincommerce_cart_page_id',
					'type'     => 'single_select_page_with_search',
					'default'  => '',
					'class'    => 'wc-page-search',
					'css'      => 'min-width:300px;',
					'args'     => array(
						'exclude' =>
							array(
								wc_get_page_id( 'checkout' ),
								wc_get_page_id( 'myaccount' ),
							),
					),
					'desc_tip' => true,
					'autoload' => false,
				),

				array(
					'title'    => __( 'Checkout page', 'fincommerce' ),
					/* Translators: %s Page contents. */
					'desc'     => __( 'Page where shoppers go to finalize their purchase', 'fincommerce' ),
					'id'       => 'fincommerce_checkout_page_id',
					'type'     => 'single_select_page_with_search',
					'default'  => wc_get_page_id( 'checkout' ),
					'class'    => 'wc-page-search',
					'css'      => 'min-width:300px;',
					'args'     => array(
						'exclude' =>
							array(
								wc_get_page_id( 'cart' ),
								wc_get_page_id( 'myaccount' ),
							),
					),
					'desc_tip' => true,
					'autoload' => false,
				),

				array(
					'title'    => __( 'My account page', 'fincommerce' ),
					/* Translators: %s Page contents. */
					'desc'     => sprintf( __( 'Page contents: [%s]', 'fincommerce' ), apply_filters( 'fincommerce_my_account_shortcode_tag', 'fincommerce_my_account' ) ),
					'id'       => 'fincommerce_myaccount_page_id',
					'type'     => 'single_select_page_with_search',
					'default'  => '',
					'class'    => 'wc-page-search',
					'css'      => 'min-width:300px;',
					'args'     => array(
						'exclude' =>
							array(
								wc_get_page_id( 'cart' ),
								wc_get_page_id( 'checkout' ),
							),
					),
					'desc_tip' => true,
					'autoload' => false,
				),

				array(
					'title'    => __( 'Terms and conditions', 'fincommerce' ),
					'desc'     => __( 'If you define a "Terms" page the customer will be asked if they accept them when checking out.', 'fincommerce' ),
					'id'       => 'fincommerce_terms_page_id',
					'default'  => '',
					'class'    => 'wc-page-search',
					'css'      => 'min-width:300px;',
					'type'     => 'single_select_page_with_search',
					'args'     => array( 'exclude' => wc_get_page_id( 'checkout' ) ),
					'desc_tip' => true,
					'autoload' => false,
				),

				array(
					'type' => 'sectionend',
					'id'   => 'advanced_page_options',
				),

				array(
					'title' => '',
					'type'  => 'title',
					'id'    => 'checkout_process_options',
				),

				'force_ssl_checkout'   => array(
					'title'           => __( 'Secure checkout', 'fincommerce' ),
					'desc'            => __( 'Force secure checkout', 'fincommerce' ),
					'id'              => 'fincommerce_force_ssl_checkout',
					'default'         => 'no',
					'type'            => 'checkbox',
					'checkboxgroup'   => 'start',
					'show_if_checked' => 'option',
					/* Translators: %s Docs URL. */
					'desc_tip'        => sprintf( __( 'Force SSL (HTTPS) on the checkout pages (<a href="%s" target="_blank">an SSL Certificate is required</a>).', 'fincommerce' ), 'https://fincommerce.com/document/ssl-and-https/#section-3' ),
				),

				'unforce_ssl_checkout' => array(
					'desc'            => __( 'Force HTTP when leaving the checkout', 'fincommerce' ),
					'id'              => 'fincommerce_unforce_ssl_checkout',
					'default'         => 'no',
					'type'            => 'checkbox',
					'checkboxgroup'   => 'end',
					'show_if_checked' => 'yes',
				),

				array(
					'type' => 'sectionend',
					'id'   => 'checkout_process_options',
				),

				array(
					'title' => __( 'Checkout endpoints', 'fincommerce' ),
					'type'  => 'title',
					'desc'  => __( 'Endpoints are appended to your page URLs to handle specific actions during the checkout process. They should be unique.', 'fincommerce' ),
					'id'    => 'checkout_endpoint_options',
				),

				array(
					'title'    => __( 'Pay', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the "Checkout &rarr; Pay" page.', 'fincommerce' ),
					'id'       => 'fincommerce_checkout_pay_endpoint',
					'type'     => 'text',
					'default'  => 'order-pay',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Order received', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the "Checkout &rarr; Order received" page.', 'fincommerce' ),
					'id'       => 'fincommerce_checkout_order_received_endpoint',
					'type'     => 'text',
					'default'  => 'order-received',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Add payment method', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the "Checkout &rarr; Add payment method" page.', 'fincommerce' ),
					'id'       => 'fincommerce_myaccount_add_payment_method_endpoint',
					'type'     => 'text',
					'default'  => 'add-payment-method',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Delete payment method', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the delete payment method page.', 'fincommerce' ),
					'id'       => 'fincommerce_myaccount_delete_payment_method_endpoint',
					'type'     => 'text',
					'default'  => 'delete-payment-method',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Set default payment method', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the setting a default payment method page.', 'fincommerce' ),
					'id'       => 'fincommerce_myaccount_set_default_payment_method_endpoint',
					'type'     => 'text',
					'default'  => 'set-default-payment-method',
					'desc_tip' => true,
				),

				array(
					'type' => 'sectionend',
					'id'   => 'checkout_endpoint_options',
				),

				array(
					'title' => __( 'Account endpoints', 'fincommerce' ),
					'type'  => 'title',
					'desc'  => __( 'Endpoints are appended to your page URLs to handle specific actions on the accounts pages. They should be unique and can be left blank to disable the endpoint.', 'fincommerce' ),
					'id'    => 'account_endpoint_options',
				),

				array(
					'title'    => __( 'Orders', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the "My account &rarr; Orders" page.', 'fincommerce' ),
					'id'       => 'fincommerce_myaccount_orders_endpoint',
					'type'     => 'text',
					'default'  => 'orders',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'View order', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the "My account &rarr; View order" page.', 'fincommerce' ),
					'id'       => 'fincommerce_myaccount_view_order_endpoint',
					'type'     => 'text',
					'default'  => 'view-order',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Downloads', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the "My account &rarr; Downloads" page.', 'fincommerce' ),
					'id'       => 'fincommerce_myaccount_downloads_endpoint',
					'type'     => 'text',
					'default'  => 'downloads',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Edit account', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the "My account &rarr; Edit account" page.', 'fincommerce' ),
					'id'       => 'fincommerce_myaccount_edit_account_endpoint',
					'type'     => 'text',
					'default'  => 'edit-account',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Addresses', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the "My account &rarr; Addresses" page.', 'fincommerce' ),
					'id'       => 'fincommerce_myaccount_edit_address_endpoint',
					'type'     => 'text',
					'default'  => 'edit-address',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Payment methods', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the "My account &rarr; Payment methods" page.', 'fincommerce' ),
					'id'       => 'fincommerce_myaccount_payment_methods_endpoint',
					'type'     => 'text',
					'default'  => 'payment-methods',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Lost password', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the "My account &rarr; Lost password" page.', 'fincommerce' ),
					'id'       => 'fincommerce_myaccount_lost_password_endpoint',
					'type'     => 'text',
					'default'  => 'lost-password',
					'desc_tip' => true,
				),

				array(
					'title'    => __( 'Logout', 'fincommerce' ),
					'desc'     => __( 'Endpoint for the triggering logout. You can add this to your menus via a custom link: yoursite.com/?customer-logout=true', 'fincommerce' ),
					'id'       => 'fincommerce_logout_endpoint',
					'type'     => 'text',
					'default'  => 'customer-logout',
					'desc_tip' => true,
				),

				array(
					'type' => 'sectionend',
					'id'   => 'account_endpoint_options',
				),
			);

		$settings = apply_filters( 'fincommerce_settings_pages', $settings );

		if ( wc_site_is_https() ) {
			unset( $settings['unforce_ssl_checkout'], $settings['force_ssl_checkout'] );
		}

		return $settings;
	}

	/**
	 * Get settings for the FinCommerce.com section.
	 *
	 * @return array
	 */
	protected function get_settings_for_fincommerce_com_section() {
		$tracking_info_text = sprintf( '<a href="%s" target="_blank">%s</a>', 'https://fincommerce.com/usage-tracking', esc_html__( 'FinCommerce.com Usage Tracking Documentation', 'fincommerce' ) );

		$settings =
			array(
				array(
					'title' => esc_html__( 'Usage Tracking', 'fincommerce' ),
					'type'  => 'title',
					'id'    => 'tracking_options',
					'desc'  => __( 'Gathering usage data allows us to tailor your store setup experience, offer more relevant content, and help make FinCommerce better for everyone.', 'fincommerce' ),
				),
				array(
					'title'         => __( 'Enable tracking', 'fincommerce' ),
					'desc'          => __( 'Allow usage of FinCommerce to be tracked', 'fincommerce' ),
					/* Translators: %s URL to tracking info screen. */
					'desc_tip'      => sprintf( esc_html__( 'To opt out, leave this box unticked. Your store remains untracked, and no data will be collected. Read about what usage data is tracked at: %s.', 'fincommerce' ), $tracking_info_text ),
					'id'            => 'fincommerce_allow_tracking',
					'type'          => 'checkbox',
					'checkboxgroup' => 'start',
					'default'       => 'no',
					'autoload'      => true,
				),
				array(
					'type' => 'sectionend',
					'id'   => 'tracking_options',
				),
				array(
					'title' => esc_html__( 'Marketplace suggestions', 'fincommerce' ),
					'type'  => 'title',
					'id'    => 'marketplace_suggestions',
					'desc'  => __( 'We show contextual suggestions for official extensions that may be helpful to your store.', 'fincommerce' ),
				),
				array(
					'title'         => __( 'Show Suggestions', 'fincommerce' ),
					'desc'          => __( 'Display suggestions within FinCommerce', 'fincommerce' ),
					'desc_tip'      => esc_html__( 'Leave this box unchecked if you do not want to pull suggested extensions from FinCommerce.com.', 'fincommerce' ),
					'id'            => 'fincommerce_show_marketplace_suggestions',
					'type'          => 'checkbox',
					'checkboxgroup' => 'start',
					'default'       => 'yes',
					'autoload'      => false,
				),
				array(
					'type' => 'sectionend',
					'id'   => 'marketplace_suggestions',
				),
			);

		return apply_filters( 'fincommerce_com_integration_settings', $settings );
	}

	/**
	 * Get settings for the legacy API section.
	 *
	 * @return array
	 */
	protected function get_settings_for_legacy_api_section() {
		$legacy_api_setting_desc =
			'yes' === get_option( 'fincommerce_api_enabled' ) ?
			__( 'The legacy REST API is enabled', 'fincommerce' ) :
			__( 'The legacy REST API is NOT enabled', 'fincommerce' );

		$legacy_api_setting_tip =
			WC()->legacy_rest_api_is_available() ?
			__( 'ℹ️️ The FinCommerce Legacy REST API extension is installed and active.', 'fincommerce' ) :
			sprintf(
				/* translators: placeholders are URLs */
				__( '⚠️ The FinCommerce Legacy REST API has been moved to <a target=”_blank” href="%1$s">a dedicated extension</a>. <b><a target=”_blank” href="%2$s">Learn more about this change</a></b>', 'fincommerce' ),
				'https://wordpress.org/plugins/fincommerce-legacy-rest-api/',
				'https://developer.fincommerce.com/2023/10/03/the-legacy-rest-api-will-move-to-a-dedicated-extension-in-fincommerce-9-0/'
			);

		$settings =
			array(
				array(
					'title' => '',
					'type'  => 'title',
					'desc'  => '',
					'id'    => 'legacy_api_options',
				),
				array(
					'title'    => __( 'Legacy API', 'fincommerce' ),
					'desc'     => $legacy_api_setting_desc,
					'id'       => 'fincommerce_api_enabled',
					'type'     => 'checkbox',
					'default'  => 'no',
					'disabled' => true,
					'desc_tip' => $legacy_api_setting_tip,
				),
				array(
					'type' => 'sectionend',
					'id'   => 'legacy_api_options',
				),
			);

		return apply_filters( 'fincommerce_settings_rest_api', $settings );
	}

	/**
	 * Get settings for the Blueprint section.
	 *
	 * @return array
	 */
	protected function get_settings_for_blueprint_section() {
		$settings =
			array(
				array(
					'id'   => 'wc_settings_blueprint_slotfill',
					'type' => 'slotfill_placeholder',
				),
			);

		return $settings;
	}

	/**
	 * Form method.
	 *
	 * @deprecated 3.4.4
	 *
	 * @param  string $method Method name.
	 *
	 * @return string
	 */
	public function form_method( $method ) {
		return 'post';
	}

	/**
	 * Notices.
	 */
	private function notices() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended
		if ( isset( $_GET['section'] ) && 'webhooks' === $_GET['section'] ) {
			WC_Admin_Webhooks::notices();
		}
		if ( isset( $_GET['section'] ) && 'keys' === $_GET['section'] ) {
			WC_Admin_API_Keys::notices();
		}
		// phpcs:enable
	}

	/**
	 * Output the settings.
	 */
	public function output() {
		global $current_section, $hide_save_button;

		if ( 'blueprint' === $current_section ) {
			$hide_save_button = true;
		}

		if ( 'webhooks' === $current_section ) {
			WC_Admin_Webhooks::page_output();
		} elseif ( 'keys' === $current_section ) {
			WC_Admin_API_Keys::page_output();
		} else {
			parent::output();
		}
	}

	/**
	 * Save settings.
	 */
	public function save() {
		// phpcs:disable WordPress.Security.NonceVerification.Missing
		global $current_section;

		$prev_value = 'yes' === get_option( 'fincommerce_allow_tracking', 'no' ) ? 'yes' : 'no';
		$new_value  = isset( $_POST['fincommerce_allow_tracking'] ) && ( 'yes' === $_POST['fincommerce_allow_tracking'] || '1' === $_POST['fincommerce_allow_tracking'] ) ? 'yes' : 'no';

		if ( apply_filters( 'fincommerce_rest_api_valid_to_save', ! in_array( $current_section, array( 'keys', 'webhooks' ), true ) ) ) {
			// Prevent the T&Cs and checkout page from being set to the same page.
			if ( isset( $_POST['fincommerce_terms_page_id'], $_POST['fincommerce_checkout_page_id'] ) && $_POST['fincommerce_terms_page_id'] === $_POST['fincommerce_checkout_page_id'] ) {
				$_POST['fincommerce_terms_page_id'] = '';
			}

			// Prevent the Cart, checkout and my account page from being set to the same page.
			if ( isset( $_POST['fincommerce_cart_page_id'], $_POST['fincommerce_checkout_page_id'], $_POST['fincommerce_myaccount_page_id'] ) ) {
				if ( $_POST['fincommerce_cart_page_id'] === $_POST['fincommerce_checkout_page_id'] ) {
					$_POST['fincommerce_checkout_page_id'] = '';
				}
				if ( $_POST['fincommerce_cart_page_id'] === $_POST['fincommerce_myaccount_page_id'] ) {
					$_POST['fincommerce_myaccount_page_id'] = '';
				}
				if ( $_POST['fincommerce_checkout_page_id'] === $_POST['fincommerce_myaccount_page_id'] ) {
					$_POST['fincommerce_myaccount_page_id'] = '';
				}
			}

			if ( class_exists( 'WC_Tracks' ) && 'no' === $new_value && 'yes' === $prev_value ) {
				WC_Tracks::track_fincommerce_allow_tracking_toggled( $prev_value, $new_value, 'settings' );
			}

			$this->save_settings_for_current_section();
			$this->do_update_options_action();

			if ( class_exists( 'WC_Tracks' ) && 'yes' === $new_value && 'no' === $prev_value ) {
				WC_Tracks::track_fincommerce_allow_tracking_toggled( $prev_value, $new_value, 'settings' );
			}
		}
		// phpcs:enable
	}
}

// phpcs:disable Generic.Files.OneObjectStructurePerFile.MultipleFound, Generic.Commenting.Todo.CommentFound
/**
 * WC_Settings_Rest_API class.
 *
 * @deprecated 3.4 in favour of WC_Settings_Advanced.
 */
class WC_Settings_Rest_API extends WC_Settings_Advanced {
}

return new WC_Settings_Advanced();
// phpcs:enable
