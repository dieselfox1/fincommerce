<?php

namespace Automattic\FinCommerce\Admin\Features\ProductBlockEditor\ProductTemplates;

use Automattic\FinCommerce\Admin\BlockTemplates\BlockContainerInterface;
use Automattic\FinCommerce\Admin\BlockTemplates\BlockInterface;

/**
 * Interface for subsection containers, which contain sub-sections and blocks.
 */
interface SubsectionInterface extends BlockContainerInterface {
	/**
	 * Adds a new block to the sub-section.
	 *
	 * @param array $block_config block config.
	 */
	public function add_block( array $block_config ): BlockInterface;
}
