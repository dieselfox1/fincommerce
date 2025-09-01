"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResizeHandle;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const keycodes_1 = require("@wordpress/keycodes");
const components_1 = require("@wordpress/components");
const DELTA_DISTANCE = 20; // The distance to resize per keydown in pixels.
function ResizeHandle({ direction, resizeWidthBy, }) {
    function handleKeyDown(event) {
        const { keyCode } = event;
        if ((direction === 'left' && keyCode === keycodes_1.LEFT) ||
            (direction === 'right' && keyCode === keycodes_1.RIGHT)) {
            resizeWidthBy(DELTA_DISTANCE);
        }
        else if ((direction === 'left' && keyCode === keycodes_1.RIGHT) ||
            (direction === 'right' && keyCode === keycodes_1.LEFT)) {
            resizeWidthBy(-DELTA_DISTANCE);
        }
    }
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)("button", { className: `resizable-editor__drag-handle is-${direction}`, "aria-label": (0, i18n_1.__)('Drag to resize', 'fincommerce'), "aria-describedby": `resizable-editor__resize-help-${direction}`, onKeyDown: handleKeyDown }),
        (0, element_1.createElement)(components_1.VisuallyHidden, { id: `resizable-editor__resize-help-${direction}` }, (0, i18n_1.__)('Use left and right arrow keys to resize the canvas.', 'fincommerce'))));
}
