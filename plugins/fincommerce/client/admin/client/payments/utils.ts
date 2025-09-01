/**
 * External dependencies
 */
import { Plugin } from '@fincommerce/data';

export const isWcPaySupported = ( paymentGatewaySuggestions: Plugin[] ) =>
	paymentGatewaySuggestions &&
	paymentGatewaySuggestions.filter( ( paymentGatewaySuggestion: Plugin ) => {
		return (
			paymentGatewaySuggestion.id.indexOf( 'fincommerce_payments' ) === 0
		);
	} ).length === 1;
