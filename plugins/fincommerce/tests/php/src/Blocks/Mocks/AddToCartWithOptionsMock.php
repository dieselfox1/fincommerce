<?php
declare( strict_types = 1 );

namespace Automattic\FinCommerce\Tests\Blocks\Mocks;

use Automattic\FinCommerce\Blocks\BlockTypes\AddToCartWithOptions\AddToCartWithOptions;
use Automattic\FinCommerce\Blocks\Package;
use Automattic\FinCommerce\Blocks\Assets\Api;
use Automattic\FinCommerce\Blocks\Assets\AssetDataRegistry;
use Automattic\FinCommerce\Blocks\Integrations\IntegrationRegistry;

/**
 * AddToCartWithOptionsMock used to test AddToCartWithOptions block functions.
 */
class AddToCartWithOptionsMock extends AddToCartWithOptions {
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
