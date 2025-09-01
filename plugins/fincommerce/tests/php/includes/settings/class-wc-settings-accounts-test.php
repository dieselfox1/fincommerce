<?php
/**
 * Class WC_Settings_Accounts_Test file.
 *
 * @package FinCommerce\Tests\Settings
 */

use Automattic\FinCommerce\Testing\Tools\CodeHacking\Hacks\FunctionsMockerHack;

require_once __DIR__ . '/class-wc-settings-unit-test-case.php';

/**
 * Unit tests for the WC_Settings_General class.
 */
class WC_Settings_Accounts_Test extends WC_Settings_Unit_Test_Case {

	/**
	 * Test for get_settings (triggers the fincommerce_account_settings filter).
	 */
	public function test_get_settings__triggers_filter() {
		$actual_settings_via_filter = null;

		add_filter(
			'fincommerce_account_settings',
			function ( $settings ) use ( &$actual_settings_via_filter ) {
				$actual_settings_via_filter = $settings;
				return $settings;
			},
			10,
			1
		);

		$sut = new WC_Settings_Accounts();

		$actual_settings_returned = $sut->get_settings_for_section( '' );
		remove_all_filters( 'fincommerce_account_settings' );

		$this->assertSame( $actual_settings_returned, $actual_settings_via_filter );
	}

	/**
	 * Test for get_settings (all settings are present).
	 */
	public function test_get_settings__all_settings_are_present() {
		$sut = new WC_Settings_Accounts();

		$settings              = $sut->get_settings_for_section( '' );
		$setting_ids_and_types = $this->get_ids_and_types( $settings );

		$expected = array(
			'account_registration_options'                 => array( 'title', 'sectionend' ),
			'fincommerce_enable_guest_checkout'            => 'checkbox',
			'fincommerce_enable_checkout_login_reminder'   => 'checkbox',
			'fincommerce_enable_signup_and_login_from_checkout' => 'checkbox',
			'fincommerce_enable_myaccount_registration'    => 'checkbox',
			'fincommerce_registration_generate_username'   => 'checkbox',
			'fincommerce_registration_generate_password'   => 'checkbox',
			'fincommerce_erasure_request_removes_order_data' => 'checkbox',
			'fincommerce_erasure_request_removes_download_data' => 'checkbox',
			'fincommerce_allow_bulk_remove_personal_data'  => 'checkbox',
			'privacy_policy_options'                       => array( 'title', 'sectionend' ),
			'fincommerce_registration_privacy_policy_text' => 'textarea',
			'fincommerce_checkout_privacy_policy_text'     => 'textarea',
			'personal_data_retention'                      => array( 'title', 'sectionend' ),
			'fincommerce_delete_inactive_accounts'         => 'relative_date_selector',
			'fincommerce_trash_pending_orders'             => 'relative_date_selector',
			'fincommerce_trash_failed_orders'              => 'relative_date_selector',
			'fincommerce_trash_cancelled_orders'           => 'relative_date_selector',
			'fincommerce_anonymize_refunded_orders'        => 'relative_date_selector',
			'fincommerce_anonymize_completed_orders'       => 'relative_date_selector',
		);

		// The delayed account creation setting is conditionally shown based on checkout block configuration.
		$is_block_theme = wp_is_block_theme();
		if ( $is_block_theme ) {
			$expected['fincommerce_enable_delayed_account_creation'] = 'checkbox';
		}

		$this->assertEquals( $expected, $setting_ids_and_types );
	}

	/**
	 * Data provider for test_linked_text_for_erasure_request_settings.
	 *
	 * @return array[]
	 */
	public function data_provider_for_test_linked_text_for_erasure_request_settings() {
		return array(
			array(
				false,
				null,
				'When handling an account erasure request, should personal data within orders be retained or removed?',
				'When handling an account erasure request, should access to downloadable files be revoked and download logs cleared?',
			),
			array(
				true,
				'5.2',
				'When handling an <a href="http://' . WP_TESTS_DOMAIN . '/wp-admin/tools.php?page=remove_personal_data">account erasure request</a>, should personal data within orders be retained or removed?',
				'When handling an <a href="http://' . WP_TESTS_DOMAIN . '/wp-admin/tools.php?page=remove_personal_data">account erasure request</a>, should access to downloadable files be revoked and download logs cleared?',
			),
			array(
				true,
				'5.3',
				'When handling an <a href="http://' . WP_TESTS_DOMAIN . '/wp-admin/erase-personal-data.php">account erasure request</a>, should personal data within orders be retained or removed?',
				'When handling an <a href="http://' . WP_TESTS_DOMAIN . '/wp-admin/erase-personal-data.php">account erasure request</a>, should access to downloadable files be revoked and download logs cleared?',
			),
		);
	}

	/**
	 * Test that the "account erasure request" text is linked or not as appropriate for descriptions of account erasure request related options.
	 *
	 * @dataProvider data_provider_for_test_linked_text_for_erasure_request_settings
	 *
	 * @param bool   $current_user_can_manage_privacy_options Can the current user manage privacy options?.
	 * @param string $blog_version Current blog version.
	 * @param string $expected_order_erasure_text Expected description for the remove order data option.
	 * @param string $expected_downloads_erasure_text Expected description for the remove downloads data option.
	 */
	public function test_linked_text_for_erasure_request_settings( $current_user_can_manage_privacy_options, $blog_version, $expected_order_erasure_text, $expected_downloads_erasure_text ) {
		FunctionsMockerHack::add_function_mocks(
			array(
				'current_user_can' => function ( $capability, ...$args ) use ( $current_user_can_manage_privacy_options ) {
					return 'manage_privacy_options' === $capability ?
						$current_user_can_manage_privacy_options :
						current_user_can( $capability, ...$args );
				},
				'get_bloginfo'     => function ( $show = '', $filter = 'raw' ) use ( $blog_version ) {
					return 'version' === $show ?
						$blog_version :
						get_bloginfo( $show, $filter );
				},
			)
		);

		$sut = new WC_Settings_Accounts();

		$settings = $sut->get_settings_for_section( '' );

		$order_data_removal_setting = $this->setting_by_id( $settings, 'fincommerce_erasure_request_removes_order_data' );
		$actual_desc                = $order_data_removal_setting['desc_tip'];
		$this->assertEquals( $expected_order_erasure_text, $actual_desc );

		$downloads_data_removal_setting = $this->setting_by_id( $settings, 'fincommerce_erasure_request_removes_download_data' );
		$actual_desc                    = $downloads_data_removal_setting['desc_tip'];
		$this->assertEquals( $expected_downloads_erasure_text, $actual_desc );
	}
}
