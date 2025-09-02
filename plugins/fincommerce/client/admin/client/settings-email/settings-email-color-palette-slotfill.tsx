/**
 * External dependencies
 */
import { createSlotFill } from '@finpress/components';
import { registerPlugin } from '@finpress/plugins';

/**
 * Internal dependencies
 */
import './style.scss';
import { SETTINGS_SLOT_FILL_CONSTANT } from '~/settings/settings-slots';
import { ResetStylesControl } from './settings-email-color-palette-control';

const { Fill } = createSlotFill( SETTINGS_SLOT_FILL_CONSTANT );

export type DefaultColors = {
	baseColor: string;
	bgColor: string;
	bodyBgColor: string;
	bodyTextColor: string;
	footerTextColor: string;
};

type EmailColorPaletteFillProps = {
	defaultColors: DefaultColors;
	hasThemeJson: boolean;
	autoSync: boolean;
	autoSyncInput: HTMLInputElement;
};

const EmailColorPaletteFill = ( {
	defaultColors,
	hasThemeJson,
	autoSync,
	autoSyncInput,
}: EmailColorPaletteFillProps ) => {
	return (
		<Fill>
			<ResetStylesControl
				autoSync={ autoSync }
				autoSyncInput={ autoSyncInput }
				defaultColors={ defaultColors }
				hasThemeJson={ hasThemeJson }
			/>
		</Fill>
	);
};

export const registerSettingsEmailColorPaletteFill = () => {
	const autoSyncInput = document.getElementById(
		'fincommerce_email_auto_sync_with_theme'
	) as HTMLInputElement;
	if ( ! autoSyncInput ) {
		return; // Don't register the plugin if the input doesn't exist
	}
	const autoSync = autoSyncInput.value === 'yes';
	const slotElementId = 'wc_settings_email_color_palette_slotfill';
	const slotElement = document.getElementById( slotElementId );

	const defaultColorsData = slotElement?.getAttribute(
		'data-default-colors'
	);
	let defaultColors = {} as DefaultColors;
	try {
		const {
			base: baseColor,
			bg: bgColor,
			body_bg: bodyBgColor,
			body_text: bodyTextColor,
			footer_text: footerTextColor,
		} = JSON.parse( defaultColorsData || '' );
		defaultColors = {
			baseColor,
			bgColor,
			bodyBgColor,
			bodyTextColor,
			footerTextColor,
		};
	} catch ( e ) {}

	const hasThemeJson =
		slotElement?.getAttribute( 'data-has-theme-json' ) !== null;

	registerPlugin( 'fincommerce-admin-settings-email-color-palette', {
		scope: 'fincommerce-email-color-palette-settings',
		render: () => (
			<EmailColorPaletteFill
				autoSync={ autoSync }
				autoSyncInput={ autoSyncInput }
				defaultColors={ defaultColors }
				hasThemeJson={ hasThemeJson }
			/>
		),
	} );
};
