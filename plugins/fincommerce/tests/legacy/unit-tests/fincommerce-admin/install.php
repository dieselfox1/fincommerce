<?php
/**
 * Install tests
 *
 * @package FinCommerce\Admin\Tests
 */

/**
 * Tests for \Automattic\FinCommerce\Internal\Admin\Install class.
 */
class WC_Admin_Tests_Install extends WP_UnitTestCase {

	const VERSION_OPTION = 'fincommerce_admin_version';

	/**
	 * @var null|string Initial installed version number.
	 */
	protected static $initial_installed_version_number = null;

	/**
	 * Setup
	 */
	public static function setUpBeforeClass(): void {
		parent::setUpBeforeClass();
		self::$initial_installed_version_number = WC()->version;
	}

	/**
	 * Integration test for database table creation.
	 *
	 * @group database
	 */
	public function test_create_tables() {
		global $wpdb;

		// Remove the Test Suite’s use of temporary tables https://wordpress.stackexchange.com/a/220308.
		remove_filter( 'query', array( $this, '_create_temporary_tables' ) );
		remove_filter( 'query', array( $this, '_drop_temporary_tables' ) );

		// List of tables created by Install::create_tables.
		$tables = array(
			"{$wpdb->prefix}wc_order_stats",
			"{$wpdb->prefix}wc_order_product_lookup",
			"{$wpdb->prefix}wc_order_tax_lookup",
			"{$wpdb->prefix}wc_order_coupon_lookup",
			"{$wpdb->prefix}wc_admin_notes",
			"{$wpdb->prefix}wc_admin_note_actions",
			"{$wpdb->prefix}wc_customer_lookup",
			"{$wpdb->prefix}wc_category_lookup",
		);

		// Remove any existing tables in the environment.
		$query = 'DROP TABLE IF EXISTS ' . implode( ',', $tables );
		$wpdb->query( $query ); // phpcs:ignore.

		WC_Install::create_tables();
		$result = $wpdb->get_col( "SHOW TABLES LIKE '{$wpdb->prefix}%'" );

		// Check all the tables exist.
		foreach ( $tables as $table ) {
			$this->assertContains( $table, $result );
		}
	}

	/**
	 * Ensure that a DB version callback is defined when there are updates.
	 */
	public function test_db_update_callbacks_exist() {
		$all_callbacks = \WC_Install::get_db_update_callbacks();

		foreach ( $all_callbacks as $version => $version_callbacks ) {
			// Verify all callbacks have been defined.
			foreach ( $version_callbacks as $version_callback ) {
				if ( strpos( $version_callback, 'wc_admin_update' ) === 0 ) {
					$this->assertTrue(
						function_exists( $version_callback ),
						"Callback {$version_callback}() is not defined."
					);
				}
			}
		}
	}

	/**
	 * Data provider that returns DB Update version string and # of expected pending jobs.
	 *
	 * @return array[]
	 */
	public function db_update_version_provider() {
		return array(
			// [DB Update version string, # of expected pending jobs]
			array( '3.9.0', 35 ),
			array( '4.0.0', 28 ),
			array( '4.4.0', 24 ),
			array( '4.5.0', 22 ),
			array( '5.0.0', 18 ),
			array( '5.6.0', 16 ),
			array( '6.0.0', 9 ),
			array( '6.3.0', 6 ),
			array( '6.4.0', 3 ),
			array( '6.5.0', 2 ),
			array( '6.6.0', 1 ),
			array( '6.7.0', 0 ),
		);
	}

	/**
	 * Test missed DB version number update.
	 * See: https:// github.com/dieselfox1/fincommerce-admin/issues/5058
	 */
	public function test_missed_version_number_update() {
		$this->markTestSkipped( 'We no longer update FinCommerce Admin versions' );
		$old_version = '1.6.0'; // This should get updated to later versions as we add more migrations.

		// Simulate an upgrade from an older version.
		update_option( self::VERSION_OPTION, '1.6.0' );
		WC_Install::install();
		WC_Helper_Queue::run_all_pending();

		// Simulate a collision/failure in version updating.
		update_option( self::VERSION_OPTION, '1.6.0' );

		// The next update check should force update the skipped version number.
		WC_Install::install();
		$this->assertTrue( version_compare( $old_version, get_option( self::VERSION_OPTION ), '<' ) );

		// The following update check should bump the version to the current (no migrations left).
		WC_Install::install();
		$this->assertEquals( get_option( self::VERSION_OPTION ), WC_ADMIN_VERSION_NUMBER );
	}

