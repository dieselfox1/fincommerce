"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrencyInputProps = void 0;
/**
 * External dependencies
 */
const currency_1 = require("@fincommerce/currency");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const use_product_helper_1 = require("./use-product-helper");
const utils_1 = require("../utils");
const CURRENCY_INPUT_MAX = 1_000_000_000_000_000_000.0;
const useCurrencyInputProps = ({ value, onChange, onFocus, onKeyUp, }) => {
    const { sanitizePrice } = (0, use_product_helper_1.useProductHelper)();
    const context = (0, element_1.useContext)(currency_1.CurrencyContext);
    const { getCurrencyConfig, formatAmount } = context;
    const currencyConfig = getCurrencyConfig();
    const currencyInputProps = {
        prefix: currencyConfig.symbol,
        className: 'components-currency-control',
        value: (0, utils_1.formatCurrencyDisplayValue)(String(value), currencyConfig, formatAmount),
        sanitize: (val) => {
            return sanitizePrice(String(val));
        },
        onFocus(event) {
            (0, utils_1.deferSelectInFocus)(event.currentTarget);
            if (onFocus) {
                onFocus(event);
            }
        },
        onKeyUp(event) {
            const amount = Number.parseFloat(sanitizePrice(value || '0'));
            const step = Number(event.currentTarget.step || '1');
            if (event.code === 'ArrowUp') {
                onChange(String(amount + step));
            }
            if (event.code === 'ArrowDown') {
                onChange(String(amount - step));
            }
            if (onKeyUp) {
                onKeyUp(event);
            }
        },
        onChange(newValue) {
            const sanitizeValue = sanitizePrice(newValue ?? '');
            if (onChange) {
                onChange(Number(sanitizeValue) <= CURRENCY_INPUT_MAX
                    ? sanitizeValue
                    : String(CURRENCY_INPUT_MAX));
            }
        },
    };
    return currencyInputProps;
};
exports.useCurrencyInputProps = useCurrencyInputProps;
