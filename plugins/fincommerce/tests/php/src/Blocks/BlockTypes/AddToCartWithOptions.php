<?php

declare( strict_types = 1 );

namespace Automattic\FinCommerce\Tests\Blocks\BlockTypes;

use Automattic\FinCommerce\Enums\ProductStockStatus;
use Automattic\FinCommerce\Tests\Blocks\Utils\WC_Product_Custom;
use Automattic\FinCommerce\Tests\Blocks\Helpers\FixtureData;
use Automattic\FinCommerce\Tests\Blocks\Mocks\AddToCartWithOptionsMock;
use Automattic\FinCommerce\Tests\Blocks\Mocks\AddToCartWithOptionsQuantitySelectorMock;
use Automattic\FinCommerce\Tests\Blocks\Mocks\AddToCartWithOptionsGroupedProductSelectorMock;
use Automattic\FinCommerce\Tests\Blocks\Mocks\AddToCartWithOptionsGroupedProductItemMock;
use Automattic\FinCommerce\Tests\Blocks\Mocks\AddToCartWithOptionsGroupedProductItemSelectorMock;
use Automattic\FinCommerce\Tests\Blocks\Mocks\AddToCartWithOptionsVariationSelectorMock;
use Automattic\FinCommerce\Tests\Blocks\Mocks\AddToCartWithOptionsVariationSelectorAttributeMock;
use Automattic\FinCommerce\Tests\Blocks\Mocks\AddToCartWithOptionsVariationSelectorAttributeNameMock;
use Automattic\FinCommerce\Tests\Blocks\Mocks\AddToCartWithOptionsVariationSelectorAttributeOptionsMock;

/**
 * Tests for the AddToCartWithOptions block type
 */
class AddToCartWithOptions extends \WP_UnitTestCase {

	/**
	 * Tracks whether blocks have been registered.
	 *
	 * @var bool
	 */
	protected static $are_blocks_registered = false;

	/**
	 * Initiate the mock object.
	 */
	protected function setUp(): void {
		parent::setUp();

		if ( ! self::$are_blocks_registered ) {
			// We need to register the blocks after set up. They are no registered
			// on `init` because `init` is called with a classic theme.
			new AddToCartWithOptionsMock();
			new AddToCartWithOptionsQuantitySelectorMock();
			new AddToCartWithOptionsGroupedProductSelectorMock();
			new AddToCartWithOptionsGroupedProductItemMock();
			new AddToCartWithOptionsGroupedProductItemSelectorMock();
			new AddToCartWithOptionsVariationSelectorMock();
			new AddToCartWithOptionsVariationSelectorAttributeMock();
			new AddToCartWithOptionsVariationSelectorAttributeNameMock();
			new AddToCartWithOptionsVariationSelectorAttributeOptionsMock();

			self::$are_blocks_registered = true;
		}
	}

	/**
	 * Print custom product type add to cart markup.
	 *
	 * Outputs the HTML markup for the custom product type add to cart form.
	 */
	public function print_custom_product_type_add_to_cart_markup() {
		echo 'Custom Product Type Add to Cart Form';
	}

	/**
	 * Hook into the add to cart action.
	 *
	 * Outputs a test message when the add to cart action is triggered.
	 * Used for testing that hooks are properly called during add to cart.
	 */
	public function hook_into_add_to_cart_action() {
		echo 'Hook into add to cart action';
	}

	/**
	 * Hook into the add to cart button action.
	 *
	 * Outputs a test message when the `fincommerce_before_add_to_cart_button` action is triggered.
	 * Used for testing that hooks are properly called during add to cart.
	 */
	public function hook_into_add_to_cart_button_action() {
		echo 'Hook into add to cart button action';
	}

