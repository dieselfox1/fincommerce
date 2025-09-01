/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TemplateDetails } from '@fincommerce/block-library/assets/js/blocks/classic-template/types';

export const BLOCK_SLUG = 'fincommerce/legacy-template';
export const TYPES = {
	singleProduct: 'single-product',
	productCatalog: 'product-catalog',
	productTaxonomy: 'product-taxonomy',
	productSearchResults: 'product-search-results',
	orderConfirmation: 'order-confirmation',
	checkoutHeader: 'checkout-header',
};
export const PLACEHOLDERS = {
	singleProduct: 'single-product',
	archiveProduct: 'archive-product',
	orderConfirmation: 'fallback',
	checkoutHeader: 'checkout-header',
};

export const TEMPLATES: TemplateDetails = {
	'single-product': {
		type: TYPES.singleProduct,
		title: __( 'Product (Classic)', 'fincommerce' ),
		description: __( 'Displays the PHP product page.', 'fincommerce' ),
		placeholder: PLACEHOLDERS.singleProduct,
	},
	'archive-product': {
		type: TYPES.productCatalog,
		title: __( 'Product Grid (Classic)', 'fincommerce' ),
		description: __(
			'Displays the PHP product grid page. ',
			'fincommerce'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'taxonomy-product_cat': {
		type: TYPES.productTaxonomy,
		title: __( 'Product Category (Classic)', 'fincommerce' ),
		description: __(
			'Displays the PHP product category page.',
			'fincommerce'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'taxonomy-product_tag': {
		type: TYPES.productTaxonomy,
		title: __( 'Product Tag (Classic)', 'fincommerce' ),
		description: __( 'Displays the PHP product tag page.', 'fincommerce' ),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'taxonomy-product_attribute': {
		type: TYPES.productTaxonomy,
		title: __( 'Product Attribute (Classic)', 'fincommerce' ),
		description: __(
			'Displays the PHP product attribute page.',
			'fincommerce'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	// Since that it is a fallback value, it has to be the last one.
	'taxonomy-product': {
		type: TYPES.productTaxonomy,
		title: __( "Product's Custom Taxonomy (Classic)", 'fincommerce' ),
		description: __(
			"Displays the PHP product's custom taxonomy page.",
			'fincommerce'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'product-search-results': {
		type: TYPES.productSearchResults,
		title: __( 'Product Search Results (Classic)', 'fincommerce' ),
		description: __(
			'Displays the PHP product search results.',
			'fincommerce'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'checkout-header': {
		type: TYPES.checkoutHeader,
		title: __( 'Checkout Header', 'fincommerce' ),
		placeholder: 'checkout-header',
	},
	'order-confirmation': {
		type: TYPES.orderConfirmation,
		title: __( 'Order Confirmation Block', 'fincommerce' ),
		placeholder: PLACEHOLDERS.orderConfirmation,
	},
};
