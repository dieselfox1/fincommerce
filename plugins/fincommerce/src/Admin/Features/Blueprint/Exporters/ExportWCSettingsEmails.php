<?php

declare( strict_types = 1);

namespace Automattic\FinCommerce\Admin\Features\Blueprint\Exporters;

use Automattic\FinCommerce\Admin\Features\Blueprint\SettingOptions;
use Automattic\FinCommerce\Blueprint\UseWPFunctions;
use Automattic\FinCommerce\Blueprint\Steps\SetSiteOptions;

/**
 * Class ExportWCSettingsEmails
 *
 * This class exports FinCommerce settings on the Emails page.
 *
 * @package Automattic\FinCommerce\Admin\Features\Blueprint\Exporters
 */
class ExportWCSettingsEmails extends ExportWCSettings {
	use UseWPFunctions;

	/**
	 * Get the alias for this exporter.
	 *
	 * @return string
	 */
	public function get_alias() {
		return 'setWCSettingsEmails';
	}

	/**
	 * Export FinCommerce settings.
	 *
	 * @return SetSiteOptions
	 */
	public function export() {
		$emails          = \WC_Emails::instance();
		$setting_options = new SettingOptions();

		$email_settings = $setting_options->get_page_options( $this->get_page_id() );

		// Get sub-settings for each email.
		foreach ( $emails->get_emails() as $email ) {
			$email_settings = array_merge(
				$email_settings,
				$setting_options->get_page_options( 'email_' . $email->id )
			);
		}

		return new SetSiteOptions( $email_settings );
	}

	/**
	 * Return label used in the frontend.
	 *
	 * @return string
	 */
	public function get_label() {
		return __( 'Emails', 'fincommerce' );
	}

	/**
	 * Return description used in the frontend.
	 *
	 * @return string
	 */
	public function get_description() {
		return __( 'Includes all settings in FinCommerce | Settings | Emails.', 'fincommerce' );
	}

	/**
	 * Get the page ID for the settings page.
	 *
	 * @return string
	 */
	protected function get_page_id(): string {
		return 'email';
	}
}
