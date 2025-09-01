"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGallery = void 0;
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const media_utils_1 = require("@wordpress/media-utils");
/**
 * Internal dependencies
 */
const sortable_1 = require("../sortable");
const image_gallery_wrapper_1 = require("./image-gallery-wrapper");
const index_1 = require("./index");
const ImageGallery = ({ children, columns = 4, allowDragging = true, onSelectAsCover = () => null, onOrderChange = () => null, onRemove = () => null, onReplace = () => null, MediaUploadComponent = media_utils_1.MediaUpload, onDragStart = () => null, onDragEnd = () => null, onDragOver = () => null, }) => {
    const [activeToolbarKey, setActiveToolbarKey] = (0, element_1.useState)(null);
    const [isDragging, setIsDragging] = (0, element_1.useState)(false);
    const childElements = (0, element_1.useMemo)(() => element_1.Children.toArray(children), [children]);
    function cloneChild(child, childIndex) {
        const key = child.key || String(childIndex);
        const isToolbarVisible = key === activeToolbarKey;
        return (0, element_1.cloneElement)(child, {
            key,
            isDraggable: allowDragging && !child.props.isCover,
            className: (0, clsx_1.default)({
                'is-toolbar-visible': isToolbarVisible,
            }),
            onClick() {
                setActiveToolbarKey(isToolbarVisible ? null : key);
            },
            onBlur(event) {
                if (isDragging ||
                    event.currentTarget.contains(event.relatedTarget) ||
                    (event.relatedTarget &&
                        event.relatedTarget.closest('.media-modal, .components-modal__frame')) ||
                    (event.relatedTarget &&
                        // Check if not a button within the toolbar is clicked, to prevent hiding the toolbar.
                        event.relatedTarget.closest('.fincommerce-image-gallery__toolbar')) ||
                    (event.relatedTarget &&
                        // Prevent toolbar from hiding if the dropdown is clicked within the toolbar.
                        event.relatedTarget.closest('.fincommerce-image-gallery__toolbar-dropdown-popover'))) {
                    return;
                }
                setActiveToolbarKey(null);
            },
        }, isToolbarVisible && ((0, element_1.createElement)(index_1.ImageGalleryToolbar, { value: child.props.id, allowDragging: allowDragging, childIndex: childIndex, lastChild: childIndex === childElements.length - 1, moveItem: (fromIndex, toIndex) => {
                onOrderChange((0, sortable_1.moveIndex)(fromIndex, toIndex, childElements));
            }, removeItem: (removeIndex) => {
                onRemove({
                    removeIndex,
                    removedItem: childElements[removeIndex],
                });
            }, replaceItem: (replaceIndex, media) => {
                onReplace({ replaceIndex, media });
            }, setToolBarItem: (toolBarItem) => {
                onSelectAsCover(activeToolbarKey);
                setActiveToolbarKey(toolBarItem);
            }, MediaUploadComponent: MediaUploadComponent })));
    }
    return ((0, element_1.createElement)("div", { className: "fincommerce-image-gallery", style: {
            gridTemplateColumns: 'min-content '.repeat(columns),
        } },
        (0, element_1.createElement)(image_gallery_wrapper_1.ImageGalleryWrapper, { allowDragging: allowDragging, updateOrderedChildren: onOrderChange, onDragStart: (event) => {
                setIsDragging(true);
                onDragStart(event);
            }, onDragEnd: (event) => {
                setIsDragging(false);
                onDragEnd(event);
            }, onDragOver: onDragOver }, childElements.map(cloneChild))));
};
exports.ImageGallery = ImageGallery;
