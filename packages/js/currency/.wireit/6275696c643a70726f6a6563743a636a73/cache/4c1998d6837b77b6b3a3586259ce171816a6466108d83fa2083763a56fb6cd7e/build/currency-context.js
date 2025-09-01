"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyContext = exports.getFilteredCurrencyInstance = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const hooks_1 = require("@wordpress/hooks");
const settings_1 = require("@fincommerce/settings");
/**
 * Internal dependencies
 */
const index_1 = require("./index");
const CURRENCY = (0, settings_1.getSetting)('currency');
const appCurrency = (0, index_1.CurrencyFactory)(CURRENCY);
const getFilteredCurrencyInstance = (query) => {
    const config = appCurrency.getCurrencyConfig();
    /**
     * Filter the currency context. This affects all FinCommerce Admin currency formatting.
     *
     * @filter fincommerce_admin_report_currency
     * @param {Object} config Currency configuration.
     * @param {Object} query  Url query parameters.
     */
    const filteredConfig = (0, hooks_1.applyFilters)('fincommerce_admin_report_currency', config, query);
    return (0, index_1.CurrencyFactory)(filteredConfig);
};
exports.getFilteredCurrencyInstance = getFilteredCurrencyInstance;
exports.CurrencyContext = (0, element_1.createContext)(appCurrency // default value
);
