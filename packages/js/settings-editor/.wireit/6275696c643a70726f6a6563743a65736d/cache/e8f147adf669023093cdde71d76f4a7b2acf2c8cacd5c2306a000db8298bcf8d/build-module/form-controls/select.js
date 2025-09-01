/**
 * External dependencies
 */
import { SelectControl } from '@wordpress/components';
import { createElement, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
export const Select = ({ field, onChange, data, help, hideLabelFromVision, }) => {
    const { id } = field;
    // DataForm will automatically use the id as the label if no label is provided so we conditionally set the label to undefined if it matches the id to avoid displaying it.
    // We should contribute upstream to allow label to be optional.
    const label = field.label === id ? undefined : field.label;
    const value = field.getValue({ item: data }) ?? '';
    const onChangeControl = useCallback((newValue) => onChange({
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
        { label: __('Select item', 'fincommerce'), value: '' },
        ...(field?.elements ?? []),
    ];
    return (createElement(SelectControl, { id: id, label: label, value: value, help: help, options: elements, onChange: onChangeControl, __next40pxDefaultSize: true, __nextHasNoMarginBottom: true, hideLabelFromVision: hideLabelFromVision }));
};
