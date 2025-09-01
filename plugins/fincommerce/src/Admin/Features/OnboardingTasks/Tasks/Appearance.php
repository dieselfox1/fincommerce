<?php

namespace Automattic\FinCommerce\Admin\Features\OnboardingTasks\Tasks;

use Automattic\FinCommerce\Admin\PageController;
use Automattic\FinCommerce\Internal\Admin\Loader;
use Automattic\FinCommerce\Admin\Features\OnboardingTasks\Task;
use Automattic\FinCommerce\Admin\Features\OnboardingTasks\Tasks\Products;
use Automattic\FinCommerce\Internal\Admin\WCAdminAssets;

/**
 * Appearance Task
 */
class Appearance extends Task {

	/**
	 * Constructor.
	 */
	public function __construct() {
		if ( ! $this->is_complete() ) {
			add_action( 'load-theme-install.php', array( $this, 'mark_actioned' ) );
		}
	}

	/**
	 * ID.
	 *
	 * @return string
	 */
	public function get_id() {
		return 'appearance';
	}

	/**
	 * Title.
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'Choose your theme', 'fincommerce' );
	}

	/**
	 * Content.
	 *
	 * @return string
	 */
	public function get_content() {
		return __(
			"Choose a theme that best fits your brand's look and feel, then make it your own. Change the colors, add your logo, and create pages.",
			'fincommerce'
		);
	}

	/**
	 * Time.
	 *
	 * @return string
	 */
	public function get_time() {
		return __( '2 minutes', 'fincommerce' );
	}

	/**
	 * Action label.
	 *
	 * @return string
	 */
	public function get_action_label() {
		return __( 'Choose theme', 'fincommerce' );
	}
}
