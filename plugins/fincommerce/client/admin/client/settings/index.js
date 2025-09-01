/**
 * External dependencies
 */
import { createRoot } from '@wordpress/element';
import { SettingsEditor } from '@fincommerce/settings-editor';

/**
 * Internal dependencies
 */
import './settings.scss';

const node = document.getElementById( 'wc-settings-page' );

createRoot( node ).render( <SettingsEditor /> );
