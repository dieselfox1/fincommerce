"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSectionLayout = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@fincommerce/components");
const ProductSectionLayout = ({ title, description, className, children, }) => ((0, element_1.createElement)(components_1.FormSection, { title: title, description: description, className: className }, element_1.Children.map(children, (child) => {
    if ((0, element_1.isValidElement)(child) && child.props.onChange) {
        return (0, element_1.createElement)("div", { className: "product-field-layout" }, child);
    }
    return child;
})));
exports.ProductSectionLayout = ProductSectionLayout;
