/**
 * External dependencies
 */
import { createRoot } from '@finpress/element';

/**
 * Internal dependencies
 */
import SettingsPage from '@fincommerce/block-library/assets/js/extensions/shipping-methods/pickup-location/settings-page';

const settingsContainer = document.getElementById(
	'wc-shipping-method-pickup-location-settings-container'
);

if ( settingsContainer ) {
	const root = createRoot( settingsContainer );
	root.render( <SettingsPage /> );
}
