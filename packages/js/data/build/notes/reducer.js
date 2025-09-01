"use strict";
/**
 * External dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const reducer = (state = {
    errors: {},
    noteQueries: {},
    notes: {},
    requesting: {},
}, action) => {
    switch (action.type) {
        case action_types_1.default.SET_NOTES:
            state = {
                ...state,
                notes: {
                    ...state.notes,
                    ...action.notes.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {}),
                },
            };
            break;
        case action_types_1.default.SET_NOTES_QUERY:
            state = {
                ...state,
                noteQueries: {
                    ...state.noteQueries,
                    [JSON.stringify(action.query)]: action.noteIds,
                },
            };
            break;
        case action_types_1.default.SET_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    [action.selector]: action.error,
                },
            };
            break;
        case action_types_1.default.SET_NOTE:
            state = {
                ...state,
                notes: {
                    ...state.notes,
                    [action.noteId]: action.noteFields,
                },
            };
            break;
        case action_types_1.default.SET_NOTE_IS_UPDATING:
            state = {
                ...state,
                notes: {
                    ...state.notes,
                    [action.noteId]: {
                        ...state.notes[action.noteId],
                        isUpdating: action.isUpdating,
                    },
                },
            };
            break;
        case action_types_1.default.SET_IS_REQUESTING:
            state = {
                ...state,
                requesting: {
                    ...state.requesting,
                    [action.selector]: action.isRequesting,
                },
            };
            break;
    }
    return state;
};
exports.default = reducer;
