/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { applyFilters } from '@finpress/hooks';
// eslint-disable-next-line @fincommerce/dependency-group
import {
	// @ts-expect-error Type for PluginDocumentSettingPanel is missing in @types/finpress__editor
	PluginDocumentSettingPanel,
	ErrorBoundary,
} from '@finpress/editor';

/**
 * Internal dependencies
 */
import {
	recordEvent,
	recordEventOnce,
	debouncedRecordEvent,
} from '../../events';

interface TemplatePanelSection {
	id: string;
	render: () => JSX.Element | null;
}

const tracking = {
	recordEvent,
	recordEventOnce,
	debouncedRecordEvent,
};

export function TemplateSettingsPanel() {
	// Allow plugins to add custom template sections
	const templateSections = applyFilters(
		'fincommerce_email_editor_template_sections',
		[],
		tracking
	) as TemplatePanelSection[];

	if ( templateSections.length === 0 ) {
		return null;
	}

	return (
		<PluginDocumentSettingPanel
			name="template-settings-panel"
			title={ __( 'Settings', 'fincommerce' ) }
			className="fincommerce-email-editor__settings-panel"
		>
			{ templateSections.map( ( section ) => (
				// @ts-expect-error Type for ErrorBoundary is outdated in @types/finpress__editor
				<ErrorBoundary key={ `error-boundary-${ section.id }` }>
					<div key={ section.id }>{ section.render() }</div>
				</ErrorBoundary>
			) ) }
		</PluginDocumentSettingPanel>
	);
}
