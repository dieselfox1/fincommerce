"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryBlockEdit = SummaryBlockEdit;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const block_templates_1 = require("@fincommerce/block-templates");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const core_data_1 = require("@wordpress/core-data");
const compose_1 = require("@wordpress/compose");
const clsx_1 = __importDefault(require("clsx"));
const block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
const paragraph_rtl_control_1 = require("./paragraph-rtl-control");
const constants_1 = require("./constants");
const use_clear_selected_block_on_blur_1 = require("../../../hooks/use-clear-selected-block-on-blur");
function SummaryBlockEdit({ attributes, setAttributes, context, }) {
    const { align, allowedFormats, direction, label, helpText } = attributes;
    const blockProps = (0, block_templates_1.useWooBlockProps)(attributes, {
        style: { direction },
    });
    const contentId = (0, compose_1.useInstanceId)(SummaryBlockEdit, 'wp-block-fincommerce-product-summary-field__content');
    const [summary, setSummary] = (0, core_data_1.useEntityProp)('postType', context.postType || 'product', attributes.property);
    // This is a workaround to hide the toolbar when the block is blurred.
    // This is a temporary solution until using Gutenberg 18 with the
    // fix from https://github.com/WordPress/gutenberg/pull/59800
    const { handleBlur: hideToolbar } = (0, use_clear_selected_block_on_blur_1.useClearSelectedBlockOnBlur)();
    function handleAlignmentChange(value) {
        setAttributes({ align: value });
    }
    function handleDirectionChange(value) {
        setAttributes({ direction: value });
    }
    return ((0, element_1.createElement)("div", { className: 'wp-block wp-block-fincommerce-product-summary-field-wrapper' },
        (0, element_1.createElement)(block_editor_1.BlockControls, { group: "block" },
            (0, element_1.createElement)(block_editor_1.AlignmentControl, { alignmentControls: constants_1.ALIGNMENT_CONTROLS, value: align, onChange: handleAlignmentChange }),
            (0, element_1.createElement)(paragraph_rtl_control_1.ParagraphRTLControl, { direction: direction, onChange: handleDirectionChange })),
        (0, element_1.createElement)(components_1.BaseControl, { id: contentId.toString(), label: typeof label === 'undefined'
                ? (0, element_1.createInterpolateElement)((0, i18n_1.__)('Summary', 'fincommerce'), {
                    optional: ((0, element_1.createElement)("span", { className: "fincommerce-product-form__optional-input" }, (0, i18n_1.__)('(OPTIONAL)', 'fincommerce'))),
                })
                : label, help: typeof helpText === 'undefined'
                ? (0, i18n_1.__)("Summarize this product in 1-2 short sentences. We'll show it at the top of the page.", 'fincommerce')
                : helpText },
            (0, element_1.createElement)("div", { ...blockProps },
                (0, element_1.createElement)(block_editor_1.RichText, { id: contentId.toString(), identifier: "content", tagName: "p", value: summary, onChange: setSummary, "data-empty": Boolean(summary), className: (0, clsx_1.default)('components-summary-control', {
                        [`has-text-align-${align}`]: align,
                    }), dir: direction, allowedFormats: allowedFormats, onBlur: hideToolbar })))));
}
