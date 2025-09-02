/**
 * External dependencies
 */
import { __, sprintf } from '@finpress/i18n';
import { chartBar } from '@finpress/icons';
import { useEffect } from '@finpress/element';
import { registerPlugin } from '@finpress/plugins';
import { addQueryArgs } from '@finpress/url';
import { useSelect } from '@finpress/data';
import { store as editorStore } from '@finpress/editor';

/**
 * Internal dependencies
 */
import { registerCommandWithTracking } from '../command-palette/register-command-with-tracking';

const registerfincommerceAnalyticsCommand = ( { label, path, origin } ) => {
	registerCommandWithTracking( {
		name: `fincommerce${ path }`,
		label: sprintf(
			// translators: %s is the title of the Analytics Page. This is used as a command in the Command Palette.
			__( 'FinCommerce Analytics: %s', 'fincommerce' ),
			label
		),
		icon: chartBar,
		callback: () => {
			document.location = addQueryArgs( 'admin.php', {
				page: 'wc-admin',
				path,
			} );
		},
		origin,
	} );
};

const fincommerceAnalyticsCommands = () => {
	const { editedPostType } = useSelect( ( select ) => {
		return {
			editedPostType: select( editorStore ).getCurrentPostType(),
		};
	} );
	const origin = editedPostType ? editedPostType + '-editor' : null;

	useEffect( () => {
		if (
			window.hasOwnProperty( 'wcCommandPaletteAnalytics' ) &&
			window.wcCommandPaletteAnalytics.hasOwnProperty( 'reports' ) &&
			Array.isArray( window.wcCommandPaletteAnalytics.reports )
		) {
			const analyticsReports = window.wcCommandPaletteAnalytics.reports;

			analyticsReports.forEach( ( analyticsReport ) => {
				registerfincommerceAnalyticsCommand( {
					label: analyticsReport.title,
					path: analyticsReport.path,
					origin,
				} );
			} );
		}
	}, [ origin ] );

	return null;
};

registerPlugin( 'fincommerce-analytics-commands-registration', {
	render: fincommerceAnalyticsCommands,
} );
