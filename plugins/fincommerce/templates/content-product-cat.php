<?php
/**
 * The template for displaying product category thumbnails within loops
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/content-product-cat.php.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 4.7.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<li <?php wc_product_cat_class( '', $category ); ?>>
	<?php
	/**
	 * The fincommerce_before_subcategory hook.
	 *
	 * @hooked fincommerce_template_loop_category_link_open - 10
	 */
	do_action( 'fincommerce_before_subcategory', $category );

	/**
	 * The fincommerce_before_subcategory_title hook.
	 *
	 * @hooked fincommerce_subcategory_thumbnail - 10
	 */
	do_action( 'fincommerce_before_subcategory_title', $category );

	/**
	 * The fincommerce_shop_loop_subcategory_title hook.
	 *
	 * @hooked fincommerce_template_loop_category_title - 10
	 */
	do_action( 'fincommerce_shop_loop_subcategory_title', $category );

	/**
	 * The fincommerce_after_subcategory_title hook.
	 */
	do_action( 'fincommerce_after_subcategory_title', $category );

	/**
	 * The fincommerce_after_subcategory hook.
	 *
	 * @hooked fincommerce_template_loop_category_link_close - 10
	 */
	do_action( 'fincommerce_after_subcategory', $category );
	?>
</li>
