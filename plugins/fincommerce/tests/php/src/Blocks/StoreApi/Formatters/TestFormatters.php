<?php
/**
 * Controller Tests.
 */

namespace Automattic\FinCommerce\Tests\Blocks\StoreApi\Formatters;

use Automattic\FinCommerce\StoreApi\Formatters;
use Automattic\FinCommerce\StoreApi\Formatters\MoneyFormatter;
use Automattic\FinCommerce\StoreApi\Formatters\HtmlFormatter;
use Automattic\FinCommerce\StoreApi\Formatters\DefaultFormatter;
use Automattic\FinCommerce\StoreApi\Formatters\CurrencyFormatter;

/**
 * TestFormatters tests.
 */
class TestFormatters extends \WP_UnitTestCase {

	private $mock_formatters;

	/**
	 * Setup test product data. Called before every test.
	 */
	protected function setUp(): void {
		parent::setUp();

		$this->mock_formatters = new Formatters();
		$this->mock_formatters->register( 'money', MoneyFormatter::class );
		$this->mock_formatters->register( 'html', HtmlFormatter::class );
		$this->mock_formatters->register( 'currency', CurrencyFormatter::class );
	}

	/**
	 * Test get formatter.
	 */
	public function test_get_formatter() {
		$this->assertInstanceOf( MoneyFormatter::class, $this->mock_formatters->money );
		$this->assertInstanceOf( HtmlFormatter::class, $this->mock_formatters->html );
		$this->assertInstanceOf( CurrencyFormatter::class, $this->mock_formatters->currency );
	}

	/**
	 * Test getting non existent formatter.
	 */
	public function test_get_default_formatter() {
		$this->assertInstanceOf( DefaultFormatter::class, $this->mock_formatters->wrong );
	}
}
