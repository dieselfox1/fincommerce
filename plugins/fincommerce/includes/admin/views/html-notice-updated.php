<?php
/**
 * Admin View: Notice - Updated.
 *
 * @package FinCommerce\Admin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div id="message" class="updated fincommerce-message wc-connect fincommerce-message--success">
	<a class="fincommerce-message-close notice-dismiss" href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'wc-hide-notice', 'update', remove_query_arg( 'do_update_fincommerce' ) ), 'fincommerce_hide_notices_nonce', '_wc_notice_nonce' ) ); ?>"><?php esc_html_e( 'Dismiss', 'fincommerce' ); ?></a>

	<p><?php esc_html_e( 'FinCommerce database update complete. Thank you for updating to the latest version!', 'fincommerce' ); ?></p>
</div>
