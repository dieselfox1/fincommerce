"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionActions = SectionActions;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const block_fill_1 = require("../block-fill");
const DEFAULT_SECTION_BLOCKS = [
    'fincommerce/product-section',
    'fincommerce/product-subsection',
];
function SectionActions({ containerBlockName = DEFAULT_SECTION_BLOCKS, ...restProps }) {
    return ((0, element_1.createElement)(block_fill_1.BlockFill, { ...restProps, name: "section-actions", slotContainerBlockName: containerBlockName }));
}
