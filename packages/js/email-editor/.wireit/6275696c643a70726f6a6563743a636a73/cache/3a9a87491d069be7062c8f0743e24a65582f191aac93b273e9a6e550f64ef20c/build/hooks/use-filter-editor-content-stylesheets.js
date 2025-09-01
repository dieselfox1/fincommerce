"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFilterEditorContentStylesheets = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const hooks_1 = require("@wordpress/hooks");
const data_1 = require("@wordpress/data");
const editor_1 = require("@wordpress/editor");
/**
 * Returns a ref callback to be attached to the editor content element (inside the iframe).
 * When attached, it removes non-email, non-core stylesheets from the iframe and installs placeholders
 * to prevent Gutenberg's style-compat feature from cloning them back.
 */
const useFilterEditorContentStylesheets = () => {
    const contentRef = (0, element_1.useRef)(null);
    const [refRevision, forceUpdate] = (0, element_1.useState)(0);
    const handleRefChange = (0, element_1.useCallback)((ref) => {
        contentRef.current = ref;
        forceUpdate((i) => ++i);
    }, [contentRef, forceUpdate]);
    const allowedIframeStyleHandles = (0, data_1.useSelect)((select) => {
        const { getEditorSettings } = select(editor_1.store);
        // @ts-expect-error - `allowedIframeStyleHandles` is a custom property available in the email editor settings.
        return getEditorSettings()?.allowedIframeStyleHandles ?? [];
    });
    (0, element_1.useEffect)(() => {
        if (!contentRef.current) {
            return;
        }
        const { ownerDocument } = contentRef.current;
        const stylesheets = Array.from(document.styleSheets);
        const stylesheetIds = stylesheets
            .filter((stylesheet) => {
            if (!(stylesheet?.ownerNode instanceof Element)) {
                return false;
            }
            const stylesheetId = stylesheet.ownerNode.getAttribute('id');
            const shouldRemove = stylesheetId &&
                !allowedIframeStyleHandles.includes(stylesheetId);
            return (0, hooks_1.applyFilters)('fincommerce_email_editor_iframe_stylesheet_should_remove', shouldRemove, stylesheet);
        })
            .map((stylesheet) => stylesheet.ownerNode.getAttribute('id'));
        stylesheetIds.forEach((id) => {
            const existingStyle = ownerDocument.getElementById(id);
            if (existingStyle) {
                existingStyle.remove();
            }
            // Create a placeholder style element to ensure the stylesheet will not be cloned over to the iframe by Gutenberg's style compatibility feature.
            // See https://github.com/WordPress/gutenberg/blob/48ccf3317ef0f18f8ff38e8da748aa62ca3f11cb/packages/block-editor/src/components/iframe/index.js#L184-L186.
            const stylePlaceholder = ownerDocument.createElement('style');
            stylePlaceholder.id = id;
            ownerDocument.head.appendChild(stylePlaceholder);
        });
    }, [allowedIframeStyleHandles, refRevision]);
    return handleRefChange;
};
exports.useFilterEditorContentStylesheets = useFilterEditorContentStylesheets;
