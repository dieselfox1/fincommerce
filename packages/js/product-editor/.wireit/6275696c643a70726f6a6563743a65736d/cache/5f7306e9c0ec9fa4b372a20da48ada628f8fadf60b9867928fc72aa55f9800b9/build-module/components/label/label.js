/**
 * External dependencies
 */
import { createElement, createInterpolateElement, isValidElement, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, help as helpIcon } from '@wordpress/icons';
import { __experimentalTooltip as Tooltip } from '@fincommerce/components';
/**
 * Internal dependencies
 */
import { sanitizeHTML } from '../../utils/sanitize-html';
export const Label = ({ label, labelId, required, tooltip, note, onClick, }) => {
    let labelElement = label;
    if (required) {
        if (note?.length) {
            labelElement = createInterpolateElement(__('<label/> <note /> <required/>', 'fincommerce'), {
                label: (createElement("span", { dangerouslySetInnerHTML: sanitizeHTML(label) })),
                note: (createElement("span", { className: "fincommerce-product-form-label__note" }, note)),
                required: (createElement("span", { "aria-hidden": "true", className: "fincommerce-product-form-label__required" }, __('*', 'fincommerce'))),
            });
        }
        else {
            labelElement = createInterpolateElement(__('<label/> <required/>', 'fincommerce'), {
                label: createElement("span", null, label),
                required: (createElement("span", { "aria-hidden": "true", className: "fincommerce-product-form-label__required" }, __('*', 'fincommerce'))),
            });
        }
    }
    else if (note?.length) {
        labelElement = createInterpolateElement(__('<label/> <note />', 'fincommerce'), {
            label: createElement("span", null, label),
            note: (createElement("span", { className: "fincommerce-product-form-label__note" }, note)),
        });
    }
    const spanAdditionalProps = typeof labelElement === 'string'
        ? { dangerouslySetInnerHTML: sanitizeHTML(label) }
        : {};
    return (createElement("div", { className: "fincommerce-product-form-label__label" },
        createElement("span", { id: labelId, onClick: onClick, ...spanAdditionalProps }, isValidElement(labelElement) ? labelElement : null),
        tooltip && (createElement(Tooltip, { text: createElement("span", { dangerouslySetInnerHTML: sanitizeHTML(tooltip) }), position: "top center", className: "fincommerce-product-form-label__tooltip" },
            createElement("span", { className: "fincommerce-product-form-label__icon" },
                createElement(Icon, { icon: helpIcon, size: 18, fill: "#949494" }))))));
};
