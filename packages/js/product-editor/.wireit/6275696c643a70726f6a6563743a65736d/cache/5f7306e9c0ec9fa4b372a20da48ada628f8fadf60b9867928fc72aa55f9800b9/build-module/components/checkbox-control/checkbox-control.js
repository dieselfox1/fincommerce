/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';
import { __experimentalTooltip as Tooltip } from '@fincommerce/components';
import { Icon, help } from '@wordpress/icons';
/**
 * Internal dependencies
 */
import { sanitizeHTML } from '../../utils/sanitize-html';
export const Checkbox = ({ value, label, onChange, tooltip, title, checkedValue, uncheckedValue, disabled, }) => {
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
    return (createElement("div", { className: "fincommerce-product-form__checkbox" },
        title && createElement("h4", null, title),
        createElement("div", { className: "fincommerce-product-form__checkbox-wrapper" },
            createElement(CheckboxControl, { label: label, checked: isChecked(), onChange: handleChange, disabled: disabled }),
            tooltip && (createElement(Tooltip, { text: createElement("span", { dangerouslySetInnerHTML: sanitizeHTML(tooltip) }), position: "top center", className: 'fincommerce-product-form__checkbox-tooltip' },
                createElement("span", { className: "fincommerce-product-form__checkbox-tooltip-icon" },
                    createElement(Icon, { icon: help, size: 21.94, fill: "#949494" })))))));
};
