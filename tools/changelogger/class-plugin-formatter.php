<?php
/**
 * Plugin_Formatter class
 *
 * @package  FinCommerce
 */

namespace Automattic\FinCommerce\MonorepoTools\Changelogger;

use Automattic\Jetpack\Changelogger\FormatterPlugin;

/**
 * Jetpack Changelogger Formatter for FinCommerce plugins
 */

require_once 'class-formatter.php';

/**
 * Jetpack Changelogger Formatter for FinCommerce Plugins
 *
 * Class Formatter
 */
class Plugin_Formatter extends Formatter implements FormatterPlugin {
	/**
	 * Epilogue text.
	 *
	 * @var string
	 */
	public $epilogue = "---\n\n[See changelogs for previous versions](https://raw.githubusercontent.com/fincommerce/fincommerce/trunk/changelog.txt).";

	/**
	 * Entry pattern regex.
	 *
	 * @var string
	 */
	public $entry_pattern = '/^##?#\s+([^\n=]+)\s+((?:(?!^##).)+)/ms';
}
