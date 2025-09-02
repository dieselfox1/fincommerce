<?php
/**
 * Single variation display
 *
 * This is a javascript-based template for single variations (see https://codex.finpress.org/Javascript_Reference/wp.template).
 * The values will be dynamically replaced after selecting attributes.
 *
 * @see https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 9.3.0
 */

defined( 'ABSPATH' ) || exit;

?>
<script type="text/template" id="tmpl-variation-template">
	<div class="fincommerce-variation-description">{{{ data.variation.variation_description }}}</div>
	<div class="fincommerce-variation-price">{{{ data.variation.price_html }}}</div>
	<div class="fincommerce-variation-availability">{{{ data.variation.availability_html }}}</div>
</script>
<script type="text/template" id="tmpl-unavailable-variation-template">
	<p role="alert"><?php esc_html_e( 'Sorry, this product is unavailable. Please choose a different combination.', 'fincommerce' ); ?></p>
</script>
