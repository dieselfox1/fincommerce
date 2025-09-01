"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishSave = PublishSave;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const send_button_1 = require("../components/header/send-button");
function NextPublishSlot({ children }) {
    const sendButtonPortalEl = (0, element_1.useRef)(document.createElement('div'));
    // Place element for rendering send button next to publish button
    (0, element_1.useEffect)(() => {
        const publishButton = document.getElementsByClassName('editor-post-publish-button__button')[0];
        if (publishButton) {
            publishButton.parentNode?.insertBefore(sendButtonPortalEl.current, publishButton.nextSibling);
        }
    }, [sendButtonPortalEl]);
    return (0, element_1.createPortal)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }), sendButtonPortalEl.current);
}
function PublishSave() {
    const observerRef = (0, element_1.useRef)(null);
    const { hasNonPostEntityChanges, isEditedPostDirty, isEditingTemplate } = (0, data_1.useSelect)((select) => ({
        hasNonPostEntityChanges: 
        // @ts-expect-error hasNonPostEntityChanges is not typed in @types/wordpress__editor
        select(editor_1.store).hasNonPostEntityChanges(),
        isEditedPostDirty: select(editor_1.store).isEditedPostDirty(),
        isEditingTemplate: select(editor_1.store).getCurrentPostType() ===
            'wp_template',
    }), []);
    // Display the original publish button when:
    // - The user is editing a template (regardless of detected changes).
    // - There are changes outside of the post (e.g., in a linked template).
    // - There are changes in the post together with changes outside of it.
    //
    // Do not display the button when:
    // - There are only changes in the post content with no related entity changes.
    // Draft posts have their own "Save as draft" button.
    const displayOriginalPublishButton = isEditingTemplate ||
        hasNonPostEntityChanges ||
        (isEditedPostDirty && hasNonPostEntityChanges);
    const toggleElementVisible = (0, element_1.useCallback)((element, visible) => {
        if (visible && element.classList.contains('force-hidden')) {
            element.classList.remove('force-hidden');
        }
        if (!visible && !element.classList.contains('force-hidden')) {
            element.classList.add('force-hidden');
        }
    }, []);
    (0, element_1.useEffect)(() => {
        const publishButton = document.getElementsByClassName('editor-post-publish-button__button')[0];
        toggleElementVisible(publishButton, displayOriginalPublishButton);
        if (!publishButton) {
            return () => observerRef.current?.disconnect();
        }
        // It may get additionally re-rendered by the editor, so we need to check it again
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        observerRef.current = new MutationObserver(() => {
            toggleElementVisible(publishButton, displayOriginalPublishButton);
        });
        observerRef.current.observe(publishButton, {
            attributes: true,
            childList: true,
            subtree: false,
        });
        // Cleanup observer
        return () => observerRef.current?.disconnect();
    }, [displayOriginalPublishButton, toggleElementVisible]);
    return ((0, jsx_runtime_1.jsx)(NextPublishSlot, { children: !displayOriginalPublishButton && (0, jsx_runtime_1.jsx)(send_button_1.SendButton, {}) }));
}
