"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboBox = void 0;
/**
 * External dependencies
 */
const react_1 = require("react");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@wordpress/icons");
const ToggleButton = (0, react_1.forwardRef)((props, ref) => {
    // using forwardRef here because getToggleButtonProps injects a ref prop
    return ((0, react_1.createElement)("button", { className: "fincommerce-experimental-select-control__combox-box-toggle-button", ...props, ref: ref },
        (0, react_1.createElement)(icons_1.Icon, { icon: icons_1.chevronDown })));
});
const ComboBox = ({ children, comboBoxProps, getToggleButtonProps = () => ({}), inputProps, suffix, showToggleButton, }) => {
    const inputRef = (0, react_1.useRef)(null);
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
    (0, react_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-experimental-select-control__combo-box-wrapper', {
            'fincommerce-experimental-select-control__combo-box-wrapper--disabled': inputProps.disabled,
        }), onMouseDown: maybeFocusInput },
        (0, react_1.createElement)("div", { className: "fincommerce-experimental-select-control__items-wrapper" },
            children,
            (0, react_1.createElement)("div", { ...comboBoxProps, className: "fincommerce-experimental-select-control__combox-box" },
                (0, react_1.createElement)("input", { ...inputProps, ref: (node) => {
                        inputRef.current = node;
                        if (typeof inputProps.ref === 'function') {
                            inputProps.ref(node);
                        }
                    } }))),
        suffix && ((0, react_1.createElement)("div", { className: "fincommerce-experimental-select-control__suffix" }, suffix)),
        showToggleButton && ((0, react_1.createElement)(ToggleButton, { ...getToggleButtonProps() }))));
};
exports.ComboBox = ComboBox;
