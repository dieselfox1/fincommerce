<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/archive-product.php.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 8.6.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

/**
 * Hook: fincommerce_before_main_content.
 *
 * @hooked fincommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked fincommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
do_action( 'fincommerce_before_main_content' );

/**
 * Hook: fincommerce_shop_loop_header.
 *
 * @since 8.6.0
 *
 * @hooked fincommerce_product_taxonomy_archive_header - 10
 */
do_action( 'fincommerce_shop_loop_header' );

if ( fincommerce_product_loop() ) {

	/**
	 * Hook: fincommerce_before_shop_loop.
	 *
	 * @hooked fincommerce_output_all_notices - 10
	 * @hooked fincommerce_result_count - 20
	 * @hooked fincommerce_catalog_ordering - 30
	 */
	do_action( 'fincommerce_before_shop_loop' );

	fincommerce_product_loop_start();

	if ( wc_get_loop_prop( 'total' ) ) {
		while ( have_posts() ) {
			the_post();

			/**
			 * Hook: fincommerce_shop_loop.
			 */
			do_action( 'fincommerce_shop_loop' );

			wc_get_template_part( 'content', 'product' );
		}
	}

	fincommerce_product_loop_end();

	/**
	 * Hook: fincommerce_after_shop_loop.
	 *
	 * @hooked fincommerce_pagination - 10
	 */
	do_action( 'fincommerce_after_shop_loop' );
} else {
	/**
	 * Hook: fincommerce_no_products_found.
	 *
	 * @hooked wc_no_products_found - 10
	 */
	do_action( 'fincommerce_no_products_found' );
}

/**
 * Hook: fincommerce_after_main_content.
 *
 * @hooked fincommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action( 'fincommerce_after_main_content' );

/**
 * Hook: fincommerce_sidebar.
 *
 * @hooked fincommerce_get_sidebar - 10
 */
do_action( 'fincommerce_sidebar' );

get_footer( 'shop' );
