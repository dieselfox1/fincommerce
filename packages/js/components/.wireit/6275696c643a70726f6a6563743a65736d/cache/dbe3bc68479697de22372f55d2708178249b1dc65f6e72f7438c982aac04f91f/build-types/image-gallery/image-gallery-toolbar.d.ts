import { MediaItem } from '@wordpress/media-utils';
import { MediaUploadComponentType } from './types';
export type ImageGalleryToolbarProps = {
    childIndex: number;
    allowDragging?: boolean;
    value?: number;
    moveItem: (fromIndex: number, toIndex: number) => void;
    removeItem: (removeIndex: number) => void;
    replaceItem: (replaceIndex: number, media: {
        id: number;
    } & MediaItem) => void;
    setToolBarItem: (key: string | null) => void;
    lastChild: boolean;
    MediaUploadComponent: MediaUploadComponentType;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const ImageGalleryToolbar: ({ childIndex, allowDragging, moveItem, removeItem, replaceItem, setToolBarItem, lastChild, value, MediaUploadComponent, }: ImageGalleryToolbarProps) => JSX.Element;
//# sourceMappingURL=image-gallery-toolbar.d.ts.map