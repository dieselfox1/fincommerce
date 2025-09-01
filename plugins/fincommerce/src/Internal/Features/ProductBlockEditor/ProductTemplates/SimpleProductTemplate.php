<?php
/**
 * SimpleProductTemplate
 */

namespace Automattic\FinCommerce\Internal\Features\ProductBlockEditor\ProductTemplates;

use Automattic\FinCommerce\Admin\Features\Features;
use Automattic\FinCommerce\Admin\Features\ProductBlockEditor\ProductTemplates\ProductFormTemplateInterface;
use Automattic\FinCommerce\Enums\CatalogVisibility;
use Automattic\FinCommerce\Enums\ProductStockStatus;
use Automattic\FinCommerce\Enums\ProductTaxStatus;
use WC_Tax;

/**
 * Simple Product Template.
 */
class SimpleProductTemplate extends AbstractProductFormTemplate implements ProductFormTemplateInterface {
	use DownloadableProductTrait;

	/**
	 * The context name used to identify the editor.
	 */
	const GROUP_IDS = array(
		'GENERAL'         => 'general',
		'ORGANIZATION'    => 'organization',
		'INVENTORY'       => 'inventory',
		'SHIPPING'        => 'shipping',
		'VARIATIONS'      => 'variations',
		'LINKED_PRODUCTS' => 'linked-products',
	);

	/**
	 * SimpleProductTemplate constructor.
	 */
	public function __construct() {
		$this->add_group_blocks();
		$this->add_general_group_blocks();
		$this->add_organization_group_blocks();
		$this->add_inventory_group_blocks();
		$this->add_shipping_group_blocks();
		$this->add_variation_group_blocks();
		$this->add_linked_products_group_blocks();
	}

	/**
	 * Get the template ID.
	 */
	public function get_id(): string {
		return 'simple-product';
	}

	/**
	 * Get the template title.
	 */
	public function get_title(): string {
		return __( 'Simple Product Template', 'fincommerce' );
	}

	/**
	 * Get the template description.
	 */
	public function get_description(): string {
		return __( 'Template for the simple product form', 'fincommerce' );
	}

	/**
	 * Adds the group blocks to the template.
	 */
	private function add_group_blocks() {
		$this->add_group(
			array(
				'id'         => $this::GROUP_IDS['GENERAL'],
				'order'      => 10,
				'attributes' => array(
					'title' => __( 'General', 'fincommerce' ),
				),
			)
		);

		// Variations tab.
		$variations_hide_conditions   = array();
		$variations_hide_conditions[] = array(
			'expression' => 'editedProduct.type === "grouped"',
		);
		$variations_hide_conditions[] = array(
			'expression' => 'editedProduct.type === "external"',
		);

		$this->add_group(
			array(
				'id'             => $this::GROUP_IDS['VARIATIONS'],
				'order'          => 20,
				'attributes'     => array(
					'title' => __( 'Variations', 'fincommerce' ),
				),
				'hideConditions' => $variations_hide_conditions,
			)
		);

		$this->add_group(
			array(
				'id'         => $this::GROUP_IDS['ORGANIZATION'],
				'order'      => 30,
				'attributes' => array(
					'title' => __( 'Organization', 'fincommerce' ),
				),
			)
		);
		$this->add_group(
			array(
				'id'         => $this::GROUP_IDS['INVENTORY'],
				'order'      => 50,
				'attributes' => array(
					'title' => __( 'Inventory', 'fincommerce' ),
				),
			)
		);
		$shipping_hide_conditions   = array();
		$shipping_hide_conditions[] = array(
			'expression' => 'editedProduct.type === "grouped"',
		);
		$shipping_hide_conditions[] = array(
			'expression' => 'editedProduct.type === "external"',
		);

		$this->add_group(
			array(
				'id'             => $this::GROUP_IDS['SHIPPING'],
				'order'          => 60,
				'attributes'     => array(
					'title' => __( 'Shipping', 'fincommerce' ),
				),
				'hideConditions' => $shipping_hide_conditions,
			)
		);

		// Linked Products tab.
		$this->add_group(
			array(
				'id'         => $this::GROUP_IDS['LINKED_PRODUCTS'],
				'order'      => 70,
				'attributes' => array(
					'title' => __( 'Linked products', 'fincommerce' ),
				),
			)
		);
	}

