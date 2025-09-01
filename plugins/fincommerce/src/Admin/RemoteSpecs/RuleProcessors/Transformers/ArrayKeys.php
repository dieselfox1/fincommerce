<?php

namespace Automattic\FinCommerce\Admin\RemoteSpecs\RuleProcessors\Transformers;

use Automattic\FinCommerce\Admin\RemoteSpecs\RuleProcessors\Transformers\TransformerInterface;
use stdClass;

/**
 * Search array value by one of its key.
 *
 * @package Automattic\FinCommerce\Admin\RemoteSpecs\RuleProcessors\Transformers
 */
class ArrayKeys implements TransformerInterface {
	/**
	 * Search array value by one of its key.
	 *
	 * @param mixed         $value a value to transform.
	 * @param stdClass|null $arguments arguments.
	 * @param string|null   $default_value default value.
	 *
	 * @return mixed
	 */
	public function transform( $value, ?stdClass $arguments = null, $default_value = array() ) {
		if ( ! is_array( $value ) ) {
			return $default_value;
		}

		return array_keys( $value );
	}

	/**
	 * Validate Transformer arguments.
	 *
	 * @param stdClass|null $arguments arguments to validate.
	 *
	 * @return mixed
	 */
	public function validate( ?stdClass $arguments = null ) {
		return true;
	}
}
