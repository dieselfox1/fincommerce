"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencySymbolProps = void 0;
/**
 * Get input props for currency related values and symbol positions.
 *
 * @param {Object} currencyConfig - Currency context
 * @return {Object} Props.
 */
const getCurrencySymbolProps = (currencyConfig) => {
    const { symbol, symbolPosition } = currencyConfig;
    const currencyPosition = symbolPosition.includes('left')
        ? 'prefix'
        : 'suffix';
    return {
        [currencyPosition]: symbol,
    };
};
exports.getCurrencySymbolProps = getCurrencySymbolProps;
