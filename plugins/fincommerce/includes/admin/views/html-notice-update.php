<?php
/**
 * Admin View: Notice - Update
 *
 * @package FinCommerce\Admin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$update_url = wp_nonce_url(
	add_query_arg( 'do_update_fincommerce', 'true', admin_url( 'admin.php?page=wc-settings' ) ),
	'wc_db_update',
	'wc_db_update_nonce'
);

?>
<div id="message" class="updated fincommerce-message wc-connect">
	<p>
		<strong><?php esc_html_e( 'FinCommerce database update required', 'fincommerce' ); ?></strong>
	</p>
	<p>
		<?php
			esc_html_e( 'FinCommerce has been updated! To keep things running smoothly, we have to update your database to the newest version.', 'fincommerce' );

			/* translators: 1: Link to docs 2: Close link. */
			printf( ' ' . esc_html__( 'The database update process runs in the background and may take a little while, so please be patient. Advanced users can alternatively update via %1$sWP CLI%2$s.', 'fincommerce' ), '<a href="https://github.com/dieselfox1/fincommerce/wiki/Upgrading-the-database-using-WP-CLI">', '</a>' );
		?>
	</p>
	<p class="submit">
		<a href="<?php echo esc_url( $update_url ); ?>" class="wc-update-now button-primary">
			<?php esc_html_e( 'Update FinCommerce Database', 'fincommerce' ); ?>
		</a>
		<a href="https://fincommerce.com/document/how-to-update-fincommerce/" class="button-secondary">
			<?php esc_html_e( 'Learn more about updates', 'fincommerce' ); ?>
		</a>
	</p>
</div>
