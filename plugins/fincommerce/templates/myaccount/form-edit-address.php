<?php
/**
 * Edit address form
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/myaccount/form-edit-address.php.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 9.3.0
 */

defined( 'ABSPATH' ) || exit;

$page_title = ( 'billing' === $load_address ) ? esc_html__( 'Billing address', 'fincommerce' ) : esc_html__( 'Shipping address', 'fincommerce' );

do_action( 'fincommerce_before_edit_account_address_form' ); ?>

<?php if ( ! $load_address ) : ?>
	<?php wc_get_template( 'myaccount/my-address.php' ); ?>
<?php else : ?>

	<form method="post" novalidate>

		<h2><?php echo apply_filters( 'fincommerce_my_account_edit_address_title', $page_title, $load_address ); ?></h2><?php // @codingStandardsIgnoreLine ?>

		<div class="fincommerce-address-fields">
			<?php do_action( "fincommerce_before_edit_address_form_{$load_address}" ); ?>

			<div class="fincommerce-address-fields__field-wrapper">
				<?php
				foreach ( $address as $key => $field ) {
					fincommerce_form_field( $key, $field, wc_get_post_data_by_key( $key, $field['value'] ) );
				}
				?>
			</div>

			<?php do_action( "fincommerce_after_edit_address_form_{$load_address}" ); ?>

			<p>
				<button type="submit" class="button<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>" name="save_address" value="<?php esc_attr_e( 'Save address', 'fincommerce' ); ?>"><?php esc_html_e( 'Save address', 'fincommerce' ); ?></button>
				<?php wp_nonce_field( 'fincommerce-edit_address', 'fincommerce-edit-address-nonce' ); ?>
				<input type="hidden" name="action" value="edit_address" />
			</p>
		</div>

	</form>

<?php endif; ?>

<?php do_action( 'fincommerce_after_edit_account_address_form' ); ?>
