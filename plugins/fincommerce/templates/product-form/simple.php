<?php
/**
 * Simple Product Form
 *
 * Title: Simple
 * Slug: simple
 * Description: A single physical or virtual product, e.g. a t-shirt or an eBook
 * Product Types: simple, variable
 *
 * @package FinCommerce\Templates
 * @version 9.1.0-beta.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<!-- wp:fincommerce/product-section {"title":"<?php esc_attr_e( 'Basic details', 'fincommerce' ); ?>"} -->
<div data-block-name="fincommerce/product-section" class="wp-block-fincommerce-product-section" data-title="<?php esc_attr_e( 'Basic details', 'fincommerce' ); ?>">
	<div>
		<!-- wp:fincommerce/product-regular-price-field -->
		<div data-block-name="fincommerce/product-regular-price-field" class="wp-block-fincommerce-product-regular-price-field"></div>
		<!-- /wp:fincommerce/product-regular-price-field -->

		<!-- wp:fincommerce/product-checkbox-field {"label":"<?php esc_attr_e( 'Translatable Label', 'fincommerce' ); ?>","property":"testproperty"} -->
		<div data-block-name="fincommerce/product-checkbox-field" class="wp-block-fincommerce-product-checkbox-field" data-label="<?php esc_attr_e( 'Translatable Label', 'fincommerce' ); ?>"></div>
		<!-- /wp:fincommerce/product-checkbox-field -->
	</div>
</div>
<!-- /wp:fincommerce/product-section -->
