"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
const modalEditorActions = {
    openModalEditor: () => ({
        type: constants_1.ACTION_MODAL_EDITOR_OPEN,
    }),
    closeModalEditor: () => ({
        type: constants_1.ACTION_MODAL_EDITOR_CLOSE,
    }),
    setModalEditorBlocks: (blocks) => ({
        type: constants_1.ACTION_MODAL_EDITOR_SET_BLOCKS,
        blocks,
    }),
    setModalEditorContentHasChanged: (hasChanged) => ({
        type: constants_1.ACTION_MODAL_EDITOR_CONTENT_HAS_CHANGED,
        hasChanged,
    }),
    isModalEditorOpen: () => ({
        type: Boolean,
    }),
};
const prepublishPanelActions = {
    openPrepublishPanel: () => ({
        type: constants_1.ACTION_PANEL_PREPUBLISH_OPEN,
    }),
    closePrepublishPanel: () => ({
        type: constants_1.ACTION_PANEL_PREPUBLISH_CLOSE,
    }),
};
exports.default = {
    ...modalEditorActions,
    ...prepublishPanelActions,
};
