/**
 * Internal dependencies
 */
import { useProductHelper } from './use-product-helper';
import { deferSelectInFocus } from '../utils';
const NOT_NUMBERS_OR_SEPARATORS_OR_MINUS_REGEX = /[^0-9,.\ -]/g;
export const useNumberInputProps = ({ value, onChange, onFocus, onKeyDown, min, max, }) => {
    const { formatNumber, parseNumber } = useProductHelper();
    const numberInputProps = {
        value: formatNumber(value),
        onFocus(event) {
            deferSelectInFocus(event.currentTarget);
            if (onFocus) {
                onFocus(event);
            }
        },
        onKeyUp(event) {
            if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
                event.preventDefault();
            }
        },
        inputMode: 'decimal',
        onKeyDown(event) {
            const amount = Number.parseFloat(value || '0');
            const step = Number(event.currentTarget.step || '1');
            if (event.code === 'ArrowUp') {
                event.preventDefault();
                if (amount + step <= max)
                    onChange(String(amount + step));
            }
            if (event.code === 'ArrowDown') {
                event.preventDefault();
                if (amount - step >= min)
                    onChange(String(amount - step));
            }
            if (onKeyDown) {
                onKeyDown(event);
            }
        },
        onChange(newValue) {
            let sanitizeValue = parseNumber((newValue ?? '').replace(NOT_NUMBERS_OR_SEPARATORS_OR_MINUS_REGEX, ''));
            const numberValue = Number(sanitizeValue);
            if (sanitizeValue && numberValue >= max) {
                sanitizeValue = String(max);
            }
            else if (sanitizeValue && numberValue <= min) {
                sanitizeValue = String(min);
            }
            onChange(!Number.isNaN(numberValue) ? sanitizeValue : '');
        },
    };
    return numberInputProps;
};
