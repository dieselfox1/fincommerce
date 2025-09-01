<?php
/**
 * Custom task example.
 *
 * @package FinCommerce\Admin
 */

use Automattic\FinCommerce\Admin\Features\OnboardingTasks\Task;

/**
 * Custom task class.
 */
class MyTask extends Task {
	/**
	 * Get the task ID.
	 *
	 * @return string
	 */
	public function get_id() {
		return 'my-task';
	}

	/**
	 * Title.
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'My task', 'fincommerce' );
	}

	/**
	 * Content.
	 *
	 * @return string
	 */
	public function get_content() {
		return __( 'Add your task description here for display in the task list.', 'fincommerce' );
	}

	/**
	 * Time.
	 *
	 * @return string
	 */
	public function get_time() {
		return __( '2 minutes', 'fincommerce' );
	}
}
