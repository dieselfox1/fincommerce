<?php
declare( strict_types = 1 );

namespace Automattic\FinCommerce\Tests\Blocks\Mocks;

use Automattic\FinCommerce\Blocks\BlockTypes\Checkout;

/**
 * A mock class.
 */
class CheckoutMock extends Checkout {

	/**
	 * Mock the enqueue_data method so we can call it from tests.
	 *
	 * @return void
	 */
	public function mock_enqueue_data() {
		$this->enqueue_data();
	}
}
