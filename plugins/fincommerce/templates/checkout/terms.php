<?php
/**
 * Checkout terms and conditions area.
 *
 * @package FinCommerce\Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

if ( apply_filters( 'fincommerce_checkout_show_terms', true ) && function_exists( 'wc_terms_and_conditions_checkbox_enabled' ) ) {
	do_action( 'fincommerce_checkout_before_terms_and_conditions' );

	?>
	<div class="fincommerce-terms-and-conditions-wrapper">
		<?php
		/**
		 * Terms and conditions hook used to inject content.
		 *
		 * @since 3.4.0.
		 * @hooked wc_checkout_privacy_policy_text() Shows custom privacy policy text. Priority 20.
		 * @hooked wc_terms_and_conditions_page_content() Shows t&c page content. Priority 30.
		 */
		do_action( 'fincommerce_checkout_terms_and_conditions' );
		?>

		<?php if ( wc_terms_and_conditions_checkbox_enabled() ) : ?>
			<p class="form-row validate-required">
				<label class="fincommerce-form__label fincommerce-form__label-for-checkbox checkbox">
				<input type="checkbox" class="fincommerce-form__input fincommerce-form__input-checkbox input-checkbox" name="terms" <?php checked( apply_filters( 'fincommerce_terms_is_checked_default', isset( $_POST['terms'] ) ), true ); // WPCS: input var ok, csrf ok. ?> id="terms" />
					<span class="fincommerce-terms-and-conditions-checkbox-text"><?php wc_terms_and_conditions_checkbox_text(); ?></span>&nbsp;<abbr class="required" title="<?php esc_attr_e( 'required', 'fincommerce' ); ?>">*</abbr>
				</label>
				<input type="hidden" name="terms-field" value="1" />
			</p>
		<?php endif; ?>
	</div>
	<?php

	do_action( 'fincommerce_checkout_after_terms_and_conditions' );
}
