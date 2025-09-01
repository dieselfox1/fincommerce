<?php
/**
 * Customer POS completed order email (initial block content)
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

?>

<!-- wp:paragraph -->
<p> <?php echo esc_html__( 'Hi there,', 'fincommerce' ); ?> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p> <?php echo esc_html__( 'Here’s a reminder of what you’ve bought:', 'fincommerce' ); ?> </p>
<!-- /wp:paragraph -->

<!-- wp:fincommerce/email-content {"lock":{"move":false,"remove":true}} -->
<div class="wp-block-fincommerce-email-content"> <?php echo esc_html( BlockEmailRenderer::WOO_EMAIL_CONTENT_PLACEHOLDER ); ?> </div>
<!-- /wp:fincommerce/email-content -->
