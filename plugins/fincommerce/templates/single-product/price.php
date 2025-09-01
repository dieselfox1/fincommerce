<?php
/**
 * Single Product Price
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/single-product/price.php.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 3.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $product;

?>
<p class="<?php echo esc_attr( apply_filters( 'fincommerce_product_price_class', 'price' ) ); ?>"><?php echo $product->get_price_html(); ?></p>
