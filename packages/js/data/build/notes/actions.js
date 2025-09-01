"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNote = setNote;
exports.setNoteIsUpdating = setNoteIsUpdating;
exports.setNotes = setNotes;
exports.setNotesQuery = setNotesQuery;
exports.setError = setError;
exports.setIsRequesting = setIsRequesting;
exports.updateNote = updateNote;
exports.triggerNoteAction = triggerNoteAction;
exports.removeNote = removeNote;
exports.removeAllNotes = removeAllNotes;
exports.batchUpdateNotes = batchUpdateNotes;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const url_1 = require("@wordpress/url");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const action_types_1 = __importDefault(require("./action-types"));
function setNote(noteId, noteFields) {
    return {
        type: action_types_1.default.SET_NOTE,
        noteId,
        noteFields,
    };
}
function setNoteIsUpdating(noteId, isUpdating) {
    return {
        type: action_types_1.default.SET_NOTE_IS_UPDATING,
        noteId,
        isUpdating,
    };
}
function setNotes(notes) {
    return {
        type: action_types_1.default.SET_NOTES,
        notes,
    };
}
function setNotesQuery(query, noteIds) {
    return {
        type: action_types_1.default.SET_NOTES_QUERY,
        query,
        noteIds,
    };
}
function setError(selector, error) {
    return {
        type: action_types_1.default.SET_ERROR,
        error,
        selector,
    };
}
function setIsRequesting(selector, isRequesting) {
    return {
        type: action_types_1.default.SET_IS_REQUESTING,
        selector,
        isRequesting,
    };
}
function* updateNote(noteId, noteFields) {
    yield setIsRequesting('updateNote', true);
    yield setNoteIsUpdating(noteId, true);
    try {
        const url = `${constants_1.NAMESPACE}/admin/notes/${noteId}`;
        const note = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'PUT',
            data: noteFields,
        });
        yield setNote(noteId, note);
        yield setIsRequesting('updateNote', false);
        yield setNoteIsUpdating(noteId, false);
    }
    catch (error) {
        yield setError('updateNote', error);
        yield setIsRequesting('updateNote', false);
        yield setNoteIsUpdating(noteId, false);
        throw new Error();
    }
}
function* triggerNoteAction(noteId, actionId) {
    yield setIsRequesting('triggerNoteAction', true);
    const url = `${constants_1.NAMESPACE}/admin/notes/${noteId}/action/${actionId}`;
    try {
        const result = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'POST',
        });
        yield updateNote(noteId, result);
        yield setIsRequesting('triggerNoteAction', false);
    }
    catch (error) {
        yield setError('triggerNoteAction', error);
        yield setIsRequesting('triggerNoteAction', false);
        throw new Error();
    }
}
function* removeNote(noteId) {
    yield setIsRequesting('removeNote', true);
    yield setNoteIsUpdating(noteId, true);
    try {
        const url = `${constants_1.NAMESPACE}/admin/notes/delete/${noteId}`;
        const response = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'DELETE',
        });
        yield setNote(noteId, response);
        yield setIsRequesting('removeNote', false);
        return response;
    }
    catch (error) {
        yield setError('removeNote', error);
        yield setIsRequesting('removeNote', false);
        yield setNoteIsUpdating(noteId, false);
        throw new Error();
    }
}
function* removeAllNotes(query = {}) {
    yield setIsRequesting('removeAllNotes', true);
    try {
        const url = (0, url_1.addQueryArgs)(`${constants_1.NAMESPACE}/admin/notes/delete/all`, query);
        const notes = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'DELETE',
        });
        yield setNotes(notes);
        yield setIsRequesting('removeAllNotes', false);
        return notes;
    }
    catch (error) {
        yield setError('removeAllNotes', error);
        yield setIsRequesting('removeAllNotes', false);
        throw new Error();
    }
}
function* batchUpdateNotes(noteIds, noteFields) {
    yield setIsRequesting('batchUpdateNotes', true);
    try {
        const url = `${constants_1.NAMESPACE}/admin/notes/update`;
        const notes = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'PUT',
            data: {
                noteIds,
                ...noteFields,
            },
        });
        yield setNotes(notes);
        yield setIsRequesting('batchUpdateNotes', false);
    }
    catch (error) {
        yield setError('updateNote', error);
        yield setIsRequesting('batchUpdateNotes', false);
        throw new Error();
    }
}