	/**
	 * Tests that the correct content is rendered for each product type.
	 */
	public function test_product_type_add_to_cart_render() {
		add_action( 'fincommerce_custom_add_to_cart', array( $this, 'print_custom_product_type_add_to_cart_markup' ) );

		global $product;
		$product = new \WC_Product_Simple();
		$product->set_regular_price( 10 );
		$product_id = $product->save();
		$markup     = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		// Single Products contain the Add to Cart button and the quantity selector blocks.
		$this->assertStringContainsString( 'wp-block-fincommerce-product-button', $markup, 'The Simple Product Add to Cart + Options contains the product button block.' );
		$this->assertStringContainsString( 'Add to cart', $markup, 'The Simple Product Add to Cart Button reads "Add to cart".' );
		$this->assertStringContainsString( 'fincommerce/add-to-cart-with-options-quantity-selector', $markup, 'The Simple Product Add to Cart + Options contains the quantity selector block.' );

		$product    = new \WC_Product_External();
		$product_id = $product->save();
		$markup     = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		// External Products contain the Add to Cart button block but do not contain the quantity selector block.
		$this->assertStringContainsString( 'wp-block-fincommerce-product-button', $markup, 'The External Product Add to Cart + Options contains the product button block.' );
		$this->assertStringContainsString( 'Buy product', $markup, 'The External Product Add to Cart Button reads "Buy product".' );
		$this->assertStringNotContainsString( 'fincommerce/add-to-cart-with-options-quantity-selector', $markup, 'The External Product Add to Cart + Options does not contain the quantity selector block.' );

		$product    = new WC_Product_Custom();
		$product_id = $product->save();
		$markup     = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		// Third-party product types use their own template.
		$this->assertStringContainsString( 'Custom Product Type Add to Cart Form', $markup, 'The Custom Product Type Add to Cart + Options contains the custom product type add to cart form.' );

		remove_action( 'fincommerce_custom_add_to_cart', array( $this, 'print_custom_product_type_add_to_cart_markup' ) );
	}

	/**
	 * Tests that no Add to Cart button is displayed for out of stock products and not purchasable products.
	 *
	 * Verifies that:
	 * 1. Add to Cart button is hidden for not purchasable simple products
	 * 2. Add to Cart button is visible for in-stock purchasable products
	 * 3. Add to Cart button is hidden and stock indicator shows for out of stock products
	 *
	 * @covers AddToCartWithOptions::render
	 */
	public function test_out_of_stock_product() {
		global $product;
		$product    = new \WC_Product_Simple();
		$product_id = $product->save();
		$markup     = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertStringNotContainsString( 'Add to cart', $markup, 'The Simple Product Add to Cart Button is not visible for not purchasable simple products.' );

		$product->set_regular_price( 10 );
		$product_id = $product->save();
		$markup     = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertStringContainsString( 'Add to cart', $markup, 'The Simple Product Add to Cart Button is visible for purchasable in stock products.' );

		$product->set_stock_status( ProductStockStatus::OUT_OF_STOCK );
		$product->save();
		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertStringNotContainsString( 'Add to cart', $markup, 'The Simple Product Add to Cart Button is not visible for out of stock products.' );
		$this->assertStringContainsString( 'Out of stock', $markup, 'The stock indicator is visible for out of stock products.' );
	}

	/**
	 * Tests that the  fincommerce_<product_type>_add_to_cart hooks are rendered when rendering the block.
	 */
	public function test_product_type_add_to_cart_hooks_are_rendered() {
		add_action( 'fincommerce_simple_add_to_cart', array( $this, 'hook_into_add_to_cart_action' ) );
		add_action( 'fincommerce_before_add_to_cart_button', array( $this, 'hook_into_add_to_cart_button_action' ) );

		global $product;
		$product = new \WC_Product_Simple();
		$product->set_regular_price( 10 );
		$product_id = $product->save();
		$markup     = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertStringContainsString( 'Hook into add to cart action', $markup, 'The Add to Cart + Options correctly renders the contents from the wrapper hook.' );
		$this->assertStringContainsString( 'Hook into add to cart button action', $markup, 'The Add to Cart + Options doesn\'t render the contents from the inner hooks.' );

		$product->set_stock_status( ProductStockStatus::OUT_OF_STOCK );
		$product_id = $product->save();
		$markup     = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertStringContainsString( 'Hook into add to cart action', $markup, 'The Add to Cart + Options correctly renders the contents from the wrapper hook if the product is out of stock.' );
		$this->assertStringNotContainsString( 'Hook into add to cart button action', $markup, 'The Add to Cart + Options doesn\'t render the contents from the inner hooks if the product is out of stock.' );

		remove_action( 'fincommerce_simple_add_to_cart', array( $this, 'hook_into_add_to_cart_action' ) );
		remove_action( 'fincommerce_before_add_to_cart_button', array( $this, 'hook_into_add_to_cart_button_action' ) );
	}

