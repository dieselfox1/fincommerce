<?php
/**
 * Admin View: Importer - CSV import progress
 *
 * @package FinCommerce\Admin\Importers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="wc-progress-form-content fincommerce-importer fincommerce-importer__importing">
	<header>
		<span class="spinner is-active"></span>
		<h2><?php esc_html_e( 'Importing', 'fincommerce' ); ?></h2>
		<p><?php esc_html_e( 'Your products are now being imported...', 'fincommerce' ); ?></p>
	</header>
	<section>
		<progress class="fincommerce-importer-progress" max="100" value="0"></progress>
	</section>
</div>
