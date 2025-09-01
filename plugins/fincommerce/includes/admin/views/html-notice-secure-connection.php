<?php
/**
 * Admin View: Notice - Secure connection.
 *
 * @package FinCommerce\Admin\Notices
 */

defined( 'ABSPATH' ) || exit;

?>
<div id="message" class="updated fincommerce-message">
	<a class="fincommerce-message-close notice-dismiss" href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'wc-hide-notice', 'no_secure_connection' ), 'fincommerce_hide_notices_nonce', '_wc_notice_nonce' ) ); ?>"><?php esc_html_e( 'Dismiss', 'fincommerce' ); ?></a>

	<p>
	<?php
		echo wp_kses_post( sprintf(
			/* translators: %s: documentation URL */
			__( 'Your store does not appear to be using a secure connection. We highly recommend serving your entire website over an HTTPS connection to help keep customer data secure. <a href="%s">Learn more here.</a>', 'fincommerce' ),
			'https://fincommerce.com/document/ssl-and-https/'
		) );
	?>
	</p>
</div>
