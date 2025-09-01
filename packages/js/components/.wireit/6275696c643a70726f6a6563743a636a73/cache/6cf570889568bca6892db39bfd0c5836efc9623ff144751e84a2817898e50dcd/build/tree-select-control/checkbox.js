"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const icons_1 = require("@wordpress/icons");
const element_1 = require("@wordpress/element");
/**
 * @typedef {import('./index').Option} Option
 */
/**
 * Renders a custom Checkbox
 *
 * @param {Object}  props           Component properties
 * @param {Option}  props.option    Option for the checkbox
 * @param {string}  props.className The className for the component
 * @param {boolean} props.checked   Defines if the checkbox is checked
 * @return {JSX.Element|null} The Checkbox component
 */
const Checkbox = ({ option, checked, className, ...props }) => {
    return ((0, element_1.createElement)("div", { className: className },
        (0, element_1.createElement)("div", { className: "components-base-control__field" },
            (0, element_1.createElement)("span", { className: "components-checkbox-control__input-container" },
                (0, element_1.createElement)("input", { id: `inspector-checkbox-control-${option.key ?? option.value}`, className: "components-checkbox-control__input", type: "checkbox", tabIndex: "-1", value: option.value, checked: checked, ...props }),
                checked && ((0, element_1.createElement)(icons_1.Icon, { icon: icons_1.check, role: "presentation", className: "components-checkbox-control__checked" }))),
            (0, element_1.createElement)("label", { className: "components-checkbox-control__label", htmlFor: `inspector-checkbox-control-${option.key ?? option.value}` }, option.label))));
};
exports.default = Checkbox;
