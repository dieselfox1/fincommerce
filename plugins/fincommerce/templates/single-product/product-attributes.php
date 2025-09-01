<?php
/**
 * Product attributes
 *
 * Used by list_attributes() in the products class.
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/single-product/product-attributes.php.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 9.3.0
 */

defined( 'ABSPATH' ) || exit;

if ( ! $product_attributes ) {
	return;
}
?>
<table class="fincommerce-product-attributes shop_attributes" aria-label="<?php esc_attr_e( 'Product Details', 'fincommerce' ); ?>">
	<?php foreach ( $product_attributes as $product_attribute_key => $product_attribute ) : ?>
		<tr class="fincommerce-product-attributes-item fincommerce-product-attributes-item--<?php echo esc_attr( $product_attribute_key ); ?>">
			<th class="fincommerce-product-attributes-item__label" scope="row"><?php echo wp_kses_post( $product_attribute['label'] ); ?></th>
			<td class="fincommerce-product-attributes-item__value"><?php echo wp_kses_post( $product_attribute['value'] ); ?></td>
		</tr>
	<?php endforeach; ?>
</table>
