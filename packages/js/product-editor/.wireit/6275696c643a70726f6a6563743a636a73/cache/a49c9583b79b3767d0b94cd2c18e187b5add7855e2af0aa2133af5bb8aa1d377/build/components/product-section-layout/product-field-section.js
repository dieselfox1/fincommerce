"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFieldSection = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const product_section_layout_1 = require("./product-section-layout");
const woo_product_field_item_1 = require("../woo-product-field-item");
const ProductFieldSection = ({ id, title, description, className, children, }) => ((0, element_1.createElement)(product_section_layout_1.ProductSectionLayout, { title: title, description: description, className: className },
    (0, element_1.createElement)(components_1.Card, null,
        (0, element_1.createElement)(components_1.CardBody, null,
            children,
            (0, element_1.createElement)(woo_product_field_item_1.WooProductFieldItem.Slot, { section: id })))));
exports.ProductFieldSection = ProductFieldSection;
