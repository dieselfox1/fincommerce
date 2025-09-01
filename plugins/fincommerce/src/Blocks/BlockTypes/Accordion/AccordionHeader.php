<?php
declare(strict_types=1);

namespace Automattic\FinCommerce\Blocks\BlockTypes\Accordion;

use Automattic\FinCommerce\Blocks\BlockTypes\AbstractBlock;
use Automattic\FinCommerce\Blocks\BlockTypes\EnableBlockJsonAssetsTrait;
/**
 * AccordionHeader class.
 */
class AccordionHeader extends AbstractBlock {

	use EnableBlockJsonAssetsTrait;

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'accordion-header';
}
