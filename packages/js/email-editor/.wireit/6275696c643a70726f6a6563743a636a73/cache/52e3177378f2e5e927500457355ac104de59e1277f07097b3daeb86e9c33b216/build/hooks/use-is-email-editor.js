"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsEmailEditor = useIsEmailEditor;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const store_1 = require("../store");
/**
 * Hook to detect if we are currently in the email editor context.
 *
 * This hook checks:
 * 1. If the email editor store is present
 * 2. If the currently edited post matches the email editor store's post ID and type
 * 3. If editing a template, checks if it's associated with the email editor store's post
 *
 * @return {boolean} True if we are in the email editor context, false otherwise
 */
function useIsEmailEditor() {
    return (0, data_1.useSelect)((select) => {
        // First, check if the email editor store exists
        const emailEditorStore = select(store_1.storeName);
        if (!emailEditorStore) {
            return false;
        }
        // Get the email editor store's post information
        const emailPostId = emailEditorStore.getEmailPostId();
        const emailPostType = emailEditorStore.getEmailPostType();
        // Get the current post information from the WordPress editor
        const currentPostId = select(editor_1.store).getCurrentPostId();
        const currentPostType = select(editor_1.store).getCurrentPostType();
        // Check if the current post matches the email editor post
        const currentPostMatch = String(currentPostId) === String(emailPostId) &&
            String(currentPostType) === String(emailPostType);
        // If the current post matches the email editor post, we are in the email editor context
        if (currentPostMatch) {
            return true;
        }
        // If we're editing a template, check if it's associated with the email editor post
        if (currentPostType === 'wp_template') {
            // If we're editing a template, check if it's associated with the email editor post
            // Get the current template being edited
            const currentTemplate = emailEditorStore.getCurrentTemplate();
            if (!currentTemplate) {
                return false;
            }
            // Check if this template is associated with the email editor post
            // We need to check if the template is used by the email post type
            const emailTemplates = emailEditorStore.getEmailTemplates();
            if (!emailTemplates) {
                return false;
            }
            // Check if the current template is in the list of email templates
            // and if it's associated with the email post type
            const isEmailTemplate = emailTemplates.some((template) => {
                return (template.id === currentTemplate.id &&
                    template.post_types?.includes(emailPostType));
            });
            return isEmailTemplate;
        }
        return false;
    }, []);
}
