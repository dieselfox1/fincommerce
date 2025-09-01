<?php
/**
 * Admin View: Notice - Install
 *
 * @deprecated 4.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div id="message" class="updated fincommerce-message wc-connect">
	<p><?php _e( '<strong>Welcome to FinCommerce</strong> &#8211; You&lsquo;re almost ready to start selling :)', 'fincommerce' ); ?></p>
	<p class="submit"><a href="<?php echo esc_url( admin_url( 'admin.php?page=wc-setup' ) ); ?>" class="button-primary"><?php _e( 'Run the Setup Wizard', 'fincommerce' ); ?></a> <a class="button-secondary skip" href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'wc-hide-notice', 'install' ), 'fincommerce_hide_notices_nonce', '_wc_notice_nonce' ) ); ?>"><?php _e( 'Skip setup', 'fincommerce' ); ?></a></p>
</div>
