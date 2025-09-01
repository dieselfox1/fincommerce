<?php
/**
 * Admin View: Notice - Regenerating thumbnails.
 */

defined( 'ABSPATH' ) || exit;

?>
<div id="message" class="updated fincommerce-message">
	<a class="fincommerce-message-close notice-dismiss" href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'wc-hide-notice', 'regenerating_thumbnails' ), 'fincommerce_hide_notices_nonce', '_wc_notice_nonce' ) ); ?>"><?php _e( 'Cancel thumbnail regeneration', 'fincommerce' ); ?></a>

	<p><?php esc_html_e( 'Thumbnail regeneration is running in the background. Depending on the amount of images in your store this may take a while.', 'fincommerce' ); ?></p>
</div>
