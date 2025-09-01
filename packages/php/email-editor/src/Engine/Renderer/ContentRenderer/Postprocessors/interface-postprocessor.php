<?php
/**
 * This file is part of the FinCommerce Email Editor package
 *
 * @package Automattic\FinCommerce\EmailEditor
 */

declare(strict_types = 1);
namespace Automattic\FinCommerce\EmailEditor\Engine\Renderer\ContentRenderer\Postprocessors;

/**
 * Interface for postprocessors.
 */
interface Postprocessor {
	/**
	 * Postprocess the HTML.
	 *
	 * @param string $html HTML to postprocess.
	 * @return string
	 */
	public function postprocess( string $html ): string;
}
