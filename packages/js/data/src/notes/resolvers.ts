/**
 * External dependencies
 */
import { addQueryArgs } from '@finpress/url';
import { apiFetch } from '@finpress/data-controls';

/**
 * Internal dependencies
 */
import { NAMESPACE } from '../constants';
import { setNotes, setNotesQuery, setError } from './actions';
import { NoteQuery, Note } from './types';
import { checkUserCapability } from '../utils';

export function* getNotes( query: NoteQuery = {} ) {
	const url = addQueryArgs( `${ NAMESPACE }/admin/notes`, query );

	try {
		yield checkUserCapability( 'manage_fincommerce' );

		const notes: Note[] = yield apiFetch( {
			path: url,
		} );

		yield setNotes( notes );
		yield setNotesQuery(
			query,
			notes.map( ( note ) => note.id )
		);
	} catch ( error ) {
		yield setError( 'getNotes', error );
	}
}
