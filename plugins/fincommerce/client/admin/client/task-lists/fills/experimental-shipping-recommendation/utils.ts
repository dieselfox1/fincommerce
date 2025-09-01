/**
 * External dependencies
 */

import { getAdminLink } from '@fincommerce/settings';

export const redirectToWCSSettings = () => {
	if ( window?.location ) {
		window.location.href = getAdminLink(
			'admin.php?page=wc-settings&tab=shipping&section=fincommerce-shipping-settings'
		);
	}
};
