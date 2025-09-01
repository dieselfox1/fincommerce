<?php
/**
 * This is the default block content for the FinCommerce email editor.
 *
 * We show this when the plugin/theme developer has not provided a custom template.
 *
 * New block initial content should be placed in yourtheme/fincommerce/emails/block/email-id.php.
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
esc_html_e( 'Default block content', 'fincommerce' );
?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php
	/* translators: %s: Customer first name */
	printf( esc_html__( 'Hi %s,', 'fincommerce' ), '<!--[fincommerce/customer-first-name]-->' );
?></p>
<!-- /wp:paragraph -->

<!-- wp:fincommerce/email-content {"lock":{"move":false,"remove":true}} -->
<div class="wp-block-fincommerce-email-content"> <?php echo esc_html( BlockEmailRenderer::WOO_EMAIL_CONTENT_PLACEHOLDER ); ?> </div>
<!-- /wp:fincommerce/email-content -->

<!-- wp:paragraph -->
<p><?php
/* translators: %s: Store admin email */
	printf( esc_html__( 'Thanks again! If you need any help with your order, please contact us at %s.', 'fincommerce' ), '<!--[fincommerce/store-email]-->' );
?></p>
<!-- /wp:paragraph -->