	/**
	 * Adds the general group blocks to the template.
	 */
	private function add_general_group_blocks() {
		$is_calc_taxes_enabled = wc_tax_enabled();
		$general_group         = $this->get_group_by_id( $this::GROUP_IDS['GENERAL'] );
		$general_group->add_block(
			array(
				'id'         => 'product_variation_notice_general_tab',
				'blockName'  => 'fincommerce/product-has-variations-notice',
				'order'      => 10,
				'attributes' => array(
					'content'    => __( 'This product has options, such as size or color. You can manage each variation\'s images, downloads, and other details individually.', 'fincommerce' ),
					'buttonText' => __( 'Go to Variations', 'fincommerce' ),
					'type'       => 'info',
				),
			)
		);
		// Basic Details Section.
		$basic_details = $general_group->add_section(
			array(
				'id'         => 'basic-details',
				'order'      => 10,
				'attributes' => array(
					'title'       => __( 'Basic details', 'fincommerce' ),
					'description' => __( 'This info will be displayed on the product page, category pages, social media, and search results.', 'fincommerce' ),
				),
			)
		);
		$basic_details->add_block(
			array(
				'id'        => 'product-details-section-description',
				'blockName' => 'fincommerce/product-details-section-description',
				'order'     => 10,
			)
		);
		$basic_details->add_block(
			array(
				'id'         => 'product-name',
				'blockName'  => 'fincommerce/product-name-field',
				'order'      => 10,
				'attributes' => array(
					'name'      => 'Product name',
					'autoFocus' => true,
					'metadata'  => array(
						'bindings' => array(
							'value' => array(
								'source' => 'fincommerce/entity-product',
								'args'   => array(
									'prop' => 'name',
								),
							),
						),
					),
				),
			)
		);

		// Product Pricing columns.
		$pricing_columns  = $basic_details->add_block(
			array(
				'id'        => 'product-pricing-group-pricing-columns',
				'blockName' => 'core/columns',
				'order'     => 10,
			)
		);
		$pricing_column_1 = $pricing_columns->add_block(
			array(
				'id'         => 'product-pricing-group-pricing-column-1',
				'blockName'  => 'core/column',
				'order'      => 10,
				'attributes' => array(
					'templateLock' => 'all',
				),
			)
		);
		$pricing_column_1->add_block(
			array(
				'id'                => 'product-pricing-regular-price',
				'blockName'         => 'fincommerce/product-regular-price-field',
				'order'             => 10,
				'attributes'        => array(
					'name'  => 'regular_price',
					'label' => __( 'Regular price', 'fincommerce' ),
					'help'  => $is_calc_taxes_enabled ? null : sprintf(
					/* translators: %1$s: store settings link opening tag. %2$s: store settings link closing tag.*/
						__( 'Per your %1$sstore settings%2$s, taxes are not enabled.', 'fincommerce' ),
						'<a href="' . admin_url( 'admin.php?page=wc-settings&tab=general' ) . '" target="_blank" rel="noreferrer">',
						'</a>'
					),
				),
				'disableConditions' => array(
					array(
						'expression' => 'editedProduct.type === "variable"',
					),
					array(
						'expression' => 'editedProduct.type === "grouped"',
					),
				),
			)
		);
		$pricing_column_2 = $pricing_columns->add_block(
			array(
				'id'         => 'product-pricing-group-pricing-column-2',
				'blockName'  => 'core/column',
				'order'      => 20,
				'attributes' => array(
					'templateLock' => 'all',
				),
			)
		);
		$pricing_column_2->add_block(
			array(
				'id'                => 'product-pricing-sale-price',
				'blockName'         => 'fincommerce/product-sale-price-field',
				'order'             => 10,
				'attributes'        => array(
					'label' => __( 'Sale price', 'fincommerce' ),
				),
				'disableConditions' => array(
					array(
						'expression' => 'editedProduct.type === "variable"',
					),
					array(
						'expression' => 'editedProduct.type === "grouped"',
					),
				),
			)
		);
		$basic_details->add_block(
			array(
				'id'        => 'product-pricing-schedule-sale-fields',
				'blockName' => 'fincommerce/product-schedule-sale-fields',
				'order'     => 20,
			)
		);

		if ( $is_calc_taxes_enabled ) {
			$basic_details->add_block(
				array(
					'id'         => 'product-sale-tax',
					'blockName'  => 'fincommerce/product-radio-field',
					'order'      => 30,
					'attributes' => array(
						'title'    => __( 'Charge sales tax on', 'fincommerce' ),
						'property' => 'tax_status',
						'options'  => array(
							array(
								'label' => __( 'Product and shipping', 'fincommerce' ),
								'value' => ProductTaxStatus::TAXABLE,
							),
							array(
								'label' => __( 'Only shipping', 'fincommerce' ),
								'value' => 'shipping',
							),
							array(
								'label' => __( "Don't charge tax", 'fincommerce' ),
								'value' => 'none',
							),
						),
					),
				)
			);
			$pricing_advanced_block = $basic_details->add_block(
				array(
					'id'         => 'product-pricing-advanced',
					'blockName'  => 'fincommerce/product-collapsible',
					'order'      => 40,
					'attributes' => array(
						'toggleText'       => __( 'Advanced', 'fincommerce' ),
						'initialCollapsed' => true,
						'persistRender'    => true,
					),
				)
			);
			$pricing_advanced_block->add_block(
				array(
					'id'         => 'product-tax-class',
					'blockName'  => 'fincommerce/product-select-field',
					'order'      => 10,
					'attributes' => array(
						'label'    => __( 'Tax class', 'fincommerce' ),
						'help'     => sprintf(
						/* translators: %1$s: Learn more link opening tag. %2$s: Learn more link closing tag.*/
							__( 'Apply a tax rate if this product qualifies for tax reduction or exemption. %1$sLearn more%2$s', 'fincommerce' ),
							'<a href="https://fincommerce.com/document/setting-up-taxes-in-fincommerce/#shipping-tax-class" target="_blank" rel="noreferrer">',
							'</a>'
						),
						'property' => 'tax_class',
						'options'  => self::get_tax_classes(),
					),
				)
			);
		}

		$basic_details->add_block(
			array(
				'id'         => 'product-summary',
				'blockName'  => 'fincommerce/product-text-area-field',
				'order'      => 50,
				'attributes' => array(
					'label'    => __( 'Summary', 'fincommerce' ),
					'help'     => __(
						"Summarize this product in 1-2 short sentences. We'll show it at the top of the page.",
						'fincommerce'
					),
					'property' => 'short_description',
					'lock'     => array(
						'move' => true,
					),
				),
			)
		);

		// Description section.
		$description_section = $general_group->add_section(
			array(
				'id'         => 'product-description-section',
				'order'      => 20,
				'attributes' => array(
					'title'       => __( 'Description', 'fincommerce' ),
					'description' => __( 'What makes this product unique? What are its most important features? Enrich the product page by adding rich content using blocks.', 'fincommerce' ),
				),
			)
		);

		$description_field_block = $description_section->add_block(
			array(
				'id'        => 'product-description',
				'blockName' => 'fincommerce/product-description-field',
				'order'     => 10,
			)
		);

		$description_field_block->add_block(
			array(
				'id'         => 'product-description__content',
				'blockName'  => 'fincommerce/product-summary-field',
				'order'      => 10,
				'attributes' => array(
					'helpText' => null,
					'label'    => null,
					'property' => 'description',
					'lock'     => array(
						'move' => true,
					),
				),
			)
		);

		// External/Affiliate section.
		$buy_button_section = $general_group->add_section(
			array(
				'id'             => 'product-buy-button-section',
				'order'          => 30,
				'attributes'     => array(
					'title'       => __( 'Buy button', 'fincommerce' ),
					'description' => __( 'Add a link and choose a label for the button linked to a product sold elsewhere.', 'fincommerce' ),
				),
				'hideConditions' => array(
					array(
						'expression' => 'editedProduct.type !== "external"',
					),
				),
			)
		);

		$buy_button_section->add_block(
			array(
				'id'         => 'product-external-url',
				'blockName'  => 'fincommerce/product-text-field',
				'order'      => 10,
				'attributes' => array(
					'property'    => 'external_url',
					'label'       => __( 'Link to the external product', 'fincommerce' ),
					'placeholder' => __( 'Enter the external URL to the product', 'fincommerce' ),
					'suffix'      => true,
					'type'        => array(
						'value'   => 'url',
						'message' => __( 'Link to the external product is an invalid URL.', 'fincommerce' ),
					),
				),
			)
		);

		$button_text_columns = $buy_button_section->add_block(
			array(
				'id'        => 'product-button-text-columns',
				'blockName' => 'core/columns',
				'order'     => 20,
			)
		);

		$button_text_columns->add_block(
			array(
				'id'        => 'product-button-text-column1',
				'blockName' => 'core/column',
				'order'     => 10,
			)
		)->add_block(
			array(
				'id'         => 'product-button-text',
				'blockName'  => 'fincommerce/product-text-field',
				'order'      => 10,
				'attributes' => array(
					'property' => 'button_text',
					'label'    => __( 'Buy button text', 'fincommerce' ),
				),
			)
		);

		$button_text_columns->add_block(
			array(
				'id'        => 'product-button-text-column2',
				'blockName' => 'core/column',
				'order'     => 20,
			)
		);

		// Product list section.
		$product_list_section = $general_group->add_section(
			array(
				'id'             => 'product-list-section',
				'order'          => 35,
				'attributes'     => array(
					'title'       => __( 'Products in this group', 'fincommerce' ),
					'description' => __( 'Make a collection of related products, enabling customers to purchase multiple items together.', 'fincommerce' ),
				),
				'hideConditions' => array(
					array(
						'expression' => 'editedProduct.type !== "grouped"',
					),
				),
			)
		);

		$product_list_section->add_block(
			array(
				'id'         => 'product-list',
				'blockName'  => 'fincommerce/product-list-field',
				'order'      => 10,
				'attributes' => array(
					'property' => 'grouped_products',
				),
			)
		);

		// Images section.
		$images_section = $general_group->add_section(
			array(
				'id'         => 'product-images-section',
				'order'      => 40,
				'attributes' => array(
					'title'       => __( 'Images', 'fincommerce' ),
					'description' => sprintf(
					/* translators: %1$s: Images guide link opening tag. %2$s: Images guide link closing tag. */
						__( 'Drag images, upload new ones or select files from your library. For best results, use JPEG files that are 1000 by 1000 pixels or larger. %1$sHow to prepare images?%2$s', 'fincommerce' ),
						'<a href="https://fincommerce.com/posts/how-to-take-professional-product-photos-top-tips" target="_blank" rel="noreferrer">',
						'</a>'
					),
				),
			)
		);
		$images_section->add_block(
			array(
				'id'         => 'product-images',
				'blockName'  => 'fincommerce/product-images-field',
				'order'      => 10,
				'attributes' => array(
					'images'   => array(),
					'property' => 'images',
				),
			)
		);

		// Downloads section.
		$this->add_downloadable_product_blocks( $general_group );
	}

