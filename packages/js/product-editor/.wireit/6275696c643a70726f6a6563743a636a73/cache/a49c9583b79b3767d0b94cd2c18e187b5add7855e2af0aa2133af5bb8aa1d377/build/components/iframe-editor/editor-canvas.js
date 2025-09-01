"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorCanvas = EditorCanvas;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const block_editor_1 = require("@wordpress/block-editor");
function EditorCanvas({ children, enableResizing, settings, ...props }) {
    const mouseMoveTypingRef = (0, block_editor_1.__unstableUseMouseMoveTypingReset)();
    return ((0, element_1.createElement)(block_editor_1.__unstableIframe, { ref: mouseMoveTypingRef, name: "editor-canvas", className: "edit-site-visual-editor__editor-canvas", ...props },
        (0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(block_editor_1.__unstableEditorStyles, { styles: settings?.styles }),
            (0, element_1.createElement)("style", null, 
            // Forming a "block formatting context" to prevent margin collapsing.
            // @see https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
            `.is-root-container {
								padding: 36px;
								display: flow-root;
							}
							body { position: relative; }`),
            enableResizing && ((0, element_1.createElement)("style", null, 
            // Some themes will have `min-height: 100vh` for the root container,
            // which isn't a requirement in auto resize mode.
            `.is-root-container { min-height: 0 !important; }`)),
            children)));
}
