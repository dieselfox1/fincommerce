<?php
/**
 * Lost password reset form.
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/myaccount/form-reset-password.php.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 9.2.0
 */

defined( 'ABSPATH' ) || exit;

do_action( 'fincommerce_before_reset_password_form' );
?>

<form method="post" class="fincommerce-ResetPassword lost_reset_password">

	<p><?php echo apply_filters( 'fincommerce_reset_password_message', esc_html__( 'Enter a new password below.', 'fincommerce' ) ); ?></p><?php // @codingStandardsIgnoreLine ?>

	<p class="fincommerce-form-row fincommerce-form-row--first form-row form-row-first">
		<label for="password_1"><?php esc_html_e( 'New password', 'fincommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span><span class="screen-reader-text"><?php esc_html_e( 'Required', 'fincommerce' ); ?></span></label>
		<input type="password" class="fincommerce-Input fincommerce-Input--text input-text" name="password_1" id="password_1" autocomplete="new-password" required aria-required="true" />
	</p>
	<p class="fincommerce-form-row fincommerce-form-row--last form-row form-row-last">
		<label for="password_2"><?php esc_html_e( 'Re-enter new password', 'fincommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span><span class="screen-reader-text"><?php esc_html_e( 'Required', 'fincommerce' ); ?></span></label>
		<input type="password" class="fincommerce-Input fincommerce-Input--text input-text" name="password_2" id="password_2" autocomplete="new-password" required aria-required="true" />
	</p>

	<input type="hidden" name="reset_key" value="<?php echo esc_attr( $args['key'] ); ?>" />
	<input type="hidden" name="reset_login" value="<?php echo esc_attr( $args['login'] ); ?>" />

	<div class="clear"></div>

	<?php do_action( 'fincommerce_resetpassword_form' ); ?>

	<p class="fincommerce-form-row form-row">
		<input type="hidden" name="wc_reset_password" value="true" />
		<button type="submit" class="fincommerce-Button button<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>" value="<?php esc_attr_e( 'Save', 'fincommerce' ); ?>"><?php esc_html_e( 'Save', 'fincommerce' ); ?></button>
	</p>

	<?php wp_nonce_field( 'reset_password', 'fincommerce-reset-password-nonce' ); ?>

</form>
<?php
do_action( 'fincommerce_after_reset_password_form' );

