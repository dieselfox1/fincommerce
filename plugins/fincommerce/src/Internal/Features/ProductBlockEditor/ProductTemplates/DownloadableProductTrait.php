<?php
/**
 * DownloadableProductTrait
 */

namespace Automattic\FinCommerce\Internal\Features\ProductBlockEditor\ProductTemplates;

use Automattic\FinCommerce\Admin\Features\Features;
use Automattic\FinCommerce\Admin\Features\ProductBlockEditor\ProductTemplates\GroupInterface;

/**
 * Downloadable Product Trait.
 */
trait DownloadableProductTrait {
	/**
	 * Adds downloadable blocks to the given parent block.
	 *
	 * @param GroupInterface $parent_block The parent block.
	 */
	private function add_downloadable_product_blocks( $parent_block ) {
		// Downloads section.
		$product_downloads_section_group = $parent_block->add_section(
			array(
				'id'             => 'product-downloads-section-group',
				'order'          => 50,
				'attributes'     => array(
					'blockGap' => 'unit-40',
				),
				'hideConditions' => array(
					array(
						'expression' => 'postType === "product" && editedProduct.type !== "simple"',
					),
				),
			)
		);

		$product_downloads_section_group->add_block(
			array(
				'id'         => 'product-downloadable',
				'blockName'  => 'fincommerce/product-toggle-field',
				'order'      => 10,
				'attributes' => array(
					'property'      => 'downloadable',
					'label'         => __( 'Include downloads', 'fincommerce' ),
					'checkedHelp'   => __( 'Add any files you\'d like to make available for the customer to download after purchasing, such as instructions or warranty info.', 'fincommerce' ),
					'uncheckedHelp' => __( 'Add any files you\'d like to make available for the customer to download after purchasing, such as instructions or warranty info.', 'fincommerce' ),
				),
			)
		);

		$product_downloads_section_group->add_subsection(
			array(
				'id'             => 'product-downloads-section',
				'order'          => 20,
				'attributes'     => array(
					'title'       => __( 'Downloads', 'fincommerce' ),
					'description' => sprintf(
						/* translators: %1$s: Downloads settings link opening tag. %2$s: Downloads settings link closing tag. */
						__( 'Add any files you\'d like to make available for the customer to download after purchasing, such as instructions or warranty info. Store-wide updates can be managed in your %1$sproduct settings%2$s.', 'fincommerce' ),
						'<a href="' . admin_url( 'admin.php?page=wc-settings&tab=products&section=downloadable' ) . '" target="_blank" rel="noreferrer">',
						'</a>'
					),
				),
				'hideConditions' => array(
					array(
						'expression' => 'editedProduct.downloadable !== true',
					),
				),
			)
		)->add_block(
			array(
				'id'        => 'product-downloads',
				'blockName' => 'fincommerce/product-downloads-field',
				'order'     => 10,
			)
		);
	}
}
