/**
 * External dependencies
 */
import { createRoot } from '@finpress/element';

/**
 * Internal dependencies
 */
import { App } from './app';
import '../index.scss';

const appRoot = document.getElementById(
	'fincommerce-admin-test-helper-app-root'
);

if ( appRoot ) {
	createRoot( appRoot ).render( <App /> );
}
