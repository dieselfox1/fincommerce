<?php

defined( 'ABSPATH' ) || exit;

register_fincommerce_admin_test_helper_rest_route(
	'/tools/trigger-wca-install/v1',
	'tools_trigger_wca_install'
);

/**
 * A tool to trigger the FinCommerce install.
 */
function tools_trigger_wca_install() {
	\WC_Install::install();

	return true;
}
