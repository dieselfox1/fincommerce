"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const components_1 = require("@fincommerce/components");
/**
 * Internal dependencies
 */
const sanitize_html_1 = require("../../utils/sanitize-html");
const Label = ({ label, labelId, required, tooltip, note, onClick, }) => {
    let labelElement = label;
    if (required) {
        if (note?.length) {
            labelElement = (0, element_1.createInterpolateElement)((0, i18n_1.__)('<label/> <note /> <required/>', 'fincommerce'), {
                label: ((0, element_1.createElement)("span", { dangerouslySetInnerHTML: (0, sanitize_html_1.sanitizeHTML)(label) })),
                note: ((0, element_1.createElement)("span", { className: "fincommerce-product-form-label__note" }, note)),
                required: ((0, element_1.createElement)("span", { "aria-hidden": "true", className: "fincommerce-product-form-label__required" }, (0, i18n_1.__)('*', 'fincommerce'))),
            });
        }
        else {
            labelElement = (0, element_1.createInterpolateElement)((0, i18n_1.__)('<label/> <required/>', 'fincommerce'), {
                label: (0, element_1.createElement)("span", null, label),
                required: ((0, element_1.createElement)("span", { "aria-hidden": "true", className: "fincommerce-product-form-label__required" }, (0, i18n_1.__)('*', 'fincommerce'))),
            });
        }
    }
    else if (note?.length) {
        labelElement = (0, element_1.createInterpolateElement)((0, i18n_1.__)('<label/> <note />', 'fincommerce'), {
            label: (0, element_1.createElement)("span", null, label),
            note: ((0, element_1.createElement)("span", { className: "fincommerce-product-form-label__note" }, note)),
        });
    }
    const spanAdditionalProps = typeof labelElement === 'string'
        ? { dangerouslySetInnerHTML: (0, sanitize_html_1.sanitizeHTML)(label) }
        : {};
    return ((0, element_1.createElement)("div", { className: "fincommerce-product-form-label__label" },
        (0, element_1.createElement)("span", { id: labelId, onClick: onClick, ...spanAdditionalProps }, (0, element_1.isValidElement)(labelElement) ? labelElement : null),
        tooltip && ((0, element_1.createElement)(components_1.__experimentalTooltip, { text: (0, element_1.createElement)("span", { dangerouslySetInnerHTML: (0, sanitize_html_1.sanitizeHTML)(tooltip) }), position: "top center", className: "fincommerce-product-form-label__tooltip" },
            (0, element_1.createElement)("span", { className: "fincommerce-product-form-label__icon" },
                (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.help, size: 18, fill: "#949494" }))))));
};
exports.Label = Label;
