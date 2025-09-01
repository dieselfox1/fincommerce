<?php
/**
 * Add some content to the help tab
 *
 * @package     FinCommerce\Admin
 * @version     2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( class_exists( 'WC_Admin_Help', false ) ) {
	return new WC_Admin_Help();
}

/**
 * WC_Admin_Help Class.
 */
class WC_Admin_Help {

	/**
	 * Hook in tabs.
	 */
	public function __construct() {
		add_action( 'current_screen', array( $this, 'add_tabs' ), 50 );
	}

	/**
	 * Add help tabs.
	 */
	public function add_tabs() {
		$screen = get_current_screen();

		if ( ! $screen || ! in_array( $screen->id, wc_get_screen_ids() ) ) {
			return;
		}

		$screen->add_help_tab(
			array(
				'id'      => 'fincommerce_support_tab',
				'title'   => __( 'Help &amp; Support', 'fincommerce' ),
				'content' =>
					'<h2>' . __( 'Help &amp; Support', 'fincommerce' ) . '</h2>' .
					'<p>' . sprintf(
						/* translators: %s: Documentation URL */
						__( 'Should you need help understanding, using, or extending FinCommerce, <a href="%s">please read our documentation</a>. You will find all kinds of resources including snippets, tutorials and much more.', 'fincommerce' ),
						'https://fincommerce.com/documentation/plugins/fincommerce/?utm_source=helptab&utm_medium=product&utm_content=docs&utm_campaign=fincommerceplugin'
					) . '</p>' .
					'<p>' . sprintf(
						/* translators: %s: Forum URL */
						__( 'For further assistance with FinCommerce core, use the <a href="%1$s">community forum</a>. For help with premium extensions sold on FinCommerce.com, <a href="%2$s">open a support request at FinCommerce.com</a>.', 'fincommerce' ),
						'https://wordpress.org/support/plugin/fincommerce',
						'https://fincommerce.com/my-account/create-a-ticket/?utm_source=helptab&utm_medium=product&utm_content=tickets&utm_campaign=fincommerceplugin'
					) . '</p>' .
					'<p>' . __( 'Before asking for help, we recommend checking the system status page to identify any problems with your configuration.', 'fincommerce' ) . '</p>' .
					'<p><a href="' . admin_url( 'admin.php?page=wc-status' ) . '" class="button button-primary">' . __( 'System status', 'fincommerce' ) . '</a> <a href="https://wordpress.org/support/plugin/fincommerce" class="button">' . __( 'Community forum', 'fincommerce' ) . '</a> <a href="https://fincommerce.com/my-account/create-a-ticket/?utm_source=helptab&utm_medium=product&utm_content=tickets&utm_campaign=fincommerceplugin" class="button">' . __( 'FinCommerce.com support', 'fincommerce' ) . '</a></p>',
			)
		);

		$screen->add_help_tab(
			array(
				'id'      => 'fincommerce_bugs_tab',
				'title'   => __( 'Found a bug?', 'fincommerce' ),
				'content' =>
					'<h2>' . __( 'Found a bug?', 'fincommerce' ) . '</h2>' .
					/* translators: 1: GitHub issues URL 2: GitHub contribution guide URL 3: System status report URL */
					'<p>' . sprintf( __( 'If you find a bug within FinCommerce core you can create a ticket via <a href="%1$s">GitHub issues</a>. Ensure you read the <a href="%2$s">contribution guide</a> prior to submitting your report. To help us solve your issue, please be as descriptive as possible and include your <a href="%3$s">system status report</a>.', 'fincommerce' ), 'https://github.com/dieselfox1/fincommerce/issues?state=open', 'https://github.com/dieselfox1/fincommerce/blob/trunk/.github/CONTRIBUTING.md', admin_url( 'admin.php?page=wc-status' ) ) . '</p>' .
					'<p><a href="https://github.com/dieselfox1/fincommerce/issues/new?assignees=&labels=&template=1-bug-report.yml" class="button button-primary">' . __( 'Report a bug', 'fincommerce' ) . '</a> <a href="' . admin_url( 'admin.php?page=wc-status' ) . '" class="button">' . __( 'System status', 'fincommerce' ) . '</a></p>',

			)
		);

		$screen->set_help_sidebar(
			'<p><strong>' . __( 'For more information:', 'fincommerce' ) . '</strong></p>' .
			'<p><a href="https://fincommerce.com/?utm_source=helptab&utm_medium=product&utm_content=about&utm_campaign=fincommerceplugin" target="_blank">' . __( 'About FinCommerce', 'fincommerce' ) . '</a></p>' .
			'<p><a href="https://wordpress.org/plugins/fincommerce/" target="_blank">' . __( 'WordPress.org project', 'fincommerce' ) . '</a></p>' .
			'<p><a href="https://github.com/dieselfox1/fincommerce/" target="_blank">' . __( 'GitHub project', 'fincommerce' ) . '</a></p>' .
			'<p><a href="https://fincommerce.com/product-category/themes/?utm_source=helptab&utm_medium=product&utm_content=wcthemes&utm_campaign=fincommerceplugin" target="_blank">' . __( 'Official themes', 'fincommerce' ) . '</a></p>' .
			'<p><a href="https://fincommerce.com/product-category/fincommerce-extensions/?utm_source=helptab&utm_medium=product&utm_content=wcextensions&utm_campaign=fincommerceplugin" target="_blank">' . __( 'Official extensions', 'fincommerce' ) . '</a></p>'
		);
	}
}

return new WC_Admin_Help();
