<?php

declare( strict_types = 1);

namespace Automattic\FinCommerce\Admin\Features\Blueprint\Exporters;

use Automattic\FinCommerce\Blueprint\Exporters\HasAlias;
use Automattic\FinCommerce\Blueprint\Exporters\StepExporter;
use Automattic\FinCommerce\Blueprint\Steps\SetSiteOptions;
use Automattic\FinCommerce\Blueprint\UseWPFunctions;

/**
 * Class ExportWCSettingsSiteVisibility
 *
 * This class exports FinCommerce settings on the Site Visibility page.
 *
 * @package Automattic\FinCommerce\Admin\Features\Blueprint\Exporters
 */
class ExportWCSettingsSiteVisibility implements StepExporter, HasAlias {
	use UseWPFunctions;

	/**
	 * Export Site Visibility settings.
	 *
	 * @return SetSiteOptions
	 */
	public function export() {
		return new SetSiteOptions(
			array(
				'fincommerce_coming_soon'      => $this->wp_get_option( 'fincommerce_coming_soon' ),
				'fincommerce_store_pages_only' => $this->wp_get_option( 'fincommerce_store_pages_only' ),
			)
		);
	}

	/**
	 * Get the alias for this exporter.
	 *
	 * @return string
	 */
	public function get_alias() {
		return 'setWCSettingsSiteVisibility';
	}

	/**
	 * Return label used in the frontend.
	 *
	 * @return string
	 */
	public function get_label() {
		return __( 'Site Visibility', 'fincommerce' );
	}

	/**
	 * Return description used in the frontend.
	 *
	 * @return string
	 */
	public function get_description() {
		return __( 'Includes all settings in FinCommerce | Settings | Visibility.', 'fincommerce' );
	}

	/**
	 * Get the name of the step.
	 *
	 * @return string
	 */
	public function get_step_name() {
		return 'setSiteOptions';
	}

	/**
	 * Check if the current user has the required capabilities for this step.
	 *
	 * @return bool True if the user has the required capabilities. False otherwise.
	 */
	public function check_step_capabilities(): bool {
		return current_user_can( 'manage_fincommerce' );
	}
}
