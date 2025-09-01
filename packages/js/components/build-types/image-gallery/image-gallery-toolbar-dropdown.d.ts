import { MediaItem } from '@wordpress/media-utils';
/**
 * Internal dependencies
 */
import { MediaUploadComponentType } from './types';
type ImageGalleryToolbarDropdownProps = {
    onReplace: (media: {
        id: number;
    } & MediaItem) => void;
    onRemove: () => void;
    canRemove?: boolean;
    removeBlockLabel?: string;
    MediaUploadComponent: MediaUploadComponentType;
    children?: React.ReactNode | ((props: {
        onClose: () => void;
    }) => React.ReactNode);
};
export declare function ImageGalleryToolbarDropdown({ children, onReplace, onRemove, canRemove, removeBlockLabel, MediaUploadComponent, ...props }: ImageGalleryToolbarDropdownProps): JSX.Element;
export {};
//# sourceMappingURL=image-gallery-toolbar-dropdown.d.ts.map