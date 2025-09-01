"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateSettingsPanel = TemplateSettingsPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const hooks_1 = require("@wordpress/hooks");
// eslint-disable-next-line @fincommerce/dependency-group
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const events_1 = require("../../events");
const tracking = {
    recordEvent: events_1.recordEvent,
    recordEventOnce: events_1.recordEventOnce,
    debouncedRecordEvent: events_1.debouncedRecordEvent,
};
function TemplateSettingsPanel() {
    // Allow plugins to add custom template sections
    const templateSections = (0, hooks_1.applyFilters)('fincommerce_email_editor_template_sections', [], tracking);
    if (templateSections.length === 0) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(editor_1.PluginDocumentSettingPanel, { name: "template-settings-panel", title: (0, i18n_1.__)('Settings', 'fincommerce'), className: "fincommerce-email-editor__settings-panel", children: templateSections.map((section) => (
        // @ts-expect-error Type for ErrorBoundary is outdated in @types/wordpress__editor
        (0, jsx_runtime_1.jsx)(editor_1.ErrorBoundary, { children: (0, jsx_runtime_1.jsx)("div", { children: section.render() }, section.id) }, `error-boundary-${section.id}`))) }));
}
