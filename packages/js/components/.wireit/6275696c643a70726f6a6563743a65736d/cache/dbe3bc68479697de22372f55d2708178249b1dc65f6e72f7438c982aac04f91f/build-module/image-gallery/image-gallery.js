import { Children, createElement, cloneElement, useState, useMemo, } from '@wordpress/element';
import clsx from 'clsx';
import { MediaUpload } from '@wordpress/media-utils';
/**
 * Internal dependencies
 */
import { moveIndex } from '../sortable';
import { ImageGalleryWrapper } from './image-gallery-wrapper';
import { ImageGalleryToolbar } from './index';
export const ImageGallery = ({ children, columns = 4, allowDragging = true, onSelectAsCover = () => null, onOrderChange = () => null, onRemove = () => null, onReplace = () => null, MediaUploadComponent = MediaUpload, onDragStart = () => null, onDragEnd = () => null, onDragOver = () => null, }) => {
    const [activeToolbarKey, setActiveToolbarKey] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const childElements = useMemo(() => Children.toArray(children), [children]);
    function cloneChild(child, childIndex) {
        const key = child.key || String(childIndex);
        const isToolbarVisible = key === activeToolbarKey;
        return cloneElement(child, {
            key,
            isDraggable: allowDragging && !child.props.isCover,
            className: clsx({
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
        }, isToolbarVisible && (createElement(ImageGalleryToolbar, { value: child.props.id, allowDragging: allowDragging, childIndex: childIndex, lastChild: childIndex === childElements.length - 1, moveItem: (fromIndex, toIndex) => {
                onOrderChange(moveIndex(fromIndex, toIndex, childElements));
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
    return (createElement("div", { className: "fincommerce-image-gallery", style: {
            gridTemplateColumns: 'min-content '.repeat(columns),
        } },
        createElement(ImageGalleryWrapper, { allowDragging: allowDragging, updateOrderedChildren: onOrderChange, onDragStart: (event) => {
                setIsDragging(true);
                onDragStart(event);
            }, onDragEnd: (event) => {
                setIsDragging(false);
                onDragEnd(event);
            }, onDragOver: onDragOver }, childElements.map(cloneChild))));
};
