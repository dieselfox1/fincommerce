<?php
/**
 * Admin cancelled order email (initial block content)
 *
 * This template can be overridden by editing it in the FinCommerce email editor.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates\Emails\Block
 * @version 10.2.0
 */

use Automattic\FinCommerce\Internal\EmailEditor\BlockEmailRenderer;

defined( 'ABSPATH' ) || exit;

// phpcs:disable Squiz.PHP.EmbeddedPhp.ContentBeforeOpen -- removed to prevent empty new lines.
// phpcs:disable Squiz.PHP.EmbeddedPhp.ContentAfterEnd -- removed to prevent empty new lines.
?>

<!-- wp:heading -->
<h2 class="wp-block-heading"><?php
/* translators: %s: order number */
printf( esc_html__( 'Order cancelled: #%s,', 'fincommerce' ), '<!--[fincommerce/order-number]-->' );
?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php
	/* translators: %1$s: Order number. %2$s: Customer full name */
	$text = __( 'We’re getting in touch to let you know that order #%1$s from %2$s has been cancelled.', 'fincommerce' );
	printf( esc_html( $text ), '<!--[fincommerce/order-number]-->', '<!--[fincommerce/customer-full-name]-->' );
?></p>
<!-- /wp:paragraph -->

<!-- wp:fincommerce/email-content {"lock":{"move":false,"remove":true}} -->
<div class="wp-block-fincommerce-email-content"> <?php echo esc_html( BlockEmailRenderer::WOO_EMAIL_CONTENT_PLACEHOLDER ); ?> </div>
<!-- /wp:fincommerce/email-content -->

<!-- wp:paragraph -->
<p> <?php echo esc_html__( 'Thanks for reading.', 'fincommerce' ); ?> </p>
<!-- /wp:paragraph -->
