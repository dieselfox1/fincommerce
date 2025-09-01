<?php

namespace Automattic\FinCommerce\Tests\Admin\ProductBlockEditor;

use WC_Unit_Test_Case;
use Automattic\FinCommerce\Admin\Features\ProductBlockEditor\BlockRegistry;

/**
 * Tests for the BlockRegistry class.
 */
class BlockRegistryTest extends WC_Unit_Test_Case {
	/**
	 * Setup test case.
	 */
	public function setUp(): void {
		$this->markTestSkipped( 'Skipping until we can figure out why these tests are so flaky.' );
	}

	/**
	 * Test that generic blocks are registered.
	 */
	public function test_generic_blocks_registered() {
		$block_registry = BlockRegistry::get_instance();

		$this->assertTrue( $block_registry->is_registered( 'fincommerce/conditional' ), 'Conditional component not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-checkbox-field' ), 'Checkbox field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-collapsible' ), 'Collapsible component not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-radio-field' ), 'Radio field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-pricing-field' ), 'Pricing field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-section' ), 'Section component not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-subsection' ), 'Subsection component not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-tab' ), 'Tab component not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-toggle-field' ), 'Toggle field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-taxonomy-field' ), 'Taxonomy field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-text-field' ), 'Text field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-number-field' ), 'Number field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-select-field' ), 'Select field not registered.' );
	}

	/**
	 * Test that product fields blocks are registered.
	 */
	public function test_product_fields_blocks_registered() {
		$block_registry = BlockRegistry::get_instance();

		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-catalog-visibility-field' ), 'Catalog visibility field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-custom-fields' ), 'Custom fields not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-custom-fields-toggle-field' ), 'Custom fields toggle field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-description-field' ), 'Description field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-downloads-field' ), 'Downloads field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-images-field' ), 'Images field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-inventory-email-field' ), 'Inventory email field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-sku-field' ), 'SKU field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-name-field' ), 'Name field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-regular-price-field' ), 'Regular price not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-schedule-sale-fields' ), 'Schedule sale fields not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-shipping-class-field' ), 'Shipping class field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-shipping-dimensions-fields' ), 'Shipping dimensions not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-summary-field' ), 'Summary field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-tag-field' ), 'Tag field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-inventory-quantity-field' ), 'Inventory quantity field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-variation-items-field' ), 'Variation items field not registered.' );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-password-field', 'Password field not registered.' ) );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-list-field', 'List field not registered.' ) );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-has-variations-notice', 'Has variation notice not registered.' ) );
		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-single-variation-notice', 'Single variation notice not registered.' ) );
	}

	/**
	 * Test registering a block type.
	 */
	public function test_register_block_type_from_metadata() {
		$block_registry = BlockRegistry::get_instance();

		$this->assertFalse( $block_registry->is_registered( 'fincommerce-test/test-block' ), 'Block type already registered.' );

		$block_type = $block_registry->register_block_type_from_metadata( trailingslashit( __DIR__ ) . 'test-block' );

		$this->assertTrue( $block_registry->is_registered( 'fincommerce-test/test-block' ), 'Block type not registered.' );

		$this->assertInstanceOf( \WP_Block_Type::class, $block_type, 'Block type not an instance of WP_Block_Type.' );

		// Make sure basic properties are set.
		$this->assertEquals( 'fincommerce-test/test-block', $block_type->name, 'Block type name not correct.' );
		$this->assertEquals( 'Test Block', $block_type->title, 'Block type title not correct.' );

		// Make sure defined attributes are set.
		$this->assertArrayHasKey( 'label', $block_type->attributes, 'Block type missing label attribute.' );

		// Make sure augmented template attributes are set.
		$this->assertArrayHasKey( '_templateBlockId', $block_type->attributes, 'Block type missing _templateBlockId attribute.' );
		$this->assertArrayHasKey( '_templateBlockOrder', $block_type->attributes, 'Block type missing _templateBlockOrder attribute.' );
		$this->assertArrayHasKey( '_templateBlockHideConditions', $block_type->attributes, 'Block type missing _templateBlockHideConditions attribute.' );
		$this->assertArrayHasKey( '_templateBlockDisableConditions', $block_type->attributes, 'Block type missing _templateBlockDisableConditions attribute.' );
		$this->assertArrayHasKey( 'disabled', $block_type->attributes, 'Block type missing disabled attribute.' );

		// Make sure usesContext is set.
		$this->assertContains( 'postType', $block_type->uses_context, 'Block type uses_context missing postType.' );
	}

	/**
	 * Test unregistering a block type.
	 */
	public function test_unregister() {
		$block_registry = BlockRegistry::get_instance();

		$this->assertTrue( $block_registry->is_registered( 'fincommerce/product-checkbox-field' ), 'Checkbox field not registered.' );

		$block_registry->unregister( 'fincommerce/product-checkbox-field' );

		$this->assertFalse( $block_registry->is_registered( 'fincommerce/product-checkbox-field' ), 'Checkbox field still registered.' );
	}
}
