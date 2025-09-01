<?php
/**
 * Lost password form
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/myaccount/form-lost-password.php.
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

do_action( 'fincommerce_before_lost_password_form' );
?>

<form method="post" class="fincommerce-ResetPassword lost_reset_password">

	<p><?php echo apply_filters( 'fincommerce_lost_password_message', esc_html__( 'Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.', 'fincommerce' ) ); ?></p><?php // @codingStandardsIgnoreLine ?>

	<p class="fincommerce-form-row fincommerce-form-row--first form-row form-row-first">
		<label for="user_login"><?php esc_html_e( 'Username or email', 'fincommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span><span class="screen-reader-text"><?php esc_html_e( 'Required', 'fincommerce' ); ?></span></label>
		<input class="fincommerce-Input fincommerce-Input--text input-text" type="text" name="user_login" id="user_login" autocomplete="username" required aria-required="true" />
	</p>

	<div class="clear"></div>

	<?php do_action( 'fincommerce_lostpassword_form' ); ?>

	<p class="fincommerce-form-row form-row">
		<input type="hidden" name="wc_reset_password" value="true" />
		<button type="submit" class="fincommerce-Button button<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>" value="<?php esc_attr_e( 'Reset password', 'fincommerce' ); ?>"><?php esc_html_e( 'Reset password', 'fincommerce' ); ?></button>
	</p>

	<?php wp_nonce_field( 'lost_password', 'fincommerce-lost-password-nonce' ); ?>

</form>
<?php
do_action( 'fincommerce_after_lost_password_form' );
