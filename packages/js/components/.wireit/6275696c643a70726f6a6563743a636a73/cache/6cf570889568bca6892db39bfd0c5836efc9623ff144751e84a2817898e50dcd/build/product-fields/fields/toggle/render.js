"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const tooltip_1 = require("../../../tooltip");
const ToggleField = ({ label, value, onChange, tooltip, disabled = false, }) => {
    return ((0, element_1.createElement)(components_1.ToggleControl, { label: (0, element_1.createElement)(element_1.Fragment, null,
            label,
            tooltip && (0, element_1.createElement)(tooltip_1.Tooltip, { text: tooltip })), checked: value, onChange: onChange, disabled: disabled }));
};
exports.default = ToggleField;
