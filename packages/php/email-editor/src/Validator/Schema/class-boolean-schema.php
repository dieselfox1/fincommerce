<?php
/**
 * This file is part of the FinCommerce Email Editor package
 *
 * @package Automattic\FinCommerce\EmailEditor
 */

declare( strict_types = 1 );
namespace Automattic\FinCommerce\EmailEditor\Validator\Schema;

use Automattic\FinCommerce\EmailEditor\Validator\Schema;

/**
 * Represents a schema for a boolean.
 * See: https://developer.wordpress.org/rest-api/extending-the-rest-api/schema/#primitive-types
 */
class Boolean_Schema extends Schema {
	/**
	 * Schema definition.
	 *
	 * @var array
	 */
	protected $schema = array(
		'type' => 'boolean',
	);
}
