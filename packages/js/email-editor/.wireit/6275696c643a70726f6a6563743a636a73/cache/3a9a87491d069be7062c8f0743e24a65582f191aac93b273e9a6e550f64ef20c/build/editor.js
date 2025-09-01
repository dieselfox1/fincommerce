"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = initialize;
exports.ExperimentalEmailEditor = ExperimentalEmailEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const hooks_1 = require("@wordpress/hooks");
require("@wordpress/format-library"); // Enables text formatting capabilities
/**
 * Internal dependencies
 */
const blocks_1 = require("./blocks");
const flex_email_1 = require("./layouts/flex-email");
const block_editor_1 = require("./components/block-editor");
const store_1 = require("./store");
const editor_hooks_1 = require("./editor-hooks");
const text_hooks_1 = require("./text-hooks");
const events_1 = require("./events");
const content_validation_1 = require("./middleware/content-validation");
const hooks_2 = require("./hooks");
function Editor({ postId, postType, isPreview = false, }) {
    const [isInitialized, setIsInitialized] = (0, element_1.useState)(false);
    const { settings } = (0, data_1.useSelect)((select) => ({
        settings: select(store_1.storeName).getInitialEditorSettings(),
    }), []);
    (0, hooks_2.useContentValidation)();
    (0, hooks_2.useRemoveSavingFailedNotices)();
    const { setEmailPost } = (0, data_1.useDispatch)(store_1.storeName);
    (0, element_1.useEffect)(() => {
        setEmailPost(postId, postType);
        setIsInitialized(true);
    }, [postId, postType, setEmailPost]);
    const contentRef = (0, hooks_2.useFilterEditorContentStylesheets)();
    if (!isInitialized) {
        return null;
    }
    // Set allowed blockTypes and isPreviewMode to the editor settings.
    const editorSettings = {
        ...settings,
        allowedBlockTypes: (0, blocks_1.getAllowedBlockNames)(),
        isPreviewMode: isPreview,
    };
    return ((0, jsx_runtime_1.jsx)(element_1.StrictMode, { children: (0, jsx_runtime_1.jsx)(block_editor_1.InnerEditor, { postId: postId, postType: postType, settings: editorSettings, contentRef: contentRef }) }));
}
function onInit() {
    (0, events_1.initEventCollector)();
    (0, events_1.initStoreTracking)();
    (0, events_1.initDomTracking)();
    (0, store_1.createStore)();
    (0, content_validation_1.initContentValidationMiddleware)();
    (0, flex_email_1.initializeLayout)();
    (0, blocks_1.initBlocks)();
    (0, editor_hooks_1.initHooks)();
    (0, text_hooks_1.initTextHooks)();
}
function initialize(elementId) {
    const container = document.getElementById(elementId);
    if (!container) {
        return;
    }
    const { current_post_id, current_post_type } = window.fincommerceEmailEditor;
    if (current_post_id === undefined || current_post_id === null) {
        throw new Error('current_post_id is required but not provided.');
    }
    if (!current_post_type) {
        throw new Error('current_post_type is required but not provided.');
    }
    const WrappedEditor = (0, hooks_1.applyFilters)('fincommerce_email_editor_wrap_editor_component', Editor);
    onInit();
    const root = (0, element_1.createRoot)(container);
    root.render((0, jsx_runtime_1.jsx)(WrappedEditor, { postId: current_post_id, postType: current_post_type }));
}
function ExperimentalEmailEditor({ postId, postType, isPreview = false, }) {
    const [isInitialized, setIsInitialized] = (0, element_1.useState)(false);
    (0, element_1.useLayoutEffect)(() => {
        onInit();
        setIsInitialized(true);
    }, []);
    const WrappedEditor = (0, hooks_1.applyFilters)('fincommerce_email_editor_wrap_editor_component', Editor);
    if (!isInitialized) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(WrappedEditor, { postId: postId, postType: postType, isPreview: isPreview }));
}
