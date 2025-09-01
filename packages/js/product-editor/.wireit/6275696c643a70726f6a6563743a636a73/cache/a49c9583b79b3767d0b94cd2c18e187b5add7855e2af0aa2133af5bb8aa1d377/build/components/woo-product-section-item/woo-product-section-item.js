"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooProductSectionItem = void 0;
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const utils_1 = require("../../utils");
const DEFAULT_SECTION_ORDER = 20;
const WooProductSectionItem = ({ children, tabs, }) => {
    return ((0, element_1.createElement)(element_1.Fragment, null, tabs.map(({ name: tabName, order: sectionOrder }) => ((0, element_1.createElement)(components_1.Fill, { name: `fincommerce_product_section_${tabName}`, key: tabName }, (fillProps) => {
        return (0, utils_1.createOrderedChildren)(children, sectionOrder || DEFAULT_SECTION_ORDER, {
            tabName,
            ...fillProps,
        });
    })))));
};
exports.WooProductSectionItem = WooProductSectionItem;
exports.WooProductSectionItem.Slot = ({ fillProps, tab, }) => ((0, element_1.createElement)(components_1.Slot, { name: `fincommerce_product_section_${tab}`, fillProps: fillProps }, (fills) => {
    if (!utils_1.sortFillsByOrder) {
        return null;
    }
    // @ts-expect-error The type definitions for Slot are incorrect.
    return (0, utils_1.sortFillsByOrder)(fills);
}));
