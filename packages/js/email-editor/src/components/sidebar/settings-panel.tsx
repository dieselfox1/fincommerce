/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { applyFilters } from '@finpress/hooks';
import { useMemo } from '@finpress/element';
// eslint-disable-next-line @fincommerce/dependency-group
import {
	ErrorBoundary,
	// @ts-expect-error Type for PluginDocumentSettingPanel is missing in @types/finpress__editor
	PluginDocumentSettingPanel,
} from '@finpress/editor';

/**
 * Internal dependencies
 */
import { RichTextWithButton } from '../personalization-tags/rich-text-with-button';
import { TemplateSelection } from './template-selection';
import {
	recordEvent,
	recordEventOnce,
	debouncedRecordEvent,
} from '../../events';

const tracking = {
	recordEvent,
	recordEventOnce,
	debouncedRecordEvent,
};

export function SettingsPanel() {
	const SidebarExtensionComponent = useMemo(
		() =>
			applyFilters(
				'fincommerce_email_editor_setting_sidebar_extension_component',
				RichTextWithButton,
				tracking
			) as () => JSX.Element,
		[]
	);

	const EmailStatusComponent = useMemo(
		() =>
			applyFilters(
				'fincommerce_email_editor_setting_sidebar_email_status_component',
				() => null,
				tracking
			) as () => JSX.Element,
		[]
	);

	return (
		<PluginDocumentSettingPanel
			name="email-settings-panel"
			title={ __( 'Settings', 'fincommerce' ) }
			className="fincommerce-email-editor__settings-panel"
		>
			{ <EmailStatusComponent /> }
			{ <TemplateSelection /> }
			{ /* @ts-expect-error canCopyContent is missing in @types/finpress__editor */ }
			<ErrorBoundary canCopyContent>
				{ <SidebarExtensionComponent /> }
			</ErrorBoundary>
		</PluginDocumentSettingPanel>
	);
}
