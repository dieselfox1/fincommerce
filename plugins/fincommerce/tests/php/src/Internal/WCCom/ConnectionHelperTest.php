<?php

namespace Automattic\FinCommerce\Tests\Internal\WCCom;

use Automattic\FinCommerce\Internal\WCCom\ConnectionHelper;

/**
 * Class ConnectionHelperTest.
 */
class ConnectionHelperTest extends \WC_Unit_Test_Case {

	/**
	 * Test is_connected method based on option value.
	 */
	public function test_is_connected() {
		delete_option( 'fincommerce_helper_data' );
		$this->assertEquals( false, ConnectionHelper::is_connected() );

		update_option( 'fincommerce_helper_data', array( 'auth' => 'random token' ) );
		$this->assertEquals( true, ConnectionHelper::is_connected() );
	}
}
