/**
 * Internal dependencies
 */
import { EmailEditorSettings, EmailTheme, EmailEditorUrls } from './types';

export function getEditorSettings(): EmailEditorSettings {
	return window.fincommerceEmailEditor.editor_settings as EmailEditorSettings;
}

export function getEditorTheme(): EmailTheme {
	return window.fincommerceEmailEditor.editor_theme as EmailTheme;
}

export function getUrls(): EmailEditorUrls {
	return window.fincommerceEmailEditor.urls as EmailEditorUrls;
}
