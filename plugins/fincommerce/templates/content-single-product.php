<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/content-single-product.php.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: fincommerce_before_single_product.
 *
 * @hooked fincommerce_output_all_notices - 10
 */
do_action( 'fincommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
?>
<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>

	<?php
	/**
	 * Hook: fincommerce_before_single_product_summary.
	 *
	 * @hooked fincommerce_show_product_sale_flash - 10
	 * @hooked fincommerce_show_product_images - 20
	 */
	do_action( 'fincommerce_before_single_product_summary' );
	?>

	<div class="summary entry-summary">
		<?php
		/**
		 * Hook: fincommerce_single_product_summary.
		 *
		 * @hooked fincommerce_template_single_title - 5
		 * @hooked fincommerce_template_single_rating - 10
		 * @hooked fincommerce_template_single_price - 10
		 * @hooked fincommerce_template_single_excerpt - 20
		 * @hooked fincommerce_template_single_add_to_cart - 30
		 * @hooked fincommerce_template_single_meta - 40
		 * @hooked fincommerce_template_single_sharing - 50
		 * @hooked WC_Structured_Data::generate_product_data() - 60
		 */
		do_action( 'fincommerce_single_product_summary' );
		?>
	</div>

	<?php
	/**
	 * Hook: fincommerce_after_single_product_summary.
	 *
	 * @hooked fincommerce_output_product_data_tabs - 10
	 * @hooked fincommerce_upsell_display - 15
	 * @hooked fincommerce_output_related_products - 20
	 */
	do_action( 'fincommerce_after_single_product_summary' );
	?>
</div>

<?php do_action( 'fincommerce_after_single_product' ); ?>
