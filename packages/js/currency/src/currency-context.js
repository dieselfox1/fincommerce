/**
 * External dependencies
 */
import { createContext } from '@finpress/element';
import { applyFilters } from '@finpress/hooks';
import { getSetting } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import { CurrencyFactory } from './index';

const CURRENCY = getSetting( 'currency' );
const appCurrency = CurrencyFactory( CURRENCY );
export const getFilteredCurrencyInstance = ( query ) => {
	const config = appCurrency.getCurrencyConfig();
	/**
	 * Filter the currency context. This affects all FinCommerce Admin currency formatting.
	 *
	 * @filter fincommerce_admin_report_currency
	 * @param {Object} config Currency configuration.
	 * @param {Object} query  Url query parameters.
	 */
	const filteredConfig = applyFilters(
		'fincommerce_admin_report_currency',
		config,
		query
	);
	return CurrencyFactory( filteredConfig );
};

export const CurrencyContext = createContext(
	appCurrency // default value
);
