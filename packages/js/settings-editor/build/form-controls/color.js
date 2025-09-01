"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const Color = ({ field, onChange, data }) => {
    const { id, getValue, label } = field;
    const value = getValue({ item: data });
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)("label", { className: "fincommerce-settings-color-picker__label", htmlFor: id, dangerouslySetInnerHTML: { __html: label } }),
        (0, element_1.createElement)(components_1.ColorPicker, { className: "fincommerce-settings-color-picker", onChange: (newValue) => {
                onChange({
                    [id]: newValue,
                });
            }, color: value }),
        (0, element_1.createElement)("input", { type: "hidden", name: id, value: value })));
};
exports.Color = Color;
