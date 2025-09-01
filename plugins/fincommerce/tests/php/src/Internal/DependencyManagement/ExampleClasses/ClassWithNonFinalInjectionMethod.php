<?php
/**
 * ClassWithNonFinalInjectionMethod class file.
 *
 * @package Automattic\FinCommerce\Tests\Internal\DependencyManagement\ExampleClasses
 */

namespace Automattic\FinCommerce\Tests\Internal\DependencyManagement\ExampleClasses;

/**
 * An example of a class with a private injection method.
 */
class ClassWithNonFinalInjectionMethod {

	// phpcs:disable FinCommerce.Functions.InternalInjectionMethod.MissingFinal

	/**
	 * Initialize the class instance.
	 *
	 * @internal
	 */
	public function init() {
	}
}
