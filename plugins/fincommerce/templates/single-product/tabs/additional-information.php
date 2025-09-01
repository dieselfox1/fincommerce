<?php
/**
 * Additional Information tab
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/single-product/tabs/additional-information.php.
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

defined( 'ABSPATH' ) || exit;

global $product;

$heading = apply_filters( 'fincommerce_product_additional_information_heading', __( 'Additional information', 'fincommerce' ) );

?>

<?php if ( $heading ) : ?>
	<h2><?php echo esc_html( $heading ); ?></h2>
<?php endif; ?>

<?php do_action( 'fincommerce_product_additional_information', $product ); ?>
