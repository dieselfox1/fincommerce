/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { pluginsStore, useUser, useUserPreferences } from '@fincommerce/data';
import { H } from '@fincommerce/components';
import { recordEvent } from '@fincommerce/tracks';
import { getAdminLink } from '@fincommerce/settings';
import { createErrorNotice } from '@fincommerce/data/src/plugins/actions';

const getJetpackInstallText = ( jetpackInstallState ) => {
	return (
		{
			unavailable: __( 'Get Jetpack', 'fincommerce' ),
			installed: __( 'Activate Jetpack', 'fincommerce' ),
			activated: __( 'Connect Jetpack', 'fincommerce' ),
		}[ jetpackInstallState ] || ''
	);
};

export const JetpackCTA = ( {
	onClickInstall,
	onClickDismiss,
	isBusy,
	jetpackInstallState,
} ) => {
	return (
		<article className="fincommerce-stats-overview__install-jetpack-promo">
			<div className="fincommerce-stats-overview__install-jetpack-promo__content">
				<H>{ __( 'Get traffic stats with Jetpack', 'fincommerce' ) }</H>
				<p>
					{ __(
						'Keep an eye on your views and visitors metrics with ' +
							'Jetpack. Requires Jetpack plugin and a WordPress.com ' +
							'account.',
						'fincommerce'
					) }
				</p>
			</div>
			<footer>
				<Button
					isSecondary
					onClick={ () => {
						recordEvent( 'statsoverview_install_jetpack' );
						onClickInstall();
					} }
					disabled={ isBusy }
					isBusy={ isBusy }
				>
					{ getJetpackInstallText( jetpackInstallState ) }
				</Button>
				<Button
					isTertiary
					onClick={ () => {
						recordEvent( 'statsoverview_dismiss_install_jetpack' );
						onClickDismiss();
					} }
					disabled={ isBusy }
					isBusy={ isBusy }
				>
					{ __( 'No thanks', 'fincommerce' ) }
				</Button>
			</footer>
		</article>
	);
};

export const InstallJetpackCTA = () => {
	const { currentUserCan } = useUser();
	const { updateUserPreferences, ...userPrefs } = useUserPreferences();
	const { canUserInstallPlugins, jetpackInstallState, isBusy } = useSelect(
		( select ) => {
			const { getPluginInstallState, isPluginsRequesting } =
				select( pluginsStore );
			const installState = getPluginInstallState( 'jetpack' );
			const busyState =
				isPluginsRequesting( 'getJetpackConnectUrl' ) ||
				isPluginsRequesting( 'installPlugins' ) ||
				isPluginsRequesting( 'activatePlugins' );

			return {
				isBusy: busyState,
				jetpackInstallState: installState,
				canUserInstallPlugins: currentUserCan( 'install_plugins' ),
			};
		}
	);

	const { installJetpackAndConnect } = useDispatch( pluginsStore );

	if ( ! canUserInstallPlugins ) {
		return null;
	}

	const onClickInstall = () => {
		installJetpackAndConnect( createErrorNotice, getAdminLink );
	};

	return (
		<JetpackCTA
			jetpackInstallState={ jetpackInstallState }
			isBusy={ isBusy }
			onClickInstall={ onClickInstall }
			onClickDismiss={ () => {
				const homepageStats = userPrefs.homepage_stats || {};
				homepageStats.installJetpackDismissed = true;
				updateUserPreferences( {
					homepage_stats: homepageStats,
				} );
			} }
		/>
	);
};
