"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const prop_types_1 = __importDefault(require("prop-types"));
const components_1 = require("@wordpress/components");
/**
 * An input field use for text inputs in forms.
 */
const TextControl = (0, components_1.withFocusOutside)(class extends element_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
        };
    }
    handleFocusOutside() {
        this.setState({ isFocused: false });
    }
    handleOnClick(event, onClick) {
        this.setState({ isFocused: true });
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }
    render() {
        const { isFocused } = this.state;
        const { className, onClick, ...otherProps } = this.props;
        const { label, value, disabled } = otherProps;
        const isEmpty = value === '';
        const isActive = isFocused && !disabled;
        return ((0, element_1.createElement)(components_1.TextControl, { className: (0, clsx_1.default)('muriel-component', 'muriel-input-text', className, {
                disabled,
                empty: isEmpty,
                active: isActive,
                'with-value': !isEmpty,
            }), placeholder: label, onClick: (event) => this.handleOnClick(event, onClick), onFocus: () => this.setState({ isFocused: true }), ...otherProps }));
    }
});
TextControl.propTypes = {
    /**
     * Additional CSS classes.
     */
    className: prop_types_1.default.string,
    /**
     * Disables the field.
     */
    disabled: prop_types_1.default.bool,
    /**
     * Input label used as a placeholder.
     */
    label: prop_types_1.default.string,
    /**
     * On click handler called when the component is clicked, passed the click event.
     */
    onClick: prop_types_1.default.func,
    /**
     * The value of the input field.
     */
    value: prop_types_1.default.string,
};
exports.default = TextControl;
