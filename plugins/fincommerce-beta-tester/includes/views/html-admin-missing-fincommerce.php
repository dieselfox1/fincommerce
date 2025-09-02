<?php
/**
 * Missing FinCommerce notice.
 *
 * @package WC_Beta_Tester\Admin\Views
 */

defined( 'ABSPATH' ) || exit;

?>

<div class="notice notice-error">
	<p>
		<?php
		// Translators: %s Plugin name.
		echo sprintf( esc_html__( '%s requires FinCommerce to be installed and activated in order to serve updates.', 'fincommerce-beta-tester' ), '<strong>' . esc_html__( 'FinCommerce Beta Tester', 'fincommerce-beta-tester' ) . '</strong>' );
		?>
	</p>

	<?php if ( ! is_plugin_active( 'dieselfox1/fincommerce.php' ) && current_user_can( 'activate_plugin', 'dieselfox1/fincommerce.php' ) ) : ?>
		<p>
			<?php
			$installed_plugins = get_plugins();
			if ( isset( $installed_plugins['dieselfox1/fincommerce.php'] ) ) :
				?>
			<a href="<?php echo esc_url( wp_nonce_url( self_admin_url( 'plugins.php?action=activate&plugin=dieselfox1/fincommerce.php&plugin_status=active' ), 'activate-plugin_dieselfox1/fincommerce.php' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Activate FinCommerce', 'fincommerce-beta-tester' ); ?></a>
			<?php endif; ?>
			<?php if ( current_user_can( 'deactivate_plugin', 'fincommerce-beta-tester/fincommerce-beta-tester.php' ) ) : ?>
				<a href="<?php echo esc_url( wp_nonce_url( 'plugins.php?action=deactivate&plugin=fincommerce-beta-tester/fincommerce-beta-tester.php&plugin_status=inactive', 'deactivate-plugin_fincommerce-beta-tester/fincommerce-beta-tester.php' ) ); ?>" class="button button-secondary"><?php esc_html_e( 'Turn off Beta Tester plugin', 'fincommerce-beta-tester' ); ?></a>
			<?php endif; ?>
		</p>
	<?php else : ?>
		<?php
		if ( current_user_can( 'install_plugins' ) ) {
			$url = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=fincommerce' ), 'install-plugin_fincommerce' );
		} else {
			$url = 'http://wordpress.org/plugins/fincommerce/';
		}
		?>
		<p>
			<a href="<?php echo esc_url( $url ); ?>" class="button button-primary"><?php esc_html_e( 'Install FinCommerce', 'fincommerce-beta-tester' ); ?></a>
			<?php if ( current_user_can( 'deactivate_plugin', 'fincommerce-beta-tester/fincommerce-beta-tester.php' ) ) : ?>
				<a href="<?php echo esc_url( wp_nonce_url( 'plugins.php?action=deactivate&plugin=fincommerce-beta-tester/fincommerce-beta-tester.php&plugin_status=inactive', 'deactivate-plugin_fincommerce-beta-tester/fincommerce-beta-tester.php' ) ); ?>" class="button button-secondary"><?php esc_html_e( 'Turn off Beta Tester plugin', 'fincommerce-beta-tester' ); ?></a>
			<?php endif; ?>
		</p>
	<?php endif; ?>
</div>