	/**
	 * Test the following options are created.
	 *
	 * - fincommerce_admin_install_timestamp
	 * - WC_Install::NEWLY_INSTALLED_OPTION
	 *
	 * @return void
	 */
	public function test_options_are_set() {
		delete_transient( 'wc_installing' );
		WC_Install::install();

		$options = array(
			'fincommerce_admin_install_timestamp',
			WC_Install::NEWLY_INSTALLED_OPTION,
		);

		foreach ( $options as $option ) {
			$this->assertNotFalse( get_option( $option ) );
		}
	}

	/**
	 * Test fincommerce_admin_installed action.
	 * @return void
	 */
	public function test_fincommerce_admin_installed_action() {
		delete_transient( 'wc_installing' );
		WC_Install::install();
		$this->assertTrue( did_action( 'fincommerce_admin_installed' ) > 0 );
	}

	/**
	 * Test fincommerce_updated action gets fired.
	 *
	 * @return void
	 */
	public function test_fincommerce_updated_action() {
		$versions     = array_keys( WC_Install::get_db_update_callbacks() );
		$prev_version = $versions[ count( $versions ) - 2 ];
		update_option( 'fincommerce_version', $prev_version );
		WC_Install::check_version();
		$this->assertTrue( did_action( 'fincommerce_updated' ) > 0 );
	}

	/**
	 * Test fincommerce_newly_installed action gets fired and the option is set to 'no'.
	 *
	 * @return void
	 */
	public function test_fincommerce_newly_installed_action() {
		update_option( WC_Install::NEWLY_INSTALLED_OPTION, 'yes' );

		// Call twice to ensure `fincommerce_newly_installed` is only triggered once.
		WC_Install::newly_installed();
		WC_Install::newly_installed();

		$this->assertTrue( 1 === did_action( 'fincommerce_newly_installed' ) );
		$this->assertEquals( get_option( WC_Install::NEWLY_INSTALLED_OPTION ), 'no' );
		$this->assertEquals( get_option( WC_Install::INITIAL_INSTALLED_VERSION ), self::$initial_installed_version_number );
	}

	/**
	 * Test migrate_options();
	 * @return void
	 */
	public function test_migrate_options() {
		delete_transient( 'wc_installing' );
		WC_Install::install();
		$this->assertTrue( defined( 'WC_ADMIN_MIGRATING_OPTIONS' ) );
		$migrated_options = array(
			'fincommerce_onboarding_profile'           => 'wc_onboarding_profile',
			'fincommerce_admin_install_timestamp'      => 'wc_admin_install_timestamp',
			'fincommerce_onboarding_opt_in'            => 'wc_onboarding_opt_in',
			'fincommerce_admin_import_stats'           => 'wc_admin_import_stats',
			'fincommerce_admin_version'                => 'wc_admin_version',
			'fincommerce_admin_last_orders_milestone'  => 'wc_admin_last_orders_milestone',
			'fincommerce_admin-wc-helper-last-refresh' => 'wc-admin-wc-helper-last-refresh',
			'fincommerce_admin_report_export_status'   => 'wc_admin_report_export_status',
			'fincommerce_task_list_complete'           => 'fincommerce_task_list_complete',
			'fincommerce_task_list_hidden'             => 'fincommerce_task_list_hidden',
			'fincommerce_extended_task_list_complete'  => 'fincommerce_extended_task_list_complete',
			'fincommerce_extended_task_list_hidden'    => 'fincommerce_extended_task_list_hidden',
		);

		foreach ( $migrated_options as $new_option => $old_option ) {
			$old_option_value = get_option( $old_option );
			if ( false === $old_option_value ) {
				continue;
			}
			$this->assertNotFalse( get_option( $new_option ), $new_option );
		}
	}
}
