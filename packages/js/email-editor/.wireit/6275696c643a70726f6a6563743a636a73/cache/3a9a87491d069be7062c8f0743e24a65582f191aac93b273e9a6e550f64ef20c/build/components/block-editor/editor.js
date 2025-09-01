"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEditor = InnerEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const core_data_1 = require("@wordpress/core-data");
const commands_1 = require("@wordpress/commands");
// eslint-disable-next-line @fincommerce/dependency-group
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const store_1 = require("../../store");
const use_navigate_to_entity_record_1 = require("../../hooks/use-navigate-to-entity-record");
const private_apis_1 = require("../../private-apis");
const hooks_1 = require("../../hooks");
const template_select_1 = require("../template-select");
const styles_sidebar_1 = require("../styles-sidebar");
const preview_1 = require("../preview");
const more_menu_1 = require("../more-menu");
const settings_panel_1 = require("../sidebar/settings-panel");
const template_settings_panel_1 = require("../sidebar/template-settings-panel");
const publish_save_1 = require("../../hacks/publish-save");
const notices_1 = require("../notices");
const sidebar_1 = require("../sidebar");
const back_button_content_1 = require("../header/back-button-content");
const events_1 = require("../../events");
function InnerEditor({ postId: initialPostId, postType: initialPostType, settings, contentRef, }) {
    const { currentPost, onNavigateToEntityRecord, onNavigateToPreviousEntityRecord, } = (0, use_navigate_to_entity_record_1.useNavigateToEntityRecord)(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    initialPostId, 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    initialPostType, 'post-only');
    // isFullScreenForced – comes from settings and cannot be changed by the user
    // isFullscreenEnabled – indicates if a user has enabled fullscreen mode
    const { post, template, isFullscreenEnabled } = (0, data_1.useSelect)((select) => {
        const { getEntityRecord } = select(core_data_1.store);
        const { getEditedPostTemplate } = select(store_1.storeName);
        const postObject = getEntityRecord('postType', currentPost.postType, currentPost.postId);
        return {
            template: postObject && currentPost.postType !== 'wp_template'
                ? getEditedPostTemplate(postObject.template)
                : null,
            post: postObject,
            isFullscreenEnabled: select(store_1.storeName).isFeatureActive('fullscreenMode'),
        };
    }, [currentPost.postType, currentPost.postId]);
    const { isFullScreenForced, displaySendEmailButton } = settings;
    // @ts-expect-error Type is missing in @types/wordpress__editor
    const { removeEditorPanel } = (0, data_1.useDispatch)(editor_1.store);
    (0, element_1.useEffect)(() => {
        removeEditorPanel('post-status');
    }, [removeEditorPanel]);
    const [styles] = (0, hooks_1.useEmailCss)();
    const editorSettings = (0, element_1.useMemo)(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => ({
        ...settings,
        onNavigateToEntityRecord,
        onNavigateToPreviousEntityRecord,
        defaultRenderingMode: currentPost.postType === 'wp_template'
            ? 'post-only'
            : 'template-locked',
        supportsTemplateMode: true,
    }), [
        settings,
        onNavigateToEntityRecord,
        onNavigateToPreviousEntityRecord,
        currentPost.postType,
    ]);
    const canRenderEditor = post &&
        (currentPost.postType === 'wp_template' ||
            post.template === template?.slug || // If the post has a template, check proper template is loaded.
            (!post.template && template)); // If the post has no template, we render with the default template.
    if (!canRenderEditor) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "spinner-container", children: (0, jsx_runtime_1.jsx)(components_1.Spinner, { style: { width: '80px', height: '80px' } }) }));
    }
    (0, events_1.recordEventOnce)('editor_layout_loaded');
    return ((0, jsx_runtime_1.jsx)(components_1.SlotFillProvider, { children: (0, jsx_runtime_1.jsxs)(editor_1.ErrorBoundary, { canCopyContent: true, children: [(0, jsx_runtime_1.jsx)(commands_1.CommandMenu, {}), (0, jsx_runtime_1.jsxs)(private_apis_1.Editor, { postId: currentPost.postId, postType: currentPost.postType, settings: editorSettings, templateId: template && template.id, styles: styles, contentRef: contentRef, children: [(0, jsx_runtime_1.jsx)(editor_1.AutosaveMonitor, {}), (0, jsx_runtime_1.jsx)(editor_1.LocalAutosaveMonitor, {}), (0, jsx_runtime_1.jsx)(editor_1.UnsavedChangesWarning, {}), (0, jsx_runtime_1.jsx)(editor_1.EditorKeyboardShortcutsRegister, {}), (0, jsx_runtime_1.jsx)(editor_1.PostLockedModal, {}), (0, jsx_runtime_1.jsx)(template_select_1.TemplateSelection, {}), (0, jsx_runtime_1.jsx)(styles_sidebar_1.StylesSidebar, {}), (0, jsx_runtime_1.jsx)(preview_1.SendPreview, {}), (0, jsx_runtime_1.jsx)(private_apis_1.FullscreenMode, { isActive: isFullScreenForced || isFullscreenEnabled }), (isFullScreenForced || isFullscreenEnabled) && ((0, jsx_runtime_1.jsx)(back_button_content_1.BackButtonContent, {})), !isFullScreenForced && (0, jsx_runtime_1.jsx)(more_menu_1.MoreMenu, {}), currentPost.postType === 'wp_template' ? ((0, jsx_runtime_1.jsx)(template_settings_panel_1.TemplateSettingsPanel, {})) : ((0, jsx_runtime_1.jsx)(settings_panel_1.SettingsPanel, {})), displaySendEmailButton && (0, jsx_runtime_1.jsx)(publish_save_1.PublishSave, {}), (0, jsx_runtime_1.jsx)(notices_1.EditorNotices, {}), (0, jsx_runtime_1.jsx)(sidebar_1.BlockCompatibilityWarnings, {})] })] }) }));
}
