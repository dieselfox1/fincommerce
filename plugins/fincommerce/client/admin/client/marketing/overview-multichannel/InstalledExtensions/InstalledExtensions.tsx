/**
 * External dependencies
 */
import { Fragment } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { Button } from '@finpress/components';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import {
	CollapsibleCard,
	CardDivider,
	ProductIcon,
	PluginCardBody,
} from '~/marketing/components';
import { InstalledPlugin } from '~/marketing/types';
import { useInstalledPluginsWithoutChannels } from '~/marketing/hooks';

export const InstalledExtensions = () => {
	const { data, activatingPlugins, activateInstalledPlugin } =
		useInstalledPluginsWithoutChannels();

	if ( data.length === 0 ) {
		return null;
	}

	const getButton = ( plugin: InstalledPlugin ) => {
		if ( plugin.status === 'installed' ) {
			return (
				<Button
					variant="secondary"
					isBusy={ activatingPlugins.includes( plugin.slug ) }
					disabled={ activatingPlugins.includes( plugin.slug ) }
					onClick={ () => {
						recordEvent( 'marketing_installed_activate', {
							name: plugin.name,
						} );
						activateInstalledPlugin( plugin.slug );
					} }
				>
					{ __( 'Activate', 'fincommerce' ) }
				</Button>
			);
		}

		if ( plugin.status === 'activated' ) {
			return (
				<Button
					variant="primary"
					href={ plugin.settingsUrl }
					onClick={ () => {
						recordEvent( 'marketing_installed_finish_setup', {
							name: plugin.name,
						} );
					} }
				>
					{ __( 'Finish setup', 'fincommerce' ) }
				</Button>
			);
		}

		if ( plugin.status === 'configured' ) {
			return (
				<Button
					variant="secondary"
					href={ plugin.dashboardUrl || plugin.settingsUrl }
					onClick={ () => {
						recordEvent( 'marketing_installed_options', {
							name: plugin.name,
							link: 'manage',
						} );
					} }
				>
					{ __( 'Manage', 'fincommerce' ) }
				</Button>
			);
		}
	};

	return (
		<CollapsibleCard header={ __( 'Installed extensions', 'fincommerce' ) }>
			{ data.map( ( el, idx ) => {
				return (
					<Fragment key={ el.slug }>
						<PluginCardBody
							icon={ <ProductIcon product={ el.slug } /> }
							name={ el.name }
							description={ el.description }
							button={ getButton( el ) }
						/>
						{ idx !== data.length - 1 && <CardDivider /> }
					</Fragment>
				);
			} ) }
		</CollapsibleCard>
	);
};
