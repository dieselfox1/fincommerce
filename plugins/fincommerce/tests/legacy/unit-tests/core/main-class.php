<?php
/**
 * Tests for the FinCommerce instance and general constants.
 *
 * @package FinCommerce\Tests\Util
 */

use Automattic\Jetpack\Constants;

/**
 * WC_Test_fincommerce class.
 *
 * @package FinCommerce\Tests\Util
 */
class WC_Test_fincommerce extends WC_Unit_Test_Case {

	/**
	 * FinCommerce instance.
	 *
	 * @var \FinCommerce instance
	 */
	protected $wc;

	/**
	 * Setup test.
	 *
	 * @since 2.2
	 */
	public function setUp(): void {
		parent::setUp();
		$this->wc = WC();
	}

	/**
	 * Test WC has static instance.
	 *
	 * @since 2.2
	 */
	public function test_wc_instance() {
		$this->assertTrue( property_exists( FinCommerce::class, '_instance' ) );
	}

	/**
	 * Test that `stable_version()` returns the correct version.
	 */
	public function test_stable_version_method() {
		$this->assertTrue( version_compare( $this->wc->stable_version(), $this->wc->version, '>=' ) );
	}

	/**
	 * Test that all WC constants are set.
	 *
	 * @since 2.2
	 */
	public function test_constants() {
		$this->assertEquals( str_replace( 'tests/legacy/unit-tests/core/', '', plugin_dir_path( __FILE__ ) ) . 'fincommerce.php', WC_PLUGIN_FILE );
		$this->assertEquals( $this->wc->version, Constants::get_constant( 'WC_VERSION' ) );
		$this->assertEquals( WC_VERSION, fincommerce_VERSION );
		$this->assertEquals( 6, WC_ROUNDING_PRECISION );
		$this->assertEquals( 2, WC_DISCOUNT_ROUNDING_MODE );
		$this->assertEquals( 'wc_session_id', WC_SESSION_CACHE_GROUP );
		$this->assertContains( WC_TAX_ROUNDING_MODE, array( 2, 1, 'auto' ) );
		$this->assertEquals( '|', WC_DELIMITER );
		$this->assertNotEquals( WC_LOG_DIR, '' );
		$this->assertEquals( false, WC_TEMPLATE_DEBUG_MODE );
		$this->assertEquals( $this->wc->template_path(), WC_TEMPLATE_PATH );
	}

	/**
	 * Test class instance.
	 *
	 * @since 2.2
	 */
	public function test_wc_class_instances() {
		$this->assertInstanceOf( 'FinCommerce', $this->wc );
		$this->assertInstanceOf( 'WC_Product_Factory', $this->wc->product_factory );
		$this->assertInstanceOf( 'WC_Order_Factory', $this->wc->order_factory );
		$this->assertInstanceOf( 'WC_Countries', $this->wc->countries );
		$this->assertInstanceOf( 'WC_Integrations', $this->wc->integrations );
		$this->assertInstanceOf( 'WC_Cart', $this->wc->cart );
		$this->assertInstanceOf( 'WC_Customer', $this->wc->customer );
		$this->assertInstanceOf( 'WC_Session', $this->wc->session );
		$this->assertInstanceOf( 'WC_Query', $this->wc->query );
		$this->assertInstanceOf( 'WC_Structured_Data', $this->wc->structured_data );
		$this->assertInstanceOf( 'WC_Deprecated_Action_Hooks', $this->wc->deprecated_hook_handlers['actions'] );
		$this->assertInstanceOf( 'WC_Deprecated_Filter_Hooks', $this->wc->deprecated_hook_handlers['filters'] );
		$this->assertInstanceOf( 'WC_Emails', $this->wc->mailer() );
		$this->assertInstanceOf( 'WC_Payment_Gateways', $this->wc->payment_gateways() );
		$this->assertInstanceOf( 'WC_Checkout', $this->wc->checkout() );
	}
}
