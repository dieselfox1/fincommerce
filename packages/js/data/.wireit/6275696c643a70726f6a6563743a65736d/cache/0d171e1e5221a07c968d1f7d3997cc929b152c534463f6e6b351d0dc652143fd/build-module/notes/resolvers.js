/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import { apiFetch } from '@wordpress/data-controls';
/**
 * Internal dependencies
 */
import { NAMESPACE } from '../constants';
import { setNotes, setNotesQuery, setError } from './actions';
import { checkUserCapability } from '../utils';
export function* getNotes(query = {}) {
    const url = addQueryArgs(`${NAMESPACE}/admin/notes`, query);
    try {
        yield checkUserCapability('manage_fincommerce');
        const notes = yield apiFetch({
            path: url,
        });
        yield setNotes(notes);
        yield setNotesQuery(query, notes.map((note) => note.id));
    }
    catch (error) {
        yield setError('getNotes', error);
    }
}
