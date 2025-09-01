/**
 * External dependencies
 */

import { addFilter } from '@wordpress/hooks';

/**
 * Use the 'fincommerce_admin_notices_to_show' filter to add notices to show.
 */
addFilter(
	'fincommerce_admin_notices_to_show',
	'plugin-domain',
	( notices ) => {
		return [
			...notices,
			// element id, [ classes to include ], [ classes to exclude ]
			[ null, [ 'fincommerce-admin' ], [ 'ok-to-hide' ] ],
			[ 'fincommerce-admin-important-notice', null, null ],
		];
	}
);

/**
 * Use the 'fincommerce_admin_should_hide_notice' filter to show a specific notice by inspecting its children.
 */
addFilter(
	'fincommerce_admin_should_hide_notice',
	'plugin-domain',
	( hide, notice ) => {
		if ( hide && notice.querySelector( 'p.notice-text' ) ) {
			return false;
		}

		return hide;
	}
);
