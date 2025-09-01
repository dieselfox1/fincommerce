"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditorSettings = getEditorSettings;
exports.getEditorTheme = getEditorTheme;
exports.getUrls = getUrls;
function getEditorSettings() {
    return window.fincommerceEmailEditor.editor_settings;
}
function getEditorTheme() {
    return window.fincommerceEmailEditor.editor_theme;
}
function getUrls() {
    return window.fincommerceEmailEditor.urls;
}
