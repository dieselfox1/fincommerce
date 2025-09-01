/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
__unstableIframe as Iframe, 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
__unstableUseMouseMoveTypingReset as useMouseMoveTypingReset, 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
__unstableEditorStyles as EditorStyles, } from '@wordpress/block-editor';
export function EditorCanvas({ children, enableResizing, settings, ...props }) {
    const mouseMoveTypingRef = useMouseMoveTypingReset();
    return (createElement(Iframe, { ref: mouseMoveTypingRef, name: "editor-canvas", className: "edit-site-visual-editor__editor-canvas", ...props },
        createElement(Fragment, null,
            createElement(EditorStyles, { styles: settings?.styles }),
            createElement("style", null, 
            // Forming a "block formatting context" to prevent margin collapsing.
            // @see https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
            `.is-root-container {
								padding: 36px;
								display: flow-root;
							}
							body { position: relative; }`),
            enableResizing && (createElement("style", null, 
            // Some themes will have `min-height: 100vh` for the root container,
            // which isn't a requirement in auto resize mode.
            `.is-root-container { min-height: 0 !important; }`)),
            children)));
}
