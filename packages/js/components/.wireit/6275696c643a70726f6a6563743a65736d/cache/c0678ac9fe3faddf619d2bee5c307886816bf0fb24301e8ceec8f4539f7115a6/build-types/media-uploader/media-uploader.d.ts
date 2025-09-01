import { Button } from '@wordpress/components';
import { MediaItem, MediaUpload, UploadMediaOptions } from '@wordpress/media-utils';
/**
 * Internal dependencies
 */
import { ErrorType } from './types';
export type MediaUploaderErrorCallback = (error: ErrorType) => void;
type MediaUploaderProps = {
    allowedMediaTypes?: string[];
    buttonText?: string;
    buttonProps?: React.ComponentProps<typeof Button>;
    hasDropZone?: boolean;
    icon?: JSX.Element;
    label?: string | JSX.Element;
    maxUploadFileSize?: number;
    MediaUploadComponent?: <T extends boolean = false>(props: MediaUpload.Props<T>) => JSX.Element;
    multipleSelect?: boolean | string;
    value?: number | number[];
    onSelect?: (value: ({
        id: number;
    } & {
        [k: string]: any;
    }) | MediaItem[]) => void;
    onError?: MediaUploaderErrorCallback;
    onMediaGalleryOpen?: () => void;
    onUpload?: (files: MediaItem | MediaItem[]) => void;
    onFileUploadChange?: (files: MediaItem | MediaItem[]) => void;
    uploadMedia?: (options: UploadMediaOptions) => Promise<void>;
    additionalData?: Record<string, unknown>;
};
export declare const MediaUploader: ({ allowedMediaTypes, buttonText, buttonProps, hasDropZone, label, maxUploadFileSize, MediaUploadComponent, multipleSelect, value, onError, onFileUploadChange, onMediaGalleryOpen, onUpload, onSelect, uploadMedia, additionalData, }: MediaUploaderProps) => JSX.Element;
export {};
//# sourceMappingURL=media-uploader.d.ts.map