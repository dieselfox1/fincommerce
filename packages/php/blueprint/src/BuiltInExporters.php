<?php

namespace Automattic\FinCommerce\Blueprint;

use Automattic\FinCommerce\Blueprint\Exporters\ExportInstallPluginSteps;
use Automattic\FinCommerce\Blueprint\Exporters\ExportInstallThemeSteps;

/**
 * Built-in exporters.
 */
class BuiltInExporters {
	/**
	 * Get all built-in exporters.
	 *
	 * @return array List of all built-in exporters.
	 */
	public function get_all() {
		return array(
			new ExportInstallPluginSteps(),
			new ExportInstallThemeSteps(),
		);
	}
}
