/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';
export const Textarea = ({ field, onChange, data, help }) => {
    const { id, getValue, placeholder } = field;
    const label = field.label === id ? undefined : field.label;
    const value = getValue({ item: data });
    return (createElement(TextareaControl, { __nextHasNoMarginBottom: true, help: help, label: label, placeholder: placeholder, onChange: (newValue) => {
            onChange({
                [id]: newValue,
            });
        }, value: value, id: id }));
};
