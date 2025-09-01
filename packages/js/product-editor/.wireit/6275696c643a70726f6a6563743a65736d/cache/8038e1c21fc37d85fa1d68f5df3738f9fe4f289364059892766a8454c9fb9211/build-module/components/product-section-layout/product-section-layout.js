/**
 * External dependencies
 */
import { Children, isValidElement, createElement } from '@wordpress/element';
import { FormSection } from '@fincommerce/components';
export const ProductSectionLayout = ({ title, description, className, children, }) => (createElement(FormSection, { title: title, description: description, className: className }, Children.map(children, (child) => {
    if (isValidElement(child) && child.props.onChange) {
        return createElement("div", { className: "product-field-layout" }, child);
    }
    return child;
})));
