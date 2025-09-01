<?php
/**
 * Helper Admin Notice - Woo Updater Plugin is not activated.
 *
 * @package FinCommerce\Views
 */

defined( 'ABSPATH' ) || exit;
?>
<div id="message" class="error fincommerce-message">
	<a class="fincommerce-message-close notice-dismiss" href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'wc-hide-notice', 'woo_updater_not_activated' ), 'fincommerce_hide_notices_nonce', '_wc_notice_nonce' ) ); ?>"><?php esc_html_e( 'Dismiss', 'fincommerce' ); ?></a>
	<p>
		<?php
		echo wp_kses_post(
			sprintf(
			/* translators: 1: WP plugin management URL */
				__(
					'Please <a href="%1$s">activate the FinCommerce.com Update Manager</a> to continue receiving the updates and streamlined support included in your FinCommerce.com subscriptions.',
					'fincommerce'
				),
				esc_url( admin_url( 'plugins.php' ) ),
			)
		);
		?>
	</p>
</div>
