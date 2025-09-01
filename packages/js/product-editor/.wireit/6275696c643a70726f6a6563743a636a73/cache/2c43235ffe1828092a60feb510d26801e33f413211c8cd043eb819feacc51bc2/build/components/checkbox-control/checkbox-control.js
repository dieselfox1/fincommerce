"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const components_2 = require("@fincommerce/components");
const icons_1 = require("@wordpress/icons");
/**
 * Internal dependencies
 */
const sanitize_html_1 = require("../../utils/sanitize-html");
const Checkbox = ({ value, label, onChange, tooltip, title, checkedValue, uncheckedValue, disabled, }) => {
    function isChecked() {
        if (checkedValue !== undefined) {
            return checkedValue === value;
        }
        return value;
    }
    function handleChange(checked) {
        if (checked) {
            onChange(checkedValue !== undefined ? checkedValue : checked);
        }
        else {
            onChange(uncheckedValue !== undefined ? uncheckedValue : checked);
        }
    }
    return ((0, element_1.createElement)("div", { className: "fincommerce-product-form__checkbox" },
        title && (0, element_1.createElement)("h4", null, title),
        (0, element_1.createElement)("div", { className: "fincommerce-product-form__checkbox-wrapper" },
            (0, element_1.createElement)(components_1.CheckboxControl, { label: label, checked: isChecked(), onChange: handleChange, disabled: disabled }),
            tooltip && ((0, element_1.createElement)(components_2.__experimentalTooltip, { text: (0, element_1.createElement)("span", { dangerouslySetInnerHTML: (0, sanitize_html_1.sanitizeHTML)(tooltip) }), position: "top center", className: 'fincommerce-product-form__checkbox-tooltip' },
                (0, element_1.createElement)("span", { className: "fincommerce-product-form__checkbox-tooltip-icon" },
                    (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.help, size: 21.94, fill: "#949494" })))))));
};
exports.Checkbox = Checkbox;
