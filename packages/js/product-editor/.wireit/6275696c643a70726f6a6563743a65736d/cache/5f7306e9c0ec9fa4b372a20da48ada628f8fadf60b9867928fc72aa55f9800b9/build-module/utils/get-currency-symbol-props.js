/**
 * Get input props for currency related values and symbol positions.
 *
 * @param {Object} currencyConfig - Currency context
 * @return {Object} Props.
 */
export const getCurrencySymbolProps = (currencyConfig) => {
    const { symbol, symbolPosition } = currencyConfig;
    const currencyPosition = symbolPosition.includes('left')
        ? 'prefix'
        : 'suffix';
    return {
        [currencyPosition]: symbol,
    };
};
