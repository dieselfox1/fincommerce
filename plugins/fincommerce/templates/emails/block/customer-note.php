<?php
/**
 * Customer note email (initial block content)
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
<h2 class="wp-block-heading"> <?php echo esc_html__( 'A note has been added to your order', 'fincommerce' ); ?> </h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php
	/* translators: %s: Customer first name */
	printf( esc_html__( 'Hi %s,', 'fincommerce' ), '<!--[fincommerce/customer-first-name]-->' );
?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p> <?php echo esc_html__( 'The following note has been added to your order:', 'fincommerce' ); ?> </p>
<!-- /wp:paragraph -->

<!-- wp:quote {"lock":{"move":false,"remove":true}} -->
<blockquote class="wp-block-quote">
<!-- wp:paragraph {"lock":{"move":false,"remove":true}} -->
<p> <?php echo '| <!--[fincommerce/admin-order-note]--> |'; // phpcs:ignore finpress.Security.EscapeOutput.OutputNotEscaped ?>  </p>
<!-- /wp:paragraph -->
</blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p> <?php echo esc_html__( 'As a reminder, here are your order details:', 'fincommerce' ); ?> </p>
<!-- /wp:paragraph -->

<!-- wp:fincommerce/email-content {"lock":{"move":false,"remove":true}} -->
<div class="wp-block-fincommerce-email-content"> <?php echo esc_html( BlockEmailRenderer::WOO_EMAIL_CONTENT_PLACEHOLDER ); ?> </div>
<!-- /wp:fincommerce/email-content -->

<!-- wp:paragraph -->
<p><?php
/* translators: %s: Store admin email */
	printf( esc_html__( 'Thanks again! If you need any help with your order, please contact us at %s,', 'fincommerce' ), '<!--[fincommerce/store-email]-->' );
?></p>
<!-- /wp:paragraph -->
