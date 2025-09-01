"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionBlockEdit = SectionBlockEdit;
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const block_templates_1 = require("@fincommerce/block-templates");
const block_editor_1 = require("@wordpress/block-editor");
const section_header_1 = require("../../../components/section-header");
function SectionBlockEdit({ attributes, }) {
    const { description, title, blockGap } = attributes;
    const blockProps = (0, block_templates_1.useWooBlockProps)(attributes);
    const innerBlockProps = (0, block_editor_1.useInnerBlocksProps)({
        className: (0, clsx_1.default)('wp-block-fincommerce-product-section-header__content', `wp-block-fincommerce-product-section-header__content--block-gap-${blockGap}`),
    }, { templateLock: 'all' });
    const SectionTagName = title ? 'fieldset' : 'div';
    return ((0, element_1.createElement)(SectionTagName, { ...blockProps },
        title && ((0, element_1.createElement)(section_header_1.SectionHeader, { description: description, sectionTagName: SectionTagName, title: title })),
        (0, element_1.createElement)("div", { ...innerBlockProps })));
}
