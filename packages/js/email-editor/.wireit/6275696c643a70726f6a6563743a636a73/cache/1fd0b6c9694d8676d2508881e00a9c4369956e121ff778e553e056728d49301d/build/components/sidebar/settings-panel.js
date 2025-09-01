"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsPanel = SettingsPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const hooks_1 = require("@wordpress/hooks");
const element_1 = require("@wordpress/element");
// eslint-disable-next-line @fincommerce/dependency-group
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const rich_text_with_button_1 = require("../personalization-tags/rich-text-with-button");
const template_selection_1 = require("./template-selection");
const events_1 = require("../../events");
const tracking = {
    recordEvent: events_1.recordEvent,
    recordEventOnce: events_1.recordEventOnce,
    debouncedRecordEvent: events_1.debouncedRecordEvent,
};
function SettingsPanel() {
    const SidebarExtensionComponent = (0, element_1.useMemo)(() => (0, hooks_1.applyFilters)('fincommerce_email_editor_setting_sidebar_extension_component', rich_text_with_button_1.RichTextWithButton, tracking), []);
    const EmailStatusComponent = (0, element_1.useMemo)(() => (0, hooks_1.applyFilters)('fincommerce_email_editor_setting_sidebar_email_status_component', () => null, tracking), []);
    return ((0, jsx_runtime_1.jsxs)(editor_1.PluginDocumentSettingPanel, { name: "email-settings-panel", title: (0, i18n_1.__)('Settings', 'fincommerce'), className: "fincommerce-email-editor__settings-panel", children: [(0, jsx_runtime_1.jsx)(EmailStatusComponent, {}), (0, jsx_runtime_1.jsx)(template_selection_1.TemplateSelection, {}), (0, jsx_runtime_1.jsx)(editor_1.ErrorBoundary, { canCopyContent: true, children: (0, jsx_runtime_1.jsx)(SidebarExtensionComponent, {}) })] }));
}
