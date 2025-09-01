<?php
/**
 * Product taxonomy archive header
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/loop/header.php.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 8.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<header class="fincommerce-products-header">
	<?php
	/**
	 * Hook: fincommerce_show_page_title.
	 *
	 * Allow developers to remove the product taxonomy archive page title.
	 *
	 * @since 2.0.6.
	 */
	if ( apply_filters( 'fincommerce_show_page_title', true ) ) :
		?>
		<h1 class="fincommerce-products-header__title page-title"><?php fincommerce_page_title(); ?></h1>
	<?php endif; ?>

	<?php
	/**
	 * Hook: fincommerce_archive_description.
	 *
	 * @since 1.6.2.
	 * @hooked fincommerce_taxonomy_archive_description - 10
	 * @hooked fincommerce_product_archive_description - 10
	 */
	do_action( 'fincommerce_archive_description' );
	?>
</header>
