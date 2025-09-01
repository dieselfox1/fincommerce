<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div data-taxonomy="<?php echo esc_attr( $attribute->get_taxonomy() ); ?>" class="fincommerce_attribute wc-metabox postbox closed <?php echo esc_attr( implode( ' ', $metabox_class ) ); ?>" rel="<?php echo esc_attr( $attribute->get_position() ); ?>">
	<h3>
		<div class="handlediv" title="<?php esc_attr_e( 'Click to toggle', 'fincommerce' ); ?>"></div>
		<div class="tips sort" data-tip="<?php esc_attr_e( 'Drag and drop to set admin attribute order', 'fincommerce' ); ?>"></div>
		<a href="#" class="remove_row delete"><?php esc_html_e( 'Remove', 'fincommerce' ); ?></a>
		<strong class="attribute_name<?php echo esc_attr( $attribute->get_name() === '' ? ' placeholder' : '' ); ?>"><?php echo esc_html( $attribute->get_name() !== '' ? wc_attribute_label( $attribute->get_name() ) : __( 'New attribute', 'fincommerce' ) ); ?></strong>
	</h3>
	<div class="fincommerce_attribute_data wc-metabox-content hidden">
		<?php require __DIR__ . '/html-product-attribute-inner.php'; ?>
	</div>
</div>
