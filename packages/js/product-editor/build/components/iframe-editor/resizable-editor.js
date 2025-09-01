"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizableEditor = ResizableEditor;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const resize_handle_1 = __importDefault(require("./resize-handle"));
// Removes the inline styles in the drag handles.
const HANDLE_STYLES_OVERRIDE = {
    position: undefined,
    userSelect: undefined,
    cursor: undefined,
    width: undefined,
    height: undefined,
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
};
function ResizableEditor({ enableResizing, height, children, }) {
    const [width, setWidth] = (0, element_1.useState)('100%');
    const resizableRef = (0, element_1.useRef)();
    const resizeWidthBy = (0, element_1.useCallback)((deltaPixels) => {
        if (resizableRef.current) {
            setWidth((resizableRef.current.offsetWidth + deltaPixels).toString());
        }
    }, []);
    return ((0, element_1.createElement)(components_1.ResizableBox
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore This prop was added to ResizeableBox.
    , { 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore This prop was added to ResizeableBox.
        ref: (api) => {
            resizableRef.current = api?.resizable;
        }, size: {
            width: enableResizing ? width : '100%',
            height: enableResizing && height ? height : '100%',
        }, onResizeStop: (event, direction, element) => {
            setWidth(element.style.width);
        }, minWidth: 300, maxWidth: "100%", maxHeight: "100%", minHeight: height, enable: {
            right: enableResizing,
            left: enableResizing,
        }, showHandle: enableResizing, 
        // The editor is centered horizontally, resizing it only
        // moves half the distance. Hence double the ratio to correctly
        // align the cursor to the resizer handle.
        resizeRatio: 2, handleComponent: {
            left: ((0, element_1.createElement)(resize_handle_1.default, { direction: "left", resizeWidthBy: resizeWidthBy })),
            right: ((0, element_1.createElement)(resize_handle_1.default, { direction: "right", resizeWidthBy: resizeWidthBy })),
        }, handleClasses: undefined, handleStyles: {
            left: HANDLE_STYLES_OVERRIDE,
            right: HANDLE_STYLES_OVERRIDE,
        } }, children));
}
