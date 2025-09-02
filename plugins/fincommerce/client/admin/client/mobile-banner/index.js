/**
 * External dependencies
 */
import { registerPlugin } from '@finpress/plugins';
import { WooHeaderItem } from '@fincommerce/admin-layout';
import { useUserPreferences } from '@fincommerce/data';

/**
 * Internal dependencies
 */
import { Banner } from './banner';

export const MobileAppBanner = () => {
	const { updateUserPreferences, ...userData } = useUserPreferences();
	const isDismissed = userData.android_app_banner_dismissed === 'yes';

	const onClick = () => {
		updateUserPreferences( {
			android_app_banner_dismissed: 'yes',
		} );
	};

	if ( isDismissed ) {
		return null;
	}

	return (
		<WooHeaderItem>
			<Banner onDismiss={ onClick } onInstall={ onClick } />
		</WooHeaderItem>
	);
};

registerPlugin( 'mobile-banner-header-item', {
	render: MobileAppBanner,
	scope: 'fincommerce-admin',
} );
