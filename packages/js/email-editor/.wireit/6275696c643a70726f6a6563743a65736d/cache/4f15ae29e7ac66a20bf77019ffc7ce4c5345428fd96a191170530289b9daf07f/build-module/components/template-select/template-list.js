import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { useMemo, memo } from '@wordpress/element';
import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { Icon, info, blockDefault } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { __experimentalHStack as HStack, // eslint-disable-line
 } from '@wordpress/components';
// @ts-expect-error No types available for this component
// eslint-disable-next-line
import { BlockPreview } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import { Async } from './async';
import { useEmailCss } from '../../hooks';
function TemplateNoResults() {
    return (_jsxs("div", { className: "block-editor-inserter__no-results", children: [_jsx(Icon, { className: "block-editor-inserter__no-results-icon", icon: blockDefault }), _jsx("p", { children: __('No recent templates.', 'fincommerce') }), _jsx("p", { children: __('Your recent creations will appear here as soon as you begin.', 'fincommerce') })] }));
}
function TemplateListBox({ templates, onTemplateSelection, selectedCategory, }) {
    const { layout } = useSelect((select) => {
        const { getEditorSettings } = select(editorStore);
        const editorSettings = getEditorSettings();
        return {
            // @ts-expect-error There are no types for the experimental features settings.
            // eslint-disable-next-line no-underscore-dangle
            layout: editorSettings.__experimentalFeatures.layout,
        };
    });
    const [styles] = useEmailCss();
    const css = styles.reduce((acc, style) => {
        return acc + (style.css ?? '');
    }, '') +
        `.is-root-container { width: ${layout.contentSize}; margin: 0 auto; }`;
    if (selectedCategory === 'recent' && templates.length === 0) {
        return _jsx(TemplateNoResults, {});
    }
    return (_jsx("div", { className: "block-editor-block-patterns-list", role: "listbox", children: templates.map((template) => (_jsx("div", { className: "block-editor-block-patterns-list__list-item email-editor-pattern__list-item", children: _jsx("div", { className: "block-editor-block-patterns-list__item", role: "button", tabIndex: 0, onClick: () => {
                    onTemplateSelection(template);
                }, onKeyPress: (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        onTemplateSelection(template);
                    }
                }, children: _jsxs(Async, { placeholder: _jsx("p", { children: __('rendering template', 'fincommerce') }), children: [_jsx(BlockPreview, { blocks: template.previewContentParsed, viewportWidth: 900, minHeight: 300, additionalStyles: [
                                {
                                    css,
                                },
                            ] }), _jsx(HStack, { className: "block-editor-patterns__pattern-details", children: _jsx("h4", { className: "block-editor-block-patterns-list__item-title", children: template.displayName }) })] }) }) }, `${template.slug}_${template.displayName}_${template.id}`))) }));
}
const compareProps = (prev, next) => prev.templates.length === next.templates.length &&
    prev.selectedCategory === next.selectedCategory;
const MemorizedTemplateListBox = memo(TemplateListBox, compareProps);
export function TemplateList({ templates, onTemplateSelection, selectedCategory, }) {
    const filteredTemplates = useMemo(() => templates.filter((template) => template.category === selectedCategory), [selectedCategory, templates]);
    return (_jsxs("div", { className: "block-editor-block-patterns-explorer__list", children: [selectedCategory === 'recent' && (_jsx("div", { className: "email-editor-recent-templates-info", children: _jsxs(HStack, { spacing: 1, expanded: false, justify: "start", children: [_jsx(Icon, { icon: info }), _jsx("p", { children: __('Templates created on the legacy editor will not appear here.', 'fincommerce') })] }) })), _jsx(MemorizedTemplateListBox, { templates: filteredTemplates, onTemplateSelection: onTemplateSelection, selectedCategory: selectedCategory })] }));
}
