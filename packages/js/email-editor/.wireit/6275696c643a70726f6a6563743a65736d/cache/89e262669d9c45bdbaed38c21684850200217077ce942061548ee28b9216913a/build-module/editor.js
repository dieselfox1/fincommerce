import { jsx as _jsx } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { StrictMode, createRoot, useEffect, useLayoutEffect, useState, } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import '@wordpress/format-library'; // Enables text formatting capabilities
/**
 * Internal dependencies
 */
import { getAllowedBlockNames, initBlocks } from './blocks';
import { initializeLayout } from './layouts/flex-email';
import { InnerEditor } from './components/block-editor';
import { createStore, storeName } from './store';
import { initHooks } from './editor-hooks';
import { initTextHooks } from './text-hooks';
import { initEventCollector, initStoreTracking, initDomTracking, } from './events';
import { initContentValidationMiddleware } from './middleware/content-validation';
import { useContentValidation, useRemoveSavingFailedNotices, useFilterEditorContentStylesheets, } from './hooks';
function Editor({ postId, postType, isPreview = false, }) {
    const [isInitialized, setIsInitialized] = useState(false);
    const { settings } = useSelect((select) => ({
        settings: select(storeName).getInitialEditorSettings(),
    }), []);
    useContentValidation();
    useRemoveSavingFailedNotices();
    const { setEmailPost } = useDispatch(storeName);
    useEffect(() => {
        setEmailPost(postId, postType);
        setIsInitialized(true);
    }, [postId, postType, setEmailPost]);
    const contentRef = useFilterEditorContentStylesheets();
    if (!isInitialized) {
        return null;
    }
    // Set allowed blockTypes and isPreviewMode to the editor settings.
    const editorSettings = {
        ...settings,
        allowedBlockTypes: getAllowedBlockNames(),
        isPreviewMode: isPreview,
    };
    return (_jsx(StrictMode, { children: _jsx(InnerEditor, { postId: postId, postType: postType, settings: editorSettings, contentRef: contentRef }) }));
}
function onInit() {
    initEventCollector();
    initStoreTracking();
    initDomTracking();
    createStore();
    initContentValidationMiddleware();
    initializeLayout();
    initBlocks();
    initHooks();
    initTextHooks();
}
export function initialize(elementId) {
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
    const WrappedEditor = applyFilters('fincommerce_email_editor_wrap_editor_component', Editor);
    onInit();
    const root = createRoot(container);
    root.render(_jsx(WrappedEditor, { postId: current_post_id, postType: current_post_type }));
}
export function ExperimentalEmailEditor({ postId, postType, isPreview = false, }) {
    const [isInitialized, setIsInitialized] = useState(false);
    useLayoutEffect(() => {
        onInit();
        setIsInitialized(true);
    }, []);
    const WrappedEditor = applyFilters('fincommerce_email_editor_wrap_editor_component', Editor);
    if (!isInitialized) {
        return null;
    }
    return (_jsx(WrappedEditor, { postId: postId, postType: postType, isPreview: isPreview }));
}
