<?php
/**
 * Admin View: Notice - Updating
 *
 * @package FinCommerce\Admin
 */

use Automattic\Jetpack\Constants;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$pending_actions_url = admin_url( 'admin.php?page=wc-status&tab=action-scheduler&s=fincommerce_run_update&status=pending' );
$cron_disabled       = Constants::is_true( 'DISABLE_WP_CRON' );
$cron_cta            = $cron_disabled ? __( 'You can manually run queued updates here.', 'fincommerce' ) : __( 'View progress &rarr;', 'fincommerce' );
?>
<div id="message" class="updated fincommerce-message wc-connect">
	<p>
		<strong><?php esc_html_e( 'FinCommerce database update', 'fincommerce' ); ?></strong><br>
		<?php esc_html_e( 'FinCommerce is updating the database in the background. The database update process may take a little while, so please be patient.', 'fincommerce' ); ?>
		<?php
		if ( $cron_disabled ) {
			echo '<br>' . esc_html__( 'Note: WP CRON has been disabled on your install which may prevent this update from completing.', 'fincommerce' );
		}
		?>
		&nbsp;<a href="<?php echo esc_url( $pending_actions_url ); ?>"><?php echo esc_html( $cron_cta ); ?></a>
	</p>
</div>
