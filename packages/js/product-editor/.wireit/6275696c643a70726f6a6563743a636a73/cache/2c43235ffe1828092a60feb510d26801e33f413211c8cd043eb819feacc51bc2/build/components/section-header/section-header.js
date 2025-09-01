"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionHeader = SectionHeader;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@fincommerce/components");
const sanitize_html_1 = require("../../utils/sanitize-html");
const block_slot_fill_1 = require("../block-slot-fill");
function SectionHeader({ description, sectionTagName, title, }) {
    const HeadingTagName = sectionTagName === 'fieldset' ? 'legend' : 'div';
    return ((0, element_1.createElement)(HeadingTagName, { className: "wp-block-fincommerce-product-section-header__heading" },
        (0, element_1.createElement)("div", { className: "wp-block-fincommerce-product-section-header__heading-title-wrapper" },
            (0, element_1.createElement)("h2", { className: "wp-block-fincommerce-product-section-header__heading-title" },
                title,
                description && ((0, element_1.createElement)(components_1.__experimentalTooltip, { className: "wp-block-fincommerce-product-section-header__heading-tooltip", text: (0, element_1.createElement)("p", { className: "wp-block-fincommerce-product-section-header__heading-description", dangerouslySetInnerHTML: (0, sanitize_html_1.sanitizeHTML)(description) }), position: 'bottom center', helperText: (0, i18n_1.__)('View helper text', 'fincommerce') }))),
            (0, element_1.createElement)("div", { className: "wp-block-fincommerce-product-section-header__actions" },
                (0, element_1.createElement)(block_slot_fill_1.BlockSlot, { name: `section-actions` }))),
        (0, element_1.createElement)(block_slot_fill_1.BlockSlot, { name: `section-description` })));
}
