import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { useMemo } from '@wordpress/element';
// eslint-disable-next-line @fincommerce/dependency-group
import { ErrorBoundary, 
// @ts-expect-error Type for PluginDocumentSettingPanel is missing in @types/wordpress__editor
PluginDocumentSettingPanel, } from '@wordpress/editor';
/**
 * Internal dependencies
 */
import { RichTextWithButton } from '../personalization-tags/rich-text-with-button';
import { TemplateSelection } from './template-selection';
import { recordEvent, recordEventOnce, debouncedRecordEvent, } from '../../events';
const tracking = {
    recordEvent,
    recordEventOnce,
    debouncedRecordEvent,
};
export function SettingsPanel() {
    const SidebarExtensionComponent = useMemo(() => applyFilters('fincommerce_email_editor_setting_sidebar_extension_component', RichTextWithButton, tracking), []);
    const EmailStatusComponent = useMemo(() => applyFilters('fincommerce_email_editor_setting_sidebar_email_status_component', () => null, tracking), []);
    return (_jsxs(PluginDocumentSettingPanel, { name: "email-settings-panel", title: __('Settings', 'fincommerce'), className: "fincommerce-email-editor__settings-panel", children: [_jsx(EmailStatusComponent, {}), _jsx(TemplateSelection, {}), _jsx(ErrorBoundary, { canCopyContent: true, children: _jsx(SidebarExtensionComponent, {}) })] }));
}