	/**
	 * Tests that the correct CTA is rendered in the Grouped Product Selector.
	 */
	public function test_grouped_product_selector_cta() {
		$simple_product = new \WC_Product_Simple();
		$simple_product->set_regular_price( 10 );
		$simple_product_id = $simple_product->save();
		$grouped_product   = new \WC_Product_Grouped();
		$grouped_product->set_children( array( $simple_product_id ) );
		$grouped_product_id = $grouped_product->save();

		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $grouped_product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );
		$this->assertStringContainsString( 'type="number"', $markup, 'The Grouped Product Add to Cart + Options form contains a numeric input.' );

		$simple_product->set_sold_individually( true );
		$simple_product->save();
		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $grouped_product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );
		$this->assertStringContainsString( 'type="checkbox"', $markup, 'The Grouped Product Add to Cart + Options form contains a checkbox.' );

		$simple_product->set_stock_status( ProductStockStatus::OUT_OF_STOCK );
		$simple_product->save();
		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $grouped_product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );
		$this->assertStringContainsString( 'Read more', $markup, 'The Grouped Product Add to Cart + Options form contains a button.' );
	}

	/**
	 * Tests that the quantity selector block is not visible for sold individually products and manage stock products with stock quantity <= 1.
	 */
	public function test_stepper_not_visible_for_sold_individually_products_and_manage_stock() {
		$simple_product = new \WC_Product_Simple();
		$simple_product->set_regular_price( 10 );
		$simple_product->set_sold_individually( true );
		$simple_product_id = $simple_product->save();

		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $simple_product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );
		$this->assertStringNotContainsString( 'data-block-name="fincommerce/add-to-cart-with-options-quantity-selector"', $markup, 'The Add to Cart + Options form does not contain a quantity selector block for sold individually products.' );

		$simple_product->set_sold_individually( false );
		$simple_product->set_manage_stock( true );
		$simple_product->set_stock_quantity( 1 );
		$simple_product->save();
		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $simple_product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );
		$this->assertStringNotContainsString( 'data-block-name="fincommerce/add-to-cart-with-options-quantity-selector"', $markup, 'The Add to Cart + Options form does not contain a quantity selector block for products with manage stock set to true and stock quantity set to 1.' );

		$simple_product->set_stock_quantity( 10 );
		$simple_product->save();
		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $simple_product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );
		$this->assertStringContainsString( 'data-block-name="fincommerce/add-to-cart-with-options-quantity-selector"', $markup, 'The Add to Cart + Options form contains a quantity selector block for products with manage stock set to true and stock quantity > 1.' );
	}

	/**
	 * Tests that we render a regular HTML form when an extension hooks into the form or when cart redirect is enabled.
	 *
	 * @covers AddToCartWithOptions::render
	 */
	public function test_form_fallback() {
		global $product;
		$product = new \WC_Product_Simple();
		$product->set_regular_price( 10 );
		$product_id = $product->save();

		update_option( 'fincommerce_cart_redirect_after_add', 'yes' );

		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertStringContainsString( 'action="' . $product->get_permalink() . '"', $markup, 'The form has an action that redirects to the product page when redirect after add is enabled.' );
		$this->assertStringNotContainsString( 'data-wp-on--submit', $markup, 'The form doesn\'t have an on submit event when redirect after add is enabled.' );

		update_option( 'fincommerce_cart_redirect_after_add', 'no' );

		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertStringNotContainsString( 'action="' . $product->get_permalink() . '"', $markup, 'The form doesn\'t have an action that redirects to the product page when redirect after add is disabled.' );
		$this->assertStringContainsString( 'data-wp-on--submit', $markup, 'The form has an on submit event when redirect after add is disabled.' );

		add_action( 'fincommerce_before_add_to_cart_button', array( $this, 'hook_into_add_to_cart_button_action' ) );

		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertStringContainsString( 'action="' . $product->get_permalink() . '"', $markup, 'The form has an action that redirects to the product page when an extension hooks into the form.' );
		$this->assertStringNotContainsString( 'data-wp-on--submit', $markup, 'The form doesn\'t have an on submit event when an extension hooks into the form.' );

		remove_action( 'fincommerce_before_add_to_cart_button', array( $this, 'hook_into_add_to_cart_button_action' ) );
	}

	/**
	 * Tests that the default option is set in variable products.
	 */
	public function test_variable_product_default_option_render() {
		global $product;

		$fixtures = new FixtureData();

		$product = $fixtures->get_variable_product(
			array(),
			array(
				$fixtures->get_product_attribute( 'color', array( 'red', 'green', 'blue' ) ),
				$fixtures->get_product_attribute( 'size', array( 'small', 'medium', 'large' ) ),
			)
		);

		$product_id = $product->get_id();

		$fixtures->get_variation_product(
			$product_id,
			array(
				'pa_color' => 'red-slug',
				'pa_size'  => 'small-slug',
			),
			array(
				'regular_price' => 10,
				'stock_status'  => ProductStockStatus::IN_STOCK,
			)
		);

		// Sync the variable product to update its children list.
		\WC_Product_Variable::sync( $product_id );

		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertDoesNotMatchRegularExpression(
			'/<input[^>]*type="radio"[^>]* checked(?:="checked")?[^>]*>/',
			$markup,
			'No radio options should be checked by default.'
		);

		$product->set_default_attributes( array( 'pa_size' => 'small-slug' ) );

		$product->save();

		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertMatchesRegularExpression(
			'/<input[^>]*checked(?:=" checked")?[^>]*type="radio"[^>]*value="small-slug"[^>]*>/',
			$markup,
			'The "small" size option should be checked when set as the default attribute.'
		);
	}

	/**
	 * Tests that the Product Price block is only interactive when some variations have different prices.
	 */
	public function test_variable_product_price_interactivity() {
		global $product;

		$fixtures = new FixtureData();

		$product = $fixtures->get_variable_product(
			array(),
			array(
				$fixtures->get_product_attribute( 'color', array( 'red', 'green', 'blue' ) ),
				$fixtures->get_product_attribute( 'size', array( 'small', 'medium', 'large' ) ),
			)
		);

		$product_id = $product->get_id();

		$fixtures->get_variation_product(
			$product_id,
			array(
				'pa_color' => 'red-slug',
				'pa_size'  => 'small-slug',
			),
			array(
				'regular_price' => 10,
				'stock_status'  => ProductStockStatus::IN_STOCK,
			)
		);

		// Sync the variable product to update its children list.
		\WC_Product_Variable::sync( $product_id );

		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/product-price /--><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		// Assert that Product Price block doesn't have a `data-wp-watch` attribute.
		$this->assertDoesNotMatchRegularExpression(
			'/<div[^>]*class="wc-block-components-product-price[^>]*data-wp-watch=[^>]*>/',
			$markup,
			'The Product Price block should not be interactive when all variations have the same price.'
		);

		$fixtures->get_variation_product(
			$product_id,
			array(
				'pa_color' => 'red-slug',
				'pa_size'  => 'medium-slug',
			),
			array(
				'regular_price' => 15,
				'stock_status'  => ProductStockStatus::IN_STOCK,
			)
		);

		// Sync again so the variable product reflects the new variation.
		\WC_Product_Variable::sync( $product_id );

		// Assert that Product Price block has a `data-wp-watch` attribute.
		$markup = do_blocks( '<!-- wp:fincommerce/single-product {"productId":' . $product_id . '} --><!-- wp:fincommerce/product-price /--><!-- wp:fincommerce/add-to-cart-with-options /--><!-- /wp:fincommerce/single-product -->' );

		$this->assertMatchesRegularExpression(
			'/<div[^>]*class="wc-block-components-product-price[^>]*data-wp-watch=[^>]*>/',
			$markup,
			'The Product Price block should be interactive when some variations have different prices.'
		);
	}
}
