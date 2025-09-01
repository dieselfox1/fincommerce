import { DragEventHandler } from 'react';
import { ImageGalleryChild } from './types';
export type ImageGalleryWrapperProps = {
    children: JSX.Element[];
    allowDragging?: boolean;
    onDragStart?: DragEventHandler<HTMLDivElement>;
    onDragEnd?: DragEventHandler<HTMLDivElement>;
    onDragOver?: DragEventHandler<HTMLDivElement>;
    updateOrderedChildren?: (items: ImageGalleryChild[]) => void;
};
export declare const ImageGalleryWrapper: ({ children, allowDragging, onDragStart, onDragEnd, onDragOver, updateOrderedChildren, }: ImageGalleryWrapperProps) => JSX.Element;
//# sourceMappingURL=image-gallery-wrapper.d.ts.map