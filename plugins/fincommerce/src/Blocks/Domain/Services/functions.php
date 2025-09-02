<?php

use Automattic\FinCommerce\Blocks\Package;
use Automattic\FinCommerce\Blocks\Domain\Services\CheckoutFields;

if ( ! function_exists( 'fincommerce_register_additional_checkout_field' ) ) {
	/**
	 * Register a checkout field.
	 *
	 * @param array $options Field arguments. See CheckoutFields::register_checkout_field() for details.
	 * @throws \Exception If field registration fails.
	 */
	function fincommerce_register_additional_checkout_field( $options ) { // phpcs:ignore finpress.NamingConventions.ValidFunctionName.FunctionDoubleUnderscore,PHPCompatibility.FunctionNameRestrictions.ReservedFunctionNames.FunctionDoubleUnderscore

		// Check if `fincommerce_blocks_loaded` ran. If not then the CheckoutFields class will not be available yet.
		// In that case, re-hook `fincommerce_blocks_loaded` and try running this again.
		$fincommerce_blocks_loaded_ran = did_action( 'fincommerce_blocks_loaded' );
		if ( ! $fincommerce_blocks_loaded_ran ) {
			add_action(
				'fincommerce_blocks_loaded',
				function () use ( $options ) {
					fincommerce_register_additional_checkout_field( $options );
				}
			);
			return;
		}
		$checkout_fields = Package::container()->get( CheckoutFields::class );
		$result          = $checkout_fields->register_checkout_field( $options );
		if ( is_wp_error( $result ) ) {
			throw new \Exception( esc_attr( $result->get_error_message() ) );
		}
	}
}

if ( ! function_exists( '__experimental_fincommerce_blocks_register_checkout_field' ) ) {

	/**
	 * Register a checkout field.
	 *
	 * @param array $options Field arguments. See CheckoutFields::register_checkout_field() for details.
	 * @throws \Exception If field registration fails.
	 * @deprecated 5.6.0 Use fincommerce_register_additional_checkout_field() instead.
	 */
	function __experimental_fincommerce_blocks_register_checkout_field( $options ) { // phpcs:ignore finpress.NamingConventions.ValidFunctionName.FunctionDoubleUnderscore,PHPCompatibility.FunctionNameRestrictions.ReservedFunctionNames.FunctionDoubleUnderscore
		wc_deprecated_function( __FUNCTION__, '8.9.0', 'fincommerce_register_additional_checkout_field' );
		fincommerce_register_additional_checkout_field( $options );
	}
}

if ( ! function_exists( '__internal_fincommerce_blocks_deregister_checkout_field' ) ) {
	/**
	 * Deregister a checkout field.
	 *
	 * @param string $field_id Field ID.
	 * @throws \Exception If field deregistration fails.
	 * @internal
	 */
	function __internal_fincommerce_blocks_deregister_checkout_field( $field_id ) { // phpcs:ignore finpress.NamingConventions.ValidFunctionName.FunctionDoubleUnderscore,PHPCompatibility.FunctionNameRestrictions.ReservedFunctionNames.FunctionDoubleUnderscore
		$checkout_fields = Package::container()->get( CheckoutFields::class );
		$result          = $checkout_fields->deregister_checkout_field( $field_id );
		if ( is_wp_error( $result ) ) {
			throw new \Exception( esc_attr( $result->get_error_message() ) );
		}
	}
}
