<?php
/**
 * Title: Coming Soon
 * Slug: fincommerce/coming-soon
 * Categories: FinCommerce
 * Inserter: false
 * Feature Flag: launch-your-store
 *
 * @package FinCommerce\Blocks
 */

$store_pages_only = 'yes' === get_option( 'fincommerce_store_pages_only', 'no' );
$default_pattern  = $store_pages_only ? 'coming-soon-store-only' : 'page-coming-soon-default';

?>

<!-- wp:pattern {"slug":"fincommerce/<?php echo $default_pattern; // phpcs:ignore finpress.Security.EscapeOutput.OutputNotEscaped ?>"} /-->
