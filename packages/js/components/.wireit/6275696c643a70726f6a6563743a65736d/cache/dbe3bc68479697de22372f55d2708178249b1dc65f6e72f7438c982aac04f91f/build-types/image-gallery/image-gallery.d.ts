/**
 * External dependencies
 */
import type { DragEventHandler } from 'react';
import { MediaItem } from '@wordpress/media-utils';
import type { ImageGalleryChild, MediaUploadComponentType } from './types';
export type ImageGalleryProps = {
    children: ImageGalleryChild | ImageGalleryChild[];
    columns?: number;
    onRemove?: (props: {
        removeIndex: number;
        removedItem: ImageGalleryChild;
    }) => void;
    onReplace?: (props: {
        replaceIndex: number;
        media: {
            id: number;
        } & MediaItem;
    }) => void;
    allowDragging?: boolean;
    onSelectAsCover?: (itemId: string | null) => void;
    onOrderChange?: (items: ImageGalleryChild[]) => void;
    MediaUploadComponent?: MediaUploadComponentType;
    onDragStart?: DragEventHandler<HTMLDivElement>;
    onDragEnd?: DragEventHandler<HTMLDivElement>;
    onDragOver?: DragEventHandler<HTMLLIElement>;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const ImageGallery: ({ children, columns, allowDragging, onSelectAsCover, onOrderChange, onRemove, onReplace, MediaUploadComponent, onDragStart, onDragEnd, onDragOver, }: ImageGalleryProps) => JSX.Element;
//# sourceMappingURL=image-gallery.d.ts.map