/**
 * External dependencies
 */
import { CurrencyContext } from '@fincommerce/currency';
import { useContext } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { useProductHelper } from './use-product-helper';
import { deferSelectInFocus, formatCurrencyDisplayValue } from '../utils';
const CURRENCY_INPUT_MAX = 1_000_000_000_000_000_000.0;
export const useCurrencyInputProps = ({ value, onChange, onFocus, onKeyUp, }) => {
    const { sanitizePrice } = useProductHelper();
    const context = useContext(CurrencyContext);
    const { getCurrencyConfig, formatAmount } = context;
    const currencyConfig = getCurrencyConfig();
    const currencyInputProps = {
        prefix: currencyConfig.symbol,
        className: 'components-currency-control',
        value: formatCurrencyDisplayValue(String(value), currencyConfig, formatAmount),
        sanitize: (val) => {
            return sanitizePrice(String(val));
        },
        onFocus(event) {
            deferSelectInFocus(event.currentTarget);
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
