<?php
declare( strict_types = 1 );

namespace Automattic\FinCommerce\Tests\Blocks\Mocks;

use Automattic\FinCommerce\Blocks\BlockTypes\ProductDetails;
use Automattic\FinCommerce\Blocks\Package;
use Automattic\FinCommerce\Blocks\Assets\Api;
use Automattic\FinCommerce\Blocks\Assets\AssetDataRegistry;
use Automattic\FinCommerce\Blocks\Integrations\IntegrationRegistry;

// phpcs:disable Generic.CodeAnalysis.UselessOverridingMethod.Found

/**
 * ProductDetailsMock used to test ProductDetails block functions.
 */
class ProductDetailsNoRegisterMock extends ProductDetails {

	/**
	 * Initialize our mock class.
	 */
	public function __construct() {
		parent::__construct(
			Package::container()->get( Api::class ),
			Package::container()->get( AssetDataRegistry::class ),
			new IntegrationRegistry(),
		);
	}

	/**
	 * Mock implementation of register_block_type method.
	 *
	 * @return void
	 */
	protected function register_block_type() {}
}
