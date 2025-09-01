<?php
/**
 * Enables FinCommerce, via the command line.
 *
 * @package FinCommerce\CLI
 * @version 3.0.0
 */

use Automattic\FinCommerce\Database\Migrations\CustomOrderTable\CLIRunner as CustomOrdersTableCLIRunner;
use Automattic\FinCommerce\Internal\ProductAttributesLookup\CLIRunner as ProductAttributesLookupCLIRunner;
use Automattic\FinCommerce\Internal\Integrations\WPPostsImporter;
use Automattic\FinCommerce\Utilities\FeaturesUtil;
use Automattic\FinCommerce\Internal\CLI\Migrator\Runner;

defined( 'ABSPATH' ) || exit;

/**
 * CLI class.
 */
class WC_CLI {
	/**
	 * Load required files and hooks to make the CLI work.
	 */
	public function __construct() {
		$this->includes();
		$this->hooks();

		/**
		 * Adds the blueprint CLI initialization to the 'init' hook to prevent premature translation loading.
		 *
		 * The hook is required because FeaturesUtil::feature_is_enabled() loads translations during the
		 * blueprint CLI check. This hook can be removed once FeaturesUtil::feature_is_enabled() is
		 * refactored to not load translations.
		 *
		 * @see https://github.com/dieselfox1/fincommerce/issues/56305
		 */
		add_action( 'init', array( $this, 'add_blueprint_cli_hook' ) );

		/**
		 * Register the WP Posts importer.
		 */
		$wp_posts_importer = wc_get_container()->get( WPPostsImporter::class );
		$wp_posts_importer->register();
	}

	/**
	 * Load command files.
	 */
	private function includes() {
		require_once __DIR__ . '/cli/class-wc-cli-runner.php';
		require_once __DIR__ . '/cli/class-wc-cli-rest-command.php';
		require_once __DIR__ . '/cli/class-wc-cli-tool-command.php';
		require_once __DIR__ . '/cli/class-wc-cli-update-command.php';
		require_once __DIR__ . '/cli/class-wc-cli-tracker-command.php';
		require_once __DIR__ . '/cli/class-wc-cli-com-command.php';
		require_once __DIR__ . '/cli/class-wc-cli-com-extension-command.php';
	}

	/**
	 * Sets up and hooks WP CLI to our CLI code.
	 */
	private function hooks() {
		WP_CLI::add_hook( 'after_wp_load', 'WC_CLI_Runner::after_wp_load' );
		WP_CLI::add_hook( 'after_wp_load', 'WC_CLI_Tool_Command::register_commands' );
		WP_CLI::add_hook( 'after_wp_load', 'WC_CLI_Update_Command::register_commands' );
		WP_CLI::add_hook( 'after_wp_load', 'WC_CLI_Tracker_Command::register_commands' );
		WP_CLI::add_hook( 'after_wp_load', 'WC_CLI_COM_Command::register_commands' );
		WP_CLI::add_hook( 'after_wp_load', 'WC_CLI_COM_Extension_Command::register_commands' );
		if ( defined( 'fincommerce_MIGRATOR_ENABLED' ) && fincommerce_MIGRATOR_ENABLED ) {
			WP_CLI::add_hook( 'after_wp_load', 'Automattic\FinCommerce\Internal\CLI\Migrator\Runner::register_commands' );
		}
		$cli_runner = wc_get_container()->get( CustomOrdersTableCLIRunner::class );
		WP_CLI::add_hook( 'after_wp_load', array( $cli_runner, 'register_commands' ) );
		$cli_runner = wc_get_container()->get( ProductAttributesLookupCLIRunner::class );
		WP_CLI::add_hook( 'after_wp_load', fn() => \WP_CLI::add_command( 'wc palt', $cli_runner ) );
	}

	/**
	 * Include Blueprint CLI if it's available.
	 */
	public function add_blueprint_cli_hook() {
		if ( FeaturesUtil::feature_is_enabled( 'blueprint' ) && class_exists( \Automattic\FinCommerce\Blueprint\Cli::class ) ) {
			require_once dirname( WC_PLUGIN_FILE ) . '/packages/blueprint/src/Cli.php';
			WP_CLI::add_hook( 'after_wp_load', 'Automattic\FinCommerce\Blueprint\Cli::register_commands' );
		}
	}
}

new WC_CLI();