	/**
	 * Adds the organization group blocks to the template.
	 */
	private function add_organization_group_blocks() {
		$organization_group = $this->get_group_by_id( $this::GROUP_IDS['ORGANIZATION'] );
		// Product Catalog Section.
		$product_catalog_section = $organization_group->add_section(
			array(
				'id'         => 'product-catalog-section',
				'order'      => 10,
				'attributes' => array(
					'title'       => __( 'Product catalog', 'fincommerce' ),
					'description' => __( 'Help customers find this product by assigning it to categories, adding extra details, and managing its visibility in your store and other channels.', 'fincommerce' ),
				),
			)
		);
		$product_catalog_section->add_block(
			array(
				'id'         => 'product-categories',
				'blockName'  => 'fincommerce/product-taxonomy-field',
				'order'      => 10,
				'attributes' => array(
					'slug'               => 'product_cat',
					'property'           => 'categories',
					'label'              => __( 'Categories', 'fincommerce' ),
					'createTitle'        => __( 'Create new category', 'fincommerce' ),
					'dialogNameHelpText' => __( 'Shown to customers on the product page.', 'fincommerce' ),
					'parentTaxonomyText' => __( 'Parent category', 'fincommerce' ),
					'placeholder'        => __( 'Search or create categories…', 'fincommerce' ),
				),
			)
		);
		$product_catalog_section->add_block(
			array(
				'id'         => 'product-tags',
				'blockName'  => 'fincommerce/product-tag-field',
				'attributes' => array(
					'name' => 'tags',
				),
			)
		);
		$product_catalog_section->add_block(
			array(
				'id'         => 'product-catalog-search-visibility',
				'blockName'  => 'fincommerce/product-catalog-visibility-field',
				'order'      => 20,
				'attributes' => array(
					'label'      => __( 'Hide in product catalog', 'fincommerce' ),
					'visibility' => CatalogVisibility::SEARCH,
				),
			)
		);
		$product_catalog_section->add_block(
			array(
				'id'         => 'product-catalog-catalog-visibility',
				'blockName'  => 'fincommerce/product-catalog-visibility-field',
				'order'      => 30,
				'attributes' => array(
					'label'      => __( 'Hide from search results', 'fincommerce' ),
					'visibility' => CatalogVisibility::CATALOG,
				),
			)
		);
		$product_catalog_section->add_block(
			array(
				'id'         => 'product-enable-product-reviews',
				'blockName'  => 'fincommerce/product-checkbox-field',
				'order'      => 40,
				'attributes' => array(
					'label'    => __( 'Enable product reviews', 'fincommerce' ),
					'property' => 'reviews_allowed',
				),
			)
		);
		$product_catalog_section->add_block(
			array(
				'id'         => 'product-post-password',
				'blockName'  => 'fincommerce/product-password-field',
				'order'      => 50,
				'attributes' => array(
					'label' => __( 'Require a password', 'fincommerce' ),
				),
			)
		);
		// Attributes section.
		$product_attributes_section = $organization_group->add_section(
			array(
				'id'         => 'product-attributes-section',
				'order'      => 20,
				'attributes' => array(
					'title'       => __( 'Attributes', 'fincommerce' ),
					'description' => __( 'Use global attributes to allow shoppers to filter and search for this product. Use custom attributes to provide detailed product information.', 'fincommerce' ),
					'blockGap'    => 'unit-40',
				),
			)
		);
		$product_attributes_section->add_block(
			array(
				'id'        => 'product-attributes',
				'blockName' => 'fincommerce/product-attributes-field',
				'order'     => 10,
			)
		);

		if ( Features::is_enabled( 'product-custom-fields' ) ) {
			$organization_group->add_section(
				array(
					'id'    => 'product-custom-fields-wrapper-section',
					'order' => 30,
				)
			)->add_block(
				array(
					'id'         => 'product-custom-fields-toggle',
					'blockName'  => 'fincommerce/product-custom-fields-toggle-field',
					'order'      => 10,
					'attributes' => array(
						'label' => __( 'Show custom fields', 'fincommerce' ),
					),
				)
			)->add_block(
				array(
					'id'         => 'product-custom-fields-section',
					'blockName'  => 'fincommerce/product-section',
					'order'      => 10,
					'attributes' => array(
						'blockGap'    => 'unit-30',
						'title'       => __( 'Custom fields', 'fincommerce' ),
						'description' => sprintf(
							/* translators: %1$s: Custom fields guide link opening tag. %2$s: Custom fields guide link closing tag. */
							__( 'Custom fields can be used in a variety of ways, such as sharing more detailed product information, showing more input fields, or for internal inventory organization. %1$sRead more about custom fields%2$s', 'fincommerce' ),
							'<a href="https://fincommerce.com/document/custom-product-fields/" target="_blank" rel="noreferrer">',
							'</a>'
						),
					),
				)
			)->add_block(
				array(
					'id'        => 'product-custom-fields',
					'blockName' => 'fincommerce/product-custom-fields',
					'order'     => 10,
				)
			);
		}
	}

