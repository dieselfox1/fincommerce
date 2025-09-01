/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';
export const Checkbox = ({ field, onChange, data, help }) => {
    const { id, getValue } = field;
    // DataForm will automatically use the id as the label if no label is provided so we conditionally set the label to undefined if it matches the id to avoid displaying it.
    // We should contribute upstream to allow label to be optional.
    const label = field.label === id ? undefined : field.label;
    const value = getValue({ item: data });
    const hiddenValue = value === 'yes' ? '1' : '0';
    return (createElement(Fragment, null,
        createElement(CheckboxControl, { __nextHasNoMarginBottom: true, label: label, help: help, checked: value === 'yes', onChange: (checked) => {
                onChange({
                    [id]: checked ? 'yes' : 'no',
                });
            } }),
        createElement("input", { type: "hidden", name: id, value: hiddenValue })));
};
