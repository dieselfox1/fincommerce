/**
 * External dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { App } from './App';

addFilter( 'fincommerce_admin_pages_list', 'live-branches', ( pages ) => {
	pages.push( {
		container: App,
		path: '/live-branches',
		wpOpenMenu: 'toplevel_page_fincommerce',
		capability: 'read',
		breadcrumbs: [ 'Live Branches' ],
		navArgs: { id: 'fincommerce-beta-tester-live-branches' },
	} );

	return pages;
} );
