/**
 * External dependencies
 */
import { createElement, useRef, forwardRef } from 'react';
import clsx from 'clsx';
import { Icon, chevronDown } from '@wordpress/icons';
const ToggleButton = forwardRef((props, ref) => {
    // using forwardRef here because getToggleButtonProps injects a ref prop
    return (createElement("button", { className: "fincommerce-experimental-select-control__combox-box-toggle-button", ...props, ref: ref },
        createElement(Icon, { icon: chevronDown })));
});
export const ComboBox = ({ children, comboBoxProps, getToggleButtonProps = () => ({}), inputProps, suffix, showToggleButton, }) => {
    const inputRef = useRef(null);
    const maybeFocusInput = (event) => {
        if (!inputRef || !inputRef.current) {
            return;
        }
        if (document.activeElement !== inputRef.current) {
            event.preventDefault();
            inputRef.current.focus();
            event.stopPropagation();
        }
    };
    return (
    // Disable reason: The click event is purely for accidental clicks around the input.
    // Keyboard users are still able to tab to and interact with elements in the combobox.
    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    createElement("div", { className: clsx('fincommerce-experimental-select-control__combo-box-wrapper', {
            'fincommerce-experimental-select-control__combo-box-wrapper--disabled': inputProps.disabled,
        }), onMouseDown: maybeFocusInput },
        createElement("div", { className: "fincommerce-experimental-select-control__items-wrapper" },
            children,
            createElement("div", { ...comboBoxProps, className: "fincommerce-experimental-select-control__combox-box" },
                createElement("input", { ...inputProps, ref: (node) => {
                        inputRef.current = node;
                        if (typeof inputProps.ref === 'function') {
                            inputProps.ref(node);
                        }
                    } }))),
        suffix && (createElement("div", { className: "fincommerce-experimental-select-control__suffix" }, suffix)),
        showToggleButton && (createElement(ToggleButton, { ...getToggleButtonProps() }))));
};
