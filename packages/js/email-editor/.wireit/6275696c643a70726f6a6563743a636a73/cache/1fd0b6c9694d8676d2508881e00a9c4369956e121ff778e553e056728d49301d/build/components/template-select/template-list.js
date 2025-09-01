"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateList = TemplateList;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const editor_1 = require("@wordpress/editor");
const data_1 = require("@wordpress/data");
const icons_1 = require("@wordpress/icons");
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
// @ts-expect-error No types available for this component
// eslint-disable-next-line
const block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
const async_1 = require("./async");
const hooks_1 = require("../../hooks");
function TemplateNoResults() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "block-editor-inserter__no-results", children: [(0, jsx_runtime_1.jsx)(icons_1.Icon, { className: "block-editor-inserter__no-results-icon", icon: icons_1.blockDefault }), (0, jsx_runtime_1.jsx)("p", { children: (0, i18n_1.__)('No recent templates.', 'fincommerce') }), (0, jsx_runtime_1.jsx)("p", { children: (0, i18n_1.__)('Your recent creations will appear here as soon as you begin.', 'fincommerce') })] }));
}
function TemplateListBox({ templates, onTemplateSelection, selectedCategory, }) {
    const { layout } = (0, data_1.useSelect)((select) => {
        const { getEditorSettings } = select(editor_1.store);
        const editorSettings = getEditorSettings();
        return {
            // @ts-expect-error There are no types for the experimental features settings.
            // eslint-disable-next-line no-underscore-dangle
            layout: editorSettings.__experimentalFeatures.layout,
        };
    });
    const [styles] = (0, hooks_1.useEmailCss)();
    const css = styles.reduce((acc, style) => {
        return acc + (style.css ?? '');
    }, '') +
        `.is-root-container { width: ${layout.contentSize}; margin: 0 auto; }`;
    if (selectedCategory === 'recent' && templates.length === 0) {
        return (0, jsx_runtime_1.jsx)(TemplateNoResults, {});
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "block-editor-block-patterns-list", role: "listbox", children: templates.map((template) => ((0, jsx_runtime_1.jsx)("div", { className: "block-editor-block-patterns-list__list-item email-editor-pattern__list-item", children: (0, jsx_runtime_1.jsx)("div", { className: "block-editor-block-patterns-list__item", role: "button", tabIndex: 0, onClick: () => {
                    onTemplateSelection(template);
                }, onKeyPress: (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        onTemplateSelection(template);
                    }
                }, children: (0, jsx_runtime_1.jsxs)(async_1.Async, { placeholder: (0, jsx_runtime_1.jsx)("p", { children: (0, i18n_1.__)('rendering template', 'fincommerce') }), children: [(0, jsx_runtime_1.jsx)(block_editor_1.BlockPreview, { blocks: template.previewContentParsed, viewportWidth: 900, minHeight: 300, additionalStyles: [
                                {
                                    css,
                                },
                            ] }), (0, jsx_runtime_1.jsx)(components_1.__experimentalHStack, { className: "block-editor-patterns__pattern-details", children: (0, jsx_runtime_1.jsx)("h4", { className: "block-editor-block-patterns-list__item-title", children: template.displayName }) })] }) }) }, `${template.slug}_${template.displayName}_${template.id}`))) }));
}
const compareProps = (prev, next) => prev.templates.length === next.templates.length &&
    prev.selectedCategory === next.selectedCategory;
const MemorizedTemplateListBox = (0, element_1.memo)(TemplateListBox, compareProps);
function TemplateList({ templates, onTemplateSelection, selectedCategory, }) {
    const filteredTemplates = (0, element_1.useMemo)(() => templates.filter((template) => template.category === selectedCategory), [selectedCategory, templates]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "block-editor-block-patterns-explorer__list", children: [selectedCategory === 'recent' && ((0, jsx_runtime_1.jsx)("div", { className: "email-editor-recent-templates-info", children: (0, jsx_runtime_1.jsxs)(components_1.__experimentalHStack, { spacing: 1, expanded: false, justify: "start", children: [(0, jsx_runtime_1.jsx)(icons_1.Icon, { icon: icons_1.info }), (0, jsx_runtime_1.jsx)("p", { children: (0, i18n_1.__)('Templates created on the legacy editor will not appear here.', 'fincommerce') })] }) })), (0, jsx_runtime_1.jsx)(MemorizedTemplateListBox, { templates: filteredTemplates, onTemplateSelection: onTemplateSelection, selectedCategory: selectedCategory })] }));
}
