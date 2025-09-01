/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { sanitizeHTML } from '../../utils/sanitize-html';
export function RadioField({ title, description, className, ...props }) {
    return (createElement(RadioControl, { ...props, className: clsx(className, 'fincommerce-radio-field'), label: createElement(Fragment, null,
            createElement("span", { className: "fincommerce-radio-field__title" }, title),
            description && (createElement("span", { className: "fincommerce-radio-field__description", dangerouslySetInnerHTML: sanitizeHTML(description) }))) }));
}
