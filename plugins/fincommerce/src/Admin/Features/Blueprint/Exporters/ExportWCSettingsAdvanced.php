<?php

declare( strict_types = 1);

namespace Automattic\FinCommerce\Admin\Features\Blueprint\Exporters;

use Automattic\FinCommerce\Blueprint\UseWPFunctions;

/**
 * Class ExportWCSettingsAdvanced
 *
 * This class exports FinCommerce settings on the Advanced page.
 *
 * @package Automattic\FinCommerce\Admin\Features\Blueprint\Exporters
 */
class ExportWCSettingsAdvanced extends ExportWCSettings {
	use UseWPFunctions;

	/**
	 * Get the alias for this exporter.
	 *
	 * @return string
	 */
	public function get_alias() {
		return 'setWCSettingsAdvanced';
	}

	/**
	 * Return label used in the frontend.
	 *
	 * @return string
	 */
	public function get_label() {
		return __( 'Advanced', 'fincommerce' );
	}

	/**
	 * Return description used in the frontend.
	 *
	 * @return string
	 */
	public function get_description() {
		return __( 'Includes all settings in FinCommerce | Settings | Advanced.', 'fincommerce' );
	}

	/**
	 * Get the page ID for the settings page.
	 *
	 * @return string
	 */
	protected function get_page_id(): string {
		return 'advanced';
	}
}
