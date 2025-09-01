"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticesSlot = NoticesSlot;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Renders a portal for rendering notices before the visual editor.
 *
 * Currently there is no API to add notices with custom context to the content area.
 */
function NoticesSlot({ children }) {
    const [portalEl] = (0, element_1.useState)(document.createElement('div'));
    // Place element for portal as first child of visual editor
    (0, element_1.useEffect)(() => {
        const visualEditor = document.getElementsByClassName('editor-visual-editor ')[0];
        if (visualEditor) {
            visualEditor.parentNode?.insertBefore(portalEl, visualEditor);
        }
    }, [portalEl]);
    return (0, element_1.createPortal)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }), portalEl);
}
