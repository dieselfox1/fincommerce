/**
 * External dependencies
 */
import { createElement, forwardRef, Fragment, isValidElement, useEffect, useRef, useState, } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import clsx from 'clsx';
import { plus, reset } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, __experimentalInputControl as InputControl, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { useNumberInputProps } from '../../hooks/use-number-input-props';
import { Label } from '../label/label';
const MEDIUM_DELAY = 500;
const SHORT_DELAY = 100;
export const NumberControl = forwardRef(({ id, value, onChange, label, suffix, help, error, onBlur, onFocus, required, tooltip, placeholder, disabled, step = 1, min = -Infinity, max = Infinity, }, ref) => {
    const instanceId = useInstanceId(BaseControl, 'product_number_field');
    const identifier = id ?? instanceId;
    const [isFocused, setIsFocused] = useState(false);
    const unfocusIfOutside = (event) => {
        if (!document
            .getElementById(identifier)
            ?.parentElement?.contains(event.relatedTarget)) {
            setIsFocused(false);
            onBlur?.();
        }
    };
    function handleOnFocus() {
        setIsFocused(true);
        onFocus?.();
    }
    const inputProps = useNumberInputProps({
        value: value || '',
        onChange,
        onFocus: handleOnFocus,
        min,
        max,
    });
    const [increment, setIncrement] = useState(0);
    const timeoutRef = useRef(null);
    const isInitialClick = useRef(false);
    function incrementValue() {
        const newValue = parseFloat(value || '0') + increment;
        if (newValue >= min && newValue <= max)
            onChange(String(newValue));
    }
    useEffect(() => {
        if (increment !== 0) {
            timeoutRef.current = setTimeout(incrementValue, isInitialClick.current ? MEDIUM_DELAY : SHORT_DELAY);
            isInitialClick.current = false;
        }
        else if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [increment, value]);
    function resetIncrement() {
        setIncrement(0);
    }
    function handleIncrement(thisStep) {
        const newValue = parseFloat(value || '0') + thisStep;
        if (newValue >= min && newValue <= max) {
            onChange(String(parseFloat(value || '0') + thisStep));
            setIncrement(thisStep);
            isInitialClick.current = true;
        }
    }
    return (createElement(BaseControl, { className: clsx({
            'has-error': error,
        }), id: identifier, label: isValidElement(label) ? (label) : (createElement(Label, { label: label, required: required, tooltip: tooltip })), help: error || help },
        createElement(InputControl, { ...inputProps, ref: ref, step: step, disabled: disabled, autoComplete: "off", id: identifier, className: "fincommerce-number-control", suffix: createElement(Fragment, null,
                suffix,
                isFocused && (createElement(Fragment, null,
                    createElement(Button, { className: "fincommerce-number-control__increment", icon: plus, disabled: parseFloat(value || '0') >= max, onMouseDown: () => handleIncrement(step), onMouseLeave: resetIncrement, onMouseUp: resetIncrement, onBlur: unfocusIfOutside, isSmall: true, "aria-hidden": "true", "aria-label": __('Increment', 'fincommerce'), tabIndex: -1 }),
                    createElement(Button, { icon: reset, disabled: parseFloat(value || '0') <= min, className: "fincommerce-number-control__decrement", onBlur: unfocusIfOutside, onMouseDown: () => handleIncrement(-step), onMouseLeave: resetIncrement, onMouseUp: resetIncrement, isSmall: true, "aria-hidden": "true", "aria-label": __('Decrement', 'fincommerce'), tabIndex: -1 })))), placeholder: placeholder, onBlur: unfocusIfOutside })));
});
