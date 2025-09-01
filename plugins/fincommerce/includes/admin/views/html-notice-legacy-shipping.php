<?php
/**
 * Admin View: Notice - Legacy Shipping.
 *
 * @package FinCommerce\Admin\Notices
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div id="message" class="updated fincommerce-message">
	<a class="fincommerce-message-close notice-dismiss" href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'wc-hide-notice', 'legacy_shipping' ), 'fincommerce_hide_notices_nonce', '_wc_notice_nonce' ) ); ?>">
		<?php esc_html_e( 'Dismiss', 'fincommerce' ); ?>
	</a>

	<p class="main">
		<strong><?php esc_html_e( 'New:', 'fincommerce' ); ?> <?php esc_html_e( 'Shipping zones', 'fincommerce' ); ?></strong> &#8211; <?php esc_html_e( 'a group of regions that can be assigned different shipping methods and rates.', 'fincommerce' ); ?>
	</p>
	<p>
		<?php esc_html_e( 'Legacy shipping methods (flat rate, international flat rate, local pickup and delivery, and free shipping) are deprecated but will continue to work as normal for now. <b><em>They will be removed in future versions of FinCommerce</em></b>. We recommend disabling these and setting up new rates within shipping zones as soon as possible.', 'fincommerce' ); ?>
	</p>

	<p class="submit">
		<?php if ( ! is_wc_admin_settings_page() || empty( $_GET['tab'] ) || 'shipping' !== $_GET['tab'] ) : // phpcs:ignore WordPress.Security.NonceVerification.Recommended ?>
			<a class="button-primary" href="<?php echo esc_url( admin_url( 'admin.php?page=wc-settings&tab=shipping' ) ); ?>">
				<?php esc_html_e( 'Setup shipping zones', 'fincommerce' ); ?>
			</a>
		<?php endif; ?>
		<a class="button-secondary" href="https://fincommerce.com/document/setting-up-shipping-zones/">
			<?php esc_html_e( 'Learn more about shipping zones', 'fincommerce' ); ?>
		</a>
	</p>
</div>
