"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const Select = ({ field, onChange, data, help, hideLabelFromVision, }) => {
    const { id } = field;
    // DataForm will automatically use the id as the label if no label is provided so we conditionally set the label to undefined if it matches the id to avoid displaying it.
    // We should contribute upstream to allow label to be optional.
    const label = field.label === id ? undefined : field.label;
    const value = field.getValue({ item: data }) ?? '';
    const onChangeControl = (0, element_1.useCallback)((newValue) => onChange({
        [id]: newValue,
    }), [id, onChange]);
    const elements = [
        /*
         * Value can be undefined when:
         *
         * - the field is not required
         * - in bulk editing
         *
         */
        { label: (0, i18n_1.__)('Select item', 'fincommerce'), value: '' },
        ...(field?.elements ?? []),
    ];
    return ((0, element_1.createElement)(components_1.SelectControl, { id: id, label: label, value: value, help: help, options: elements, onChange: onChangeControl, __next40pxDefaultSize: true, __nextHasNoMarginBottom: true, hideLabelFromVision: hideLabelFromVision }));
};
exports.Select = Select;