	/**
	 * Get the tax classes as select options.
	 *
	 * @param string $post_type The post type.
	 * @return array Array of options.
	 */
	public static function get_tax_classes( $post_type = 'product' ) {
		$tax_classes = array();

		if ( 'product_variation' === $post_type ) {
			$tax_classes[] = array(
				'label' => __( 'Same as main product', 'fincommerce' ),
				'value' => 'parent',
			);
		}

		// Add standard class.
		$tax_classes[] = array(
			'label' => __( 'Standard rate', 'fincommerce' ),
			'value' => '',
		);

		$classes = WC_Tax::get_tax_rate_classes();

		foreach ( $classes as $tax_class ) {
			$tax_classes[] = array(
				'label' => $tax_class->name,
				'value' => $tax_class->slug,
			);
		}

		return $tax_classes;
	}

	/**
	 * Adds the inventory group blocks to the template.
	 */
	private function add_inventory_group_blocks() {
		$inventory_group = $this->get_group_by_id( $this::GROUP_IDS['INVENTORY'] );
		$inventory_group->add_block(
			array(
				'id'         => 'product_variation_notice_inventory_tab',
				'blockName'  => 'fincommerce/product-has-variations-notice',
				'order'      => 10,
				'attributes' => array(
					'content'    => __( 'This product has options, such as size or color. You can now manage each variation\'s inventory and other details individually.', 'fincommerce' ),
					'buttonText' => __( 'Go to Variations', 'fincommerce' ),
					'type'       => 'info',
				),
			)
		);
		// Product Inventory Section.
		$product_inventory_section       = $inventory_group->add_section(
			array(
				'id'         => 'product-inventory-section',
				'order'      => 20,
				'attributes' => array(
					'title'       => __( 'Inventory', 'fincommerce' ),
					'description' => sprintf(
					/* translators: %1$s: Inventory settings link opening tag. %2$s: Inventory settings link closing tag.*/
						__( 'Set up and manage inventory for this product, including status and available quantity. %1$sManage store inventory settings%2$s', 'fincommerce' ),
						'<a href="' . admin_url( 'admin.php?page=wc-settings&tab=products&section=inventory' ) . '" target="_blank" rel="noreferrer">',
						'</a>'
					),
					'blockGap'    => 'unit-40',
				),
			)
		);
		$product_inventory_inner_section = $product_inventory_section->add_subsection(
			array(
				'id'    => 'product-inventory-inner-section',
				'order' => 10,
			)
		);
		$inventory_columns               = $product_inventory_inner_section->add_block(
			array(
				'id'        => 'product-inventory-inner-columns',
				'blockName' => 'core/columns',
			)
		);
		$inventory_columns->add_block(
			array(
				'id'        => 'product-inventory-inner-column1',
				'blockName' => 'core/column',
			)
		)->add_block(
			array(
				'id'                => 'product-sku-field',
				'blockName'         => 'fincommerce/product-sku-field',
				'order'             => 10,
				'disableConditions' => array(
					array(
						'expression' => 'editedProduct.type === "variable"',
					),
				),
			)
		);
		$inventory_columns->add_block(
			array(
				'id'        => 'product-inventory-inner-column2',
				'blockName' => 'core/column',
			)
		)->add_block(
			array(
				'id'                => 'product-unique-id-field',
				'blockName'         => 'fincommerce/product-text-field',
				'order'             => 20,
				'attributes'        => array(
					'property' => 'global_unique_id',
					// translators: %1$s GTIN %2$s UPC %3$s EAN %4$s ISBN.
					'label'    => sprintf( __( '%1$s, %2$s, %3$s, or %4$s', 'fincommerce' ), '<abbr title="' . esc_attr__( 'Global Trade Item Number', 'fincommerce' ) . '">' . esc_html__( 'GTIN', 'fincommerce' ) . '</abbr>', '<abbr title="' . esc_attr__( 'Universal Product Code', 'fincommerce' ) . '">' . esc_html__( 'UPC', 'fincommerce' ) . '</abbr>', '<abbr title="' . esc_attr__( 'European Article Number', 'fincommerce' ) . '">' . esc_html__( 'EAN', 'fincommerce' ) . '</abbr>', '<abbr title="' . esc_attr__( 'International Standard Book Number', 'fincommerce' ) . '">' . esc_html__( 'ISBN', 'fincommerce' ) . '</abbr>' ),
					'tooltip'  => __( 'Enter a barcode or any other identifier unique to this product. It can help you list this product on other channels or marketplaces.', 'fincommerce' ),
					'pattern'  => array(
						'value'   => '[0-9\-]*',
						'message' => __( 'Please enter only numbers and hyphens (-).', 'fincommerce' ),
					),
				),
				'disableConditions' => array(
					array(
						'expression' => 'editedProduct.type === "variable"',
					),
				),
			)
		);

		$manage_stock = 'yes' === get_option( 'fincommerce_manage_stock' );
		$product_inventory_inner_section->add_block(
			array(
				'id'                => 'product-track-stock',
				'blockName'         => 'fincommerce/product-toggle-field',
				'order'             => 20,
				'attributes'        => array(
					'label'        => __( 'Track inventory', 'fincommerce' ),
					'property'     => 'manage_stock',
					'disabled'     => ! $manage_stock,
					'disabledCopy' => ! $manage_stock ? sprintf(
						/* translators: %1$s: Learn more link opening tag. %2$s: Learn more link closing tag.*/
						__( 'Per your %1$sstore settings%2$s, inventory management is <strong>disabled</strong>.', 'fincommerce' ),
						'<a href="' . admin_url( 'admin.php?page=wc-settings&tab=products&section=inventory' ) . '" target="_blank" rel="noreferrer">',
						'</a>'
					) : null,
				),
				'hideConditions'    => array(
					array(
						'expression' => 'editedProduct.type === "external" || editedProduct.type === "grouped"',
					),
				),
				'disableConditions' => array(
					array(
						'expression' => 'editedProduct.type === "variable"',
					),
				),
			)
		);
		$product_inventory_quantity_hide_conditions   = array(
			array(
				'expression' => 'editedProduct.manage_stock === false',
			),
		);
		$product_inventory_quantity_hide_conditions[] = array(
			'expression' => 'editedProduct.type === "grouped"',
		);
		$product_inventory_inner_section->add_block(
			array(
				'id'             => 'product-inventory-quantity',
				'blockName'      => 'fincommerce/product-inventory-quantity-field',
				'order'          => 30,
				'hideConditions' => $product_inventory_quantity_hide_conditions,
			)
		);
		$product_stock_status_hide_conditions   = array(
			array(
				'expression' => 'editedProduct.manage_stock === true',
			),
		);
		$product_stock_status_hide_conditions[] = array(
			'expression' => 'editedProduct.type === "grouped"',
		);
		$product_inventory_section->add_block(
			array(
				'id'                => 'product-stock-status',
				'blockName'         => 'fincommerce/product-radio-field',
				'order'             => 10,
				'attributes'        => array(
					'title'    => __( 'Stock status', 'fincommerce' ),
					'property' => 'stock_status',
					'options'  => array(
						array(
							'label' => __( 'In stock', 'fincommerce' ),
							'value' => ProductStockStatus::IN_STOCK,
						),
						array(
							'label' => __( 'Out of stock', 'fincommerce' ),
							'value' => ProductStockStatus::OUT_OF_STOCK,
						),
						array(
							'label' => __( 'On backorder', 'fincommerce' ),
							'value' => ProductStockStatus::ON_BACKORDER,
						),
					),
				),
				'hideConditions'    => $product_stock_status_hide_conditions,
				'disableConditions' => array(
					array(
						'expression' => 'editedProduct.type === "variable"',
					),
				),
			)
		);

		$product_inventory_section->add_block(
			array(
				'id'         => 'product-purchase-note',
				'blockName'  => 'fincommerce/product-text-area-field',
				'order'      => 20,
				'attributes' => array(
					'property'    => 'purchase_note',
					'label'       => __( 'Post-purchase note', 'fincommerce' ),
					'placeholder' => __( 'Enter an optional note attached to the order confirmation message sent to the shopper.', 'fincommerce' ),
					'lock'        => array(
						'move' => true,
					),
				),
			)
		);

		$product_inventory_advanced         = $product_inventory_section->add_block(
			array(
				'id'             => 'product-inventory-advanced',
				'blockName'      => 'fincommerce/product-collapsible',
				'order'          => 30,
				'attributes'     => array(
					'toggleText'       => __( 'Advanced', 'fincommerce' ),
					'initialCollapsed' => true,
					'persistRender'    => true,
				),
				'hideConditions' => array(
					array(
						'expression' => 'editedProduct.type === "grouped"',
					),
				),
			)
		);
		$product_inventory_advanced_wrapper = $product_inventory_advanced->add_block(
			array(
				'blockName'  => 'fincommerce/product-section',
				'order'      => 10,
				'attributes' => array(
					'blockGap' => 'unit-40',
				),
			)
		);
		$product_inventory_advanced_wrapper->add_block(
			array(
				'id'             => 'product-out-of-stock',
				'blockName'      => 'fincommerce/product-radio-field',
				'order'          => 10,
				'attributes'     => array(
					'title'    => __( 'When out of stock', 'fincommerce' ),
					'property' => 'backorders',
					'options'  => array(
						array(
							'label' => __( 'Allow purchases', 'fincommerce' ),
							'value' => 'yes',
						),
						array(
							'label' => __(
								'Allow purchases, but notify customers',
								'fincommerce'
							),
							'value' => 'notify',
						),
						array(
							'label' => __( "Don't allow purchases", 'fincommerce' ),
							'value' => 'no',
						),
					),
				),
				'hideConditions' => array(
					array(
						'expression' => 'editedProduct.manage_stock === false',
					),
				),
			)
		);
		$product_inventory_advanced_wrapper->add_block(
			array(
				'id'             => 'product-inventory-email',
				'blockName'      => 'fincommerce/product-inventory-email-field',
				'order'          => 20,
				'hideConditions' => array(
					array(
						'expression' => 'editedProduct.manage_stock === false',
					),
				),
			)
		);

		$product_inventory_advanced_wrapper->add_block(
			array(
				'id'         => 'product-limit-purchase',
				'blockName'  => 'fincommerce/product-checkbox-field',
				'order'      => 20,
				'attributes' => array(
					'title'    => __(
						'Restrictions',
						'fincommerce'
					),
					'label'    => __(
						'Limit purchases to 1 item per order',
						'fincommerce'
					),
					'property' => 'sold_individually',
					'tooltip'  => __(
						'When checked, customers will be able to purchase only 1 item in a single order. This is particularly useful for items that have limited quantity, like art or handmade goods.',
						'fincommerce'
					),
				),
			)
		);
	}

