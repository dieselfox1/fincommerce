<?php
/**
 * The marketplace suggestions tab HTML in the product tabs
 *
 * @package FinCommerce\Classes
 * @since   3.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div id="marketplace_suggestions" class="panel fincommerce_options_panel hidden">
	<?php
		WC_Marketplace_Suggestions::render_suggestions_container( 'product-edit-meta-tab-header' );
		WC_Marketplace_Suggestions::render_suggestions_container( 'product-edit-meta-tab-body' );
		WC_Marketplace_Suggestions::render_suggestions_container( 'product-edit-meta-tab-footer' );
	?>
	<div class="marketplace-suggestions-metabox-nosuggestions-placeholder hidden">
		<img src="https://fincommerce.com/wp-content/plugins/wccom-plugins/marketplace-suggestions/icons/get_more_options.svg" class="marketplace-suggestion-icon">
		<div class="marketplace-suggestion-placeholder-content">
			<h4><?php esc_html_e( 'Enhance your products', 'fincommerce' ); ?></h4>
			<p><?php esc_html_e( 'Extensions can add new functionality to your product pages that make your store stand out', 'fincommerce' ); ?></p>
		</div>
		<a href="https://fincommerce.com/product-category/fincommerce-extensions/?utm_source=editproduct&amp;utm_campaign=marketplacesuggestions&amp;utm_medium=product" target="blank" class="button"><?php esc_html_e( 'Browse the Marketplace', 'fincommerce' ); ?></a><br />
		<a class="marketplace-suggestion-manage-link" href="<?php echo esc_url( admin_url( 'admin.php?page=wc-settings&tab=advanced&section=fincommerce_com' ) ); ?>"><?php esc_html_e( 'Manage suggestions', 'fincommerce' ); ?></a>
	</div>
</div>
