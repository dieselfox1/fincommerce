"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    isModalEditorOpen: function isModalEditorOpen(state) {
        return state.modalEditor?.isOpen;
    },
    getModalEditorBlocks: function getModalEditorBlocks(state) {
        return state.modalEditor?.blocks || [];
    },
    getModalEditorContentHasChanged: function getModalEditorContentHasChanged(state) {
        return !!state.modalEditor?.hasChanged;
    },
    isPrepublishPanelOpen: function isPrepublishPanelOpen(state) {
        return state.prepublishPanel?.isOpen;
    },
};
