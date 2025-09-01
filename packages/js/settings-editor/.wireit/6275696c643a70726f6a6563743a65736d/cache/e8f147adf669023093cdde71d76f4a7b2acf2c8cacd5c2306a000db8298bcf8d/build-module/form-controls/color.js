/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { ColorPicker } from '@wordpress/components';
export const Color = ({ field, onChange, data }) => {
    const { id, getValue, label } = field;
    const value = getValue({ item: data });
    return (createElement(Fragment, null,
        createElement("label", { className: "fincommerce-settings-color-picker__label", htmlFor: id, dangerouslySetInnerHTML: { __html: label } }),
        createElement(ColorPicker, { className: "fincommerce-settings-color-picker", onChange: (newValue) => {
                onChange({
                    [id]: newValue,
                });
            }, color: value }),
        createElement("input", { type: "hidden", name: id, value: value })));
};
