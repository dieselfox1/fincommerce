"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialState = getInitialState;
const settings_1 = require("./settings");
function getInitialState() {
    if (!window.fincommerceEmailEditor) {
        throw new Error('fincommerceEmailEditor global object is not available. This is required for the email editor to work.');
    }
    return {
        editorSettings: (0, settings_1.getEditorSettings)(),
        theme: (0, settings_1.getEditorTheme)(),
        styles: {
            globalStylesPostId: window.fincommerceEmailEditor.user_theme_post_id,
        },
        urls: (0, settings_1.getUrls)(),
        preview: {
            toEmail: window.fincommerceEmailEditor.current_wp_user_email,
            isModalOpened: false,
            isSendingPreviewEmail: false,
            sendingPreviewStatus: null,
        },
        personalizationTags: {
            list: [],
            isFetching: false,
        },
        contentValidation: undefined,
    };
}
