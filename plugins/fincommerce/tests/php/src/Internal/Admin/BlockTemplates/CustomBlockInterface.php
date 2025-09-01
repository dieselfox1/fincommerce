<?php

namespace Automattic\FinCommerce\Tests\Internal\Admin\BlockTemplates;

use Automattic\FinCommerce\Admin\BlockTemplates\BlockContainerInterface;
use Automattic\FinCommerce\Admin\BlockTemplates\BlockInterface;

interface CustomBlockInterface extends BlockContainerInterface {
	/**
	 * Adds a method to insert a specific custom inner block.
	 *
	 * @param string $title The title.
	 */
	public function add_custom_inner_block( string $title ): BlockInterface;
}
