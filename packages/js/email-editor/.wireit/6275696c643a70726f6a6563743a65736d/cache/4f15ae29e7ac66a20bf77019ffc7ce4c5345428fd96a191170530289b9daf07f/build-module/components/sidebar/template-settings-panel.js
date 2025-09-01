import { jsx as _jsx } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
// eslint-disable-next-line @fincommerce/dependency-group
import { 
// @ts-expect-error Type for PluginDocumentSettingPanel is missing in @types/wordpress__editor
PluginDocumentSettingPanel, ErrorBoundary, } from '@wordpress/editor';
/**
 * Internal dependencies
 */
import { recordEvent, recordEventOnce, debouncedRecordEvent, } from '../../events';
const tracking = {
    recordEvent,
    recordEventOnce,
    debouncedRecordEvent,
};
export function TemplateSettingsPanel() {
    // Allow plugins to add custom template sections
    const templateSections = applyFilters('fincommerce_email_editor_template_sections', [], tracking);
    if (templateSections.length === 0) {
        return null;
    }
    return (_jsx(PluginDocumentSettingPanel, { name: "template-settings-panel", title: __('Settings', 'fincommerce'), className: "fincommerce-email-editor__settings-panel", children: templateSections.map((section) => (
        // @ts-expect-error Type for ErrorBoundary is outdated in @types/wordpress__editor
        _jsx(ErrorBoundary, { children: _jsx("div", { children: section.render() }, section.id) }, `error-boundary-${section.id}`))) }));
}
