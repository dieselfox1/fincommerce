<?php
/**
 * Login Form
 *
 * This template can be overridden by copying it to yourtheme/fincommerce/myaccount/form-login.php.
 *
 * HOWEVER, on occasion FinCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://fincommerce.com/document/template-structure/
 * @package FinCommerce\Templates
 * @version 9.9.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

do_action( 'fincommerce_before_customer_login_form' ); ?>

<?php if ( 'yes' === get_option( 'fincommerce_enable_myaccount_registration' ) ) : ?>

<div class="u-columns col2-set" id="customer_login">

	<div class="u-column1 col-1">

<?php endif; ?>

		<h2><?php esc_html_e( 'Login', 'fincommerce' ); ?></h2>

		<form class="fincommerce-form fincommerce-form-login login" method="post" novalidate>

			<?php do_action( 'fincommerce_login_form_start' ); ?>

			<p class="fincommerce-form-row fincommerce-form-row--wide form-row form-row-wide">
				<label for="username"><?php esc_html_e( 'Username or email address', 'fincommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span><span class="screen-reader-text"><?php esc_html_e( 'Required', 'fincommerce' ); ?></span></label>
				<input type="text" class="fincommerce-Input fincommerce-Input--text input-text" name="username" id="username" autocomplete="username" value="<?php echo ( ! empty( $_POST['username'] ) && is_string( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; ?>" required aria-required="true" /><?php // @codingStandardsIgnoreLine ?>
			</p>
			<p class="fincommerce-form-row fincommerce-form-row--wide form-row form-row-wide">
				<label for="password"><?php esc_html_e( 'Password', 'fincommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span><span class="screen-reader-text"><?php esc_html_e( 'Required', 'fincommerce' ); ?></span></label>
				<input class="fincommerce-Input fincommerce-Input--text input-text" type="password" name="password" id="password" autocomplete="current-password" required aria-required="true" />
			</p>

			<?php do_action( 'fincommerce_login_form' ); ?>

			<p class="form-row">
				<label class="fincommerce-form__label fincommerce-form__label-for-checkbox fincommerce-form-login__rememberme">
					<input class="fincommerce-form__input fincommerce-form__input-checkbox" name="rememberme" type="checkbox" id="rememberme" value="forever" /> <span><?php esc_html_e( 'Remember me', 'fincommerce' ); ?></span>
				</label>
				<?php wp_nonce_field( 'fincommerce-login', 'fincommerce-login-nonce' ); ?>
				<button type="submit" class="fincommerce-button button fincommerce-form-login__submit<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>" name="login" value="<?php esc_attr_e( 'Log in', 'fincommerce' ); ?>"><?php esc_html_e( 'Log in', 'fincommerce' ); ?></button>
			</p>
			<p class="fincommerce-LostPassword lost_password">
				<a href="<?php echo esc_url( wp_lostpassword_url() ); ?>"><?php esc_html_e( 'Lost your password?', 'fincommerce' ); ?></a>
			</p>

			<?php do_action( 'fincommerce_login_form_end' ); ?>

		</form>

<?php if ( 'yes' === get_option( 'fincommerce_enable_myaccount_registration' ) ) : ?>

	</div>

	<div class="u-column2 col-2">

		<h2><?php esc_html_e( 'Register', 'fincommerce' ); ?></h2>

		<form method="post" class="fincommerce-form fincommerce-form-register register" <?php do_action( 'fincommerce_register_form_tag' ); ?> >

			<?php do_action( 'fincommerce_register_form_start' ); ?>

			<?php if ( 'no' === get_option( 'fincommerce_registration_generate_username' ) ) : ?>

				<p class="fincommerce-form-row fincommerce-form-row--wide form-row form-row-wide">
					<label for="reg_username"><?php esc_html_e( 'Username', 'fincommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span><span class="screen-reader-text"><?php esc_html_e( 'Required', 'fincommerce' ); ?></span></label>
					<input type="text" class="fincommerce-Input fincommerce-Input--text input-text" name="username" id="reg_username" autocomplete="username" value="<?php echo ( ! empty( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; ?>" required aria-required="true" /><?php // @codingStandardsIgnoreLine ?>
				</p>

			<?php endif; ?>

			<p class="fincommerce-form-row fincommerce-form-row--wide form-row form-row-wide">
				<label for="reg_email"><?php esc_html_e( 'Email address', 'fincommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span><span class="screen-reader-text"><?php esc_html_e( 'Required', 'fincommerce' ); ?></span></label>
				<input type="email" class="fincommerce-Input fincommerce-Input--text input-text" name="email" id="reg_email" autocomplete="email" value="<?php echo ( ! empty( $_POST['email'] ) ) ? esc_attr( wp_unslash( $_POST['email'] ) ) : ''; ?>" required aria-required="true" /><?php // @codingStandardsIgnoreLine ?>
			</p>

			<?php if ( 'no' === get_option( 'fincommerce_registration_generate_password' ) ) : ?>

				<p class="fincommerce-form-row fincommerce-form-row--wide form-row form-row-wide">
					<label for="reg_password"><?php esc_html_e( 'Password', 'fincommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span><span class="screen-reader-text"><?php esc_html_e( 'Required', 'fincommerce' ); ?></span></label>
					<input type="password" class="fincommerce-Input fincommerce-Input--text input-text" name="password" id="reg_password" autocomplete="new-password" required aria-required="true" />
				</p>

			<?php else : ?>

				<p><?php esc_html_e( 'A link to set a new password will be sent to your email address.', 'fincommerce' ); ?></p>

			<?php endif; ?>

			<?php do_action( 'fincommerce_register_form' ); ?>

			<p class="fincommerce-form-row form-row">
				<?php wp_nonce_field( 'fincommerce-register', 'fincommerce-register-nonce' ); ?>
				<button type="submit" class="fincommerce-Button fincommerce-button button<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?> fincommerce-form-register__submit" name="register" value="<?php esc_attr_e( 'Register', 'fincommerce' ); ?>"><?php esc_html_e( 'Register', 'fincommerce' ); ?></button>
			</p>

			<?php do_action( 'fincommerce_register_form_end' ); ?>

		</form>

	</div>

</div>
<?php endif; ?>

<?php do_action( 'fincommerce_after_customer_login_form' ); ?>