	/**
	 * Adds the shipping group blocks to the template.
	 */
	private function add_shipping_group_blocks() {
		$shipping_group = $this->get_group_by_id( $this::GROUP_IDS['SHIPPING'] );
		$shipping_group->add_block(
			array(
				'id'         => 'product_variation_notice_shipping_tab',
				'blockName'  => 'fincommerce/product-has-variations-notice',
				'order'      => 10,
				'attributes' => array(
					'content'    => __( 'This product has options, such as size or color. You can now manage each variation\'s shipping settings and other details individually.', 'fincommerce' ),
					'buttonText' => __( 'Go to Variations', 'fincommerce' ),
					'type'       => 'info',
				),
			)
		);
		// Virtual section.
		$shipping_group->add_section(
			array(
				'id'             => 'product-virtual-section',
				'order'          => 10,
				'hideConditions' => array(
					array(
						'expression' => 'editedProduct.type !== "simple"',
					),
				),
			)
		)->add_block(
			array(
				'id'         => 'product-virtual',
				'blockName'  => 'fincommerce/product-toggle-field',
				'order'      => 10,
				'attributes' => array(
					'property'       => 'virtual',
					'checkedValue'   => false,
					'uncheckedValue' => true,
					'label'          => __( 'This product requires shipping or pickup', 'fincommerce' ),
					'uncheckedHelp'  => __( 'This product will not trigger your customer\'s shipping calculator in cart or at checkout. This product also won\'t require your customers to enter their shipping details at checkout. <a href="https://fincommerce.com/document/managing-products/#adding-a-virtual-product" target="_blank" rel="noreferrer">Read more about virtual products</a>.', 'fincommerce' ),
				),
			)
		);
		// Product Shipping Section.
		$product_fee_and_dimensions_section = $shipping_group->add_section(
			array(
				'id'         => 'product-fee-and-dimensions-section',
				'order'      => 20,
				'attributes' => array(
					'title'       => __( 'Fees & dimensions', 'fincommerce' ),
					'description' => sprintf(
					/* translators: %1$s: How to get started? link opening tag. %2$s: How to get started? link closing tag.*/
						__( 'Set up shipping costs and enter dimensions used for accurate rate calculations. %1$sHow to get started?%2$s', 'fincommerce' ),
						'<a href="https://fincommerce.com/posts/how-to-calculate-shipping-costs-for-your-fincommerce-store/" target="_blank" rel="noreferrer">',
						'</a>'
					),
				),
			)
		);
		$product_fee_and_dimensions_section->add_block(
			array(
				'id'                => 'product-shipping-class',
				'blockName'         => 'fincommerce/product-shipping-class-field',
				'order'             => 10,
				'disableConditions' => array(
					array(
						'expression' => 'editedProduct.type === "variable"',
					),
				),
			)
		);
		$product_fee_and_dimensions_section->add_block(
			array(
				'id'                => 'product-shipping-dimensions',
				'blockName'         => 'fincommerce/product-shipping-dimensions-fields',
				'order'             => 20,
				'disableConditions' => array(
					array(
						'expression' => 'editedProduct.type === "variable"',
					),
				),
			)
		);
	}

