/**
 * External dependencies
 */
import { useContext, useEffect } from '@finpress/element';
import { CurrencyContext } from '@fincommerce/currency';

export const ShippingCurrencyContext = () => {
	const context = useContext( CurrencyContext );

	useEffect( () => {
		window.wc.ShippingCurrencyContext =
			window.wc.ShippingCurrencyContext || context;
	}, [ context ] );

	return null;
};
