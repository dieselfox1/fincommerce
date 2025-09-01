"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberControl = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const compose_1 = require("@wordpress/compose");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@wordpress/icons");
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const use_number_input_props_1 = require("../../hooks/use-number-input-props");
const label_1 = require("../label/label");
const MEDIUM_DELAY = 500;
const SHORT_DELAY = 100;
exports.NumberControl = (0, element_1.forwardRef)(({ id, value, onChange, label, suffix, help, error, onBlur, onFocus, required, tooltip, placeholder, disabled, step = 1, min = -Infinity, max = Infinity, }, ref) => {
    const instanceId = (0, compose_1.useInstanceId)(components_1.BaseControl, 'product_number_field');
    const identifier = id ?? instanceId;
    const [isFocused, setIsFocused] = (0, element_1.useState)(false);
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
    const inputProps = (0, use_number_input_props_1.useNumberInputProps)({
        value: value || '',
        onChange,
        onFocus: handleOnFocus,
        min,
        max,
    });
    const [increment, setIncrement] = (0, element_1.useState)(0);
    const timeoutRef = (0, element_1.useRef)(null);
    const isInitialClick = (0, element_1.useRef)(false);
    function incrementValue() {
        const newValue = parseFloat(value || '0') + increment;
        if (newValue >= min && newValue <= max)
            onChange(String(newValue));
    }
    (0, element_1.useEffect)(() => {
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
    return ((0, element_1.createElement)(components_1.BaseControl, { className: (0, clsx_1.default)({
            'has-error': error,
        }), id: identifier, label: (0, element_1.isValidElement)(label) ? (label) : ((0, element_1.createElement)(label_1.Label, { label: label, required: required, tooltip: tooltip })), help: error || help },
        (0, element_1.createElement)(components_1.__experimentalInputControl, { ...inputProps, ref: ref, step: step, disabled: disabled, autoComplete: "off", id: identifier, className: "fincommerce-number-control", suffix: (0, element_1.createElement)(element_1.Fragment, null,
                suffix,
                isFocused && ((0, element_1.createElement)(element_1.Fragment, null,
                    (0, element_1.createElement)(components_1.Button, { className: "fincommerce-number-control__increment", icon: icons_1.plus, disabled: parseFloat(value || '0') >= max, onMouseDown: () => handleIncrement(step), onMouseLeave: resetIncrement, onMouseUp: resetIncrement, onBlur: unfocusIfOutside, isSmall: true, "aria-hidden": "true", "aria-label": (0, i18n_1.__)('Increment', 'fincommerce'), tabIndex: -1 }),
                    (0, element_1.createElement)(components_1.Button, { icon: icons_1.reset, disabled: parseFloat(value || '0') <= min, className: "fincommerce-number-control__decrement", onBlur: unfocusIfOutside, onMouseDown: () => handleIncrement(-step), onMouseLeave: resetIncrement, onMouseUp: resetIncrement, isSmall: true, "aria-hidden": "true", "aria-label": (0, i18n_1.__)('Decrement', 'fincommerce'), tabIndex: -1 })))), placeholder: placeholder, onBlur: unfocusIfOutside })));
});