	/**
	 * Adds the variation group blocks to the template.
	 */
	private function add_variation_group_blocks() {
		$variation_group = $this->get_group_by_id( $this::GROUP_IDS['VARIATIONS'] );
		if ( ! $variation_group ) {
			return;
		}

		$variation_group->add_section(
			array(
				'id'         => 'product-variation-options-section',
				'order'      => 10,
				'attributes' => array(
					'title'       => __( 'Variation options', 'fincommerce' ),
					'description' => __( 'Add and manage attributes used for product options, such as size and color.', 'fincommerce' ),
				),
			)
		)->add_block(
			array(
				'id'        => 'product-variation-options',
				'blockName' => 'fincommerce/product-variations-options-field',
				'order'     => 10,
			)
		);

		$variation_group->add_section(
			array(
				'id'         => 'product-variation-section',
				'order'      => 20,
				'attributes' => array(
					'title'       => __( 'Variations', 'fincommerce' ),
					'description' => __( 'Manage individual product combinations created from options.', 'fincommerce' ),
				),
			)
		)->add_block(
			array(
				'id'        => 'product-variation-items',
				'blockName' => 'fincommerce/product-variation-items-field',
				'order'     => 10,
			)
		);
	}

	/**
	 * Adds the linked products group blocks to the template.
	 */
	private function add_linked_products_group_blocks() {
		$linked_products_group = $this->get_group_by_id( $this::GROUP_IDS['LINKED_PRODUCTS'] );
		if ( ! isset( $linked_products_group ) ) {
			return;
		}

		$linked_products_group->add_section(
			array(
				'id'         => 'product-linked-upsells-section',
				'order'      => 10,
				'attributes' => array(
					'title'       => __( 'Upsells', 'fincommerce' ),
					'description' => sprintf(
						/* translators: %1$s: "Learn more about linked products" link opening tag. %2$s: "Learn more about linked products" link closing tag. */
						__( 'Upsells are typically products that are extra profitable or better quality or more expensive. Experiment with combinations to boost sales. %1$sLearn more about linked products%2$s', 'fincommerce' ),
						'<br /><a href="https://fincommerce.com/document/related-products-up-sells-and-cross-sells/" target="_blank" rel="noreferrer">',
						'</a>'
					),
				),
			)
		)->add_block(
			array(
				'id'         => 'product-linked-upsells',
				'blockName'  => 'fincommerce/product-linked-list-field',
				'order'      => 10,
				'attributes' => array(
					'property'   => 'upsell_ids',
					'emptyState' => array(
						'image'         => 'ShoppingBags',
						'tip'           => __(
							'Tip: Upsells are products that are extra profitable or better quality or more expensive. Experiment with combinations to boost sales.',
							'fincommerce'
						),
						'isDismissible' => true,
					),
				),
			)
		);

		$linked_products_group->add_section(
			array(
				'id'             => 'product-linked-cross-sells-section',
				'order'          => 20,
				'attributes'     => array(
					'title'       => __( 'Cross-sells', 'fincommerce' ),
					'description' => sprintf(
						/* translators: %1$s: "Learn more about linked products" link opening tag. %2$s: "Learn more about linked products" link closing tag. */
						__( 'By suggesting complementary products in the cart using cross-sells, you can significantly increase the average order value. %1$sLearn more about linked products%2$s', 'fincommerce' ),
						'<br /><a href="https://fincommerce.com/document/related-products-up-sells-and-cross-sells/" target="_blank" rel="noreferrer">',
						'</a>'
					),
				),
				'hideConditions' => array(
					array(
						'expression' => 'editedProduct.type === "external" || editedProduct.type === "grouped"',
					),
				),
			)
		)->add_block(
			array(
				'id'         => 'product-linked-cross-sells',
				'blockName'  => 'fincommerce/product-linked-list-field',
				'order'      => 10,
				'attributes' => array(
					'property'   => 'cross_sell_ids',
					'emptyState' => array(
						'image'         => 'CashRegister',
						'tip'           => __(
							'Tip: By suggesting complementary products in the cart using cross-sells, you can significantly increase the average order value.',
							'fincommerce'
						),
						'isDismissible' => true,
					),
				),
			)
		);
	}
}
