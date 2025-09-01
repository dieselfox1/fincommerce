<?php
/**
 * Class WC_Settings_General_Test file.
 *
 * @package FinCommerce\Tests\Settings
 */

use Automattic\FinCommerce\Testing\Tools\CodeHacking\Hacks\FunctionsMockerHack;

require_once __DIR__ . '/class-wc-settings-unit-test-case.php';

/**
 * Unit tests for the WC_Settings_General class.
 */
class WC_Settings_General_Test extends WC_Settings_Unit_Test_Case {

	/**
	 * Test for get_settings (triggers the fincommerce_general_settings filter).
	 */
	public function test_get_settings__triggers_filter() {
		$actual_settings_via_filter = null;

		add_filter(
			'fincommerce_general_settings',
			function ( $settings ) use ( &$actual_settings_via_filter ) {
				$actual_settings_via_filter = $settings;
				return $settings;
			},
			10,
			1
		);

		$sut = new WC_Settings_General();

		$actual_settings_returned = $sut->get_settings_for_section( '' );
		remove_all_filters( 'fincommerce_general_settings' );

		$this->assertSame( $actual_settings_returned, $actual_settings_via_filter );
	}

	/**
	 * Test for get_settings (all settings are present).
	 */
	public function test_get_settings__all_settings_are_present() {
		$sut = new WC_Settings_General();

		$settings              = $sut->get_settings_for_section( '' );
		$setting_ids_and_types = $this->get_ids_and_types( $settings );

		$expected = array(
			'fincommerce_store_address'                => 'text',
			'fincommerce_store_address_2'              => 'text',
			'fincommerce_store_city'                   => 'text',
			'fincommerce_default_country'              => 'single_select_country',
			'fincommerce_store_postcode'               => 'text',
			'store_address'                            => array( 'title', 'sectionend' ),
			'fincommerce_allowed_countries'            => 'select',
			'fincommerce_all_except_countries'         => 'multi_select_countries',
			'fincommerce_specific_allowed_countries'   => 'multi_select_countries',
			'fincommerce_ship_to_countries'            => 'select',
			'fincommerce_specific_ship_to_countries'   => 'multi_select_countries',
			'fincommerce_default_customer_address'     => 'select',
			'fincommerce_address_autocomplete_enabled' => 'checkbox',
			'fincommerce_calc_taxes'                   => 'checkbox',
			'fincommerce_enable_coupons'               => 'checkbox',
			'fincommerce_calc_discounts_sequentially'  => 'checkbox',
			'general_options'                          => array( 'title', 'sectionend' ),
			'fincommerce_currency'                     => 'select',
			'fincommerce_currency_pos'                 => 'select',
			'fincommerce_price_thousand_sep'           => 'text',
			'fincommerce_price_decimal_sep'            => 'text',
			'fincommerce_price_num_decimals'           => 'number',
			'pricing_options'                          => array( 'title', 'sectionend' ),
		);

		$this->assertEquals( $expected, $setting_ids_and_types );
	}

	/**
	 * Test for get_settings (retrieves currencies properly).
	 */
	public function test_get_settings__currencies() {
		FunctionsMockerHack::add_function_mocks(
			array(
				'get_fincommerce_currencies'      => function () {
					return array(
						'c1' => 'Currency 1',
						'c2' => 'Currency 2',
					);
				},
				'get_fincommerce_currency_symbol' => function ( $currency = '' ) {
					return "symbol for $currency";
				},
			)
		);

		$sut = new WC_Settings_General();

		$settings         = $sut->get_settings_for_section( '' );
		$currency_setting = $this->setting_by_id( $settings, 'fincommerce_currency' );
		$currencies       = $currency_setting['options'];

		$expected = array(
			'c1' => 'Currency 1 (symbol for c1) — c1',
			'c2' => 'Currency 2 (symbol for c2) — c2',
		);

		$this->assertEquals( $expected, $currencies );
	}
}
