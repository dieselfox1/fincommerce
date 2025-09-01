<?php

/**
 * Class WC_Settings_Tracking_Test.
 */
class WC_Settings_Tracking_Test extends \WC_Unit_Test_Case {
	/**
	 * Set up test
	 *
	 * @return void
	 */
	public function setUp(): void {
		include_once WC_ABSPATH . 'includes/tracks/events/class-wc-settings-tracking.php';
		update_option( 'fincommerce_allow_tracking', 'yes' );
		$settings_tracking = new WC_Settings_Tracking();
		$settings_tracking->init();
		parent::setUp();
	}

	/**
	 * Teardown test
	 *
	 * @return void
	 */
	public function tearDown(): void {
		update_option( 'fincommerce_allow_tracking', 'no' );
		parent::tearDown();
	}

	/**
	 * Test wcadmin_settings_view tracks event
	 */
	public function test_settings_view() {
		// phpcs:ignore FinCommerce.Commenting.CommentHooks.MissingHookComment
		do_action( 'fincommerce_settings_page_init' );
		$this->assertRecordedTracksEvent( 'wcadmin_settings_view' );
	}
	/**
	 * Test wcadmin_settings_change tracks event
	 */
	public function test_settings_change() {
		// phpcs:ignore FinCommerce.Commenting.CommentHooks.MissingHookComment
		do_action( 'fincommerce_update_option', array( 'id' => 'some_option' ) );
		// phpcs:ignore FinCommerce.Commenting.CommentHooks.MissingHookComment
		do_action( 'update_option', 'some_option', 'old_value', 'new_value' );
		// phpcs:ignore FinCommerce.Commenting.CommentHooks.MissingHookComment
		do_action( 'fincommerce_update_options' );
		$this->assertRecordedTracksEvent( 'wcadmin_settings_change' );
	}
}
