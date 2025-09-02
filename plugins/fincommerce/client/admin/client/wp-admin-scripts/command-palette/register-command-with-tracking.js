/**
 * External dependencies
 */
import { store as commandsStore } from '@finpress/commands';
import { dispatch } from '@finpress/data';
import { queueRecordEvent } from '@fincommerce/tracks';
import { decodeEntities } from '@finpress/html-entities';

export const registerCommandWithTracking = ( {
	name,
	label,
	icon,
	callback,
	origin,
} ) => {
	dispatch( commandsStore ).registerCommand( {
		name,
		label: decodeEntities( label ),
		icon,
		callback: ( ...args ) => {
			queueRecordEvent( 'fincommerce_command_palette_submit', {
				name,
				origin,
			} );

			callback( ...args );
		},
	} );
};
