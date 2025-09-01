<?php

declare( strict_types = 1);

namespace Automattic\FinCommerce\Admin\Features\Blueprint\Exporters;

use Automattic\FinCommerce\Blueprint\Exporters\StepExporter;
use Automattic\FinCommerce\Blueprint\Exporters\HasAlias;
use Automattic\FinCommerce\Blueprint\Steps\SetSiteOptions;
use Automattic\FinCommerce\Blueprint\UseWPFunctions;

/**
 * ExportWCCoreProfilerOptions class
 */
class ExportWCCoreProfilerOptions implements StepExporter, HasAlias {
	use UseWPFunctions;

	/**
	 * Export the step
	 *
	 * @return SetSiteOptions
	 */
	public function export() {
		return new SetSiteOptions(
			array(
				'blogname'                       => $this->wp_get_option( 'blogname' ),
				'fincommerce_allow_tracking'     => $this->wp_get_option( 'fincommerce_allow_tracking' ),
				'fincommerce_onboarding_profile' => $this->wp_get_option( 'fincommerce_onboarding_profile', array() ),
				'fincommerce_default_country'    => $this->wp_get_option( 'fincommerce_default_country' ),
			)
		);
	}

	/**
	 * Get the step name
	 *
	 * @return string
	 */
	public function get_step_name() {
		return 'setSiteOptions';
	}

	/**
	 * Get the alias
	 *
	 * @return string
	 */
	public function get_alias() {
		return 'setWCCoreProfilerOptions';
	}

	/**
	 * Return label used in the frontend.
	 *
	 * @return string
	 */
	public function get_label() {
		return __( 'Onboarding Configuration', 'fincommerce' );
	}

	/**
	 * Return description used in the frontend.
	 *
	 * @return string
	 */
	public function get_description() {
		return __( 'Includes onboarding configuration options', 'fincommerce' );
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
