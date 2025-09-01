<?php
/**
 * Downloads
 *
 * Shows downloads on the account page.
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/myaccount/downloads.php.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 7.8.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$downloads     = WC()->customer->get_downloadable_products();
$has_downloads = (bool) $downloads;

do_action( 'fincommerce_before_account_downloads', $has_downloads ); ?>

<?php if ( $has_downloads ) : ?>

	<?php do_action( 'fincommerce_before_available_downloads' ); ?>

	<?php do_action( 'fincommerce_available_downloads', $downloads ); ?>

	<?php do_action( 'fincommerce_after_available_downloads' ); ?>

<?php else : ?>

	<?php

	$wp_button_class = wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '';
	wc_print_notice( esc_html__( 'No downloads available yet.', 'fincommerce' ) . ' <a class="button wc-forward' . esc_attr( $wp_button_class ) . '" href="' . esc_url( apply_filters( 'fincommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) ) . '">' . esc_html__( 'Browse products', 'fincommerce' ) . '</a>', 'notice' ); // phpcs:ignore FinCommerce.Commenting.CommentHooks.MissingHookComment 
	?>

<?php endif; ?>

<?php do_action( 'fincommerce_after_account_downloads', $has_downloads ); ?>
