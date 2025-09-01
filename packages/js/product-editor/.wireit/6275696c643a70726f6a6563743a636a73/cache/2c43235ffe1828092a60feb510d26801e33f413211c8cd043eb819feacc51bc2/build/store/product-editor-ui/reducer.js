"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reducer;
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
/**
 * Types & Constants
 */
const INITIAL_STATE = {
    modalEditor: {
        isOpen: false,
        blocks: [],
        hasChanged: false,
    },
    prepublishPanel: {
        isOpen: false,
    },
};
function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case constants_1.ACTION_MODAL_EDITOR_OPEN:
            return {
                ...state,
                modalEditor: {
                    ...state.modalEditor,
                    isOpen: true,
                },
            };
        case constants_1.ACTION_MODAL_EDITOR_CLOSE:
            return {
                ...state,
                modalEditor: {
                    ...state.modalEditor,
                    isOpen: false,
                },
            };
        case constants_1.ACTION_MODAL_EDITOR_SET_BLOCKS:
            return {
                ...state,
                modalEditor: {
                    ...state.modalEditor,
                    blocks: action.blocks || [],
                },
            };
        case constants_1.ACTION_MODAL_EDITOR_CONTENT_HAS_CHANGED:
            return {
                ...state,
                modalEditor: {
                    ...state.modalEditor,
                    hasChanged: action?.hasChanged || false,
                },
            };
        case constants_1.ACTION_PANEL_PREPUBLISH_OPEN:
            return {
                ...state,
                prepublishPanel: {
                    isOpen: true,
                },
            };
        case constants_1.ACTION_PANEL_PREPUBLISH_CLOSE:
            return {
                ...state,
                prepublishPanel: {
                    isOpen: false,
                },
            };
    }
    return state;
}
