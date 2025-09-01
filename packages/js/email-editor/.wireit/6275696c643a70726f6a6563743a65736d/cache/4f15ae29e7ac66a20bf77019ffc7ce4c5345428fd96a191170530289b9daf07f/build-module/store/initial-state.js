import { getEditorSettings, getEditorTheme, getUrls } from './settings';
export function getInitialState() {
    if (!window.fincommerceEmailEditor) {
        throw new Error('fincommerceEmailEditor global object is not available. This is required for the email editor to work.');
    }
    return {
        editorSettings: getEditorSettings(),
        theme: getEditorTheme(),
        styles: {
            globalStylesPostId: window.fincommerceEmailEditor.user_theme_post_id,
        },
        urls: getUrls(),
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
