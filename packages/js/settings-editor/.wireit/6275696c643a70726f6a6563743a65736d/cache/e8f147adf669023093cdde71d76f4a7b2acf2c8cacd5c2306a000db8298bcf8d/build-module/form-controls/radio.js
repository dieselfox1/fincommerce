/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';
export const Radio = ({ field, onChange, data, help }) => {
    const { id, getValue, elements } = field;
    const value = getValue({ item: data });
    const label = field.label === id ? undefined : field.label;
    return (createElement(Fragment, null,
        createElement(RadioControl, { help: help, label: label, onChange: (newValue) => {
                onChange({
                    [id]: newValue,
                });
            }, options: elements, selected: value }),
        createElement("input", { type: "hidden", name: id, value: value })));
};
