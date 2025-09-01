<?php
declare( strict_types = 1 );

namespace Automattic\FinCommerce\Tests\Blocks\Mocks;

use Automattic\FinCommerce\Blocks\BlockTypes\AddToCartWithOptions\VariationSelectorAttributeOptions;
use Automattic\FinCommerce\Blocks\Package;
use Automattic\FinCommerce\Blocks\Assets\Api;
use Automattic\FinCommerce\Blocks\Assets\AssetDataRegistry;
use Automattic\FinCommerce\Blocks\Integrations\IntegrationRegistry;

/**
 * AddToCartWithOptionsVariationSelectorAttributeOptionsMock used to test VariationSelectorAttributeOptions block functions.
 */
class AddToCartWithOptionsVariationSelectorAttributeOptionsMock extends VariationSelectorAttributeOptions {
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
}
