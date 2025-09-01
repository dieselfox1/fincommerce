/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import clsx from 'clsx';
export const FormSection = ({ title, description, className, children, }) => {
    return (createElement("div", { className: clsx('fincommerce-form-section', className) },
        createElement("div", { className: "fincommerce-form-section__header" },
            createElement("h3", { className: "fincommerce-form-section__title" }, title),
            createElement("div", { className: "fincommerce-form-section__description" }, description)),
        createElement("div", { className: "fincommerce-form-section__content" }, children)));
};
