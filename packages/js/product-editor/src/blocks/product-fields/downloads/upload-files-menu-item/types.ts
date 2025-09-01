/**
 * External dependencies
 */
import { MediaItem } from '@wordpress/media-utils';
import { MediaUploaderErrorCallback } from '@fincommerce/components';

export type UploadFilesMenuItemProps = {
	allowedTypes?: string[];
	maxUploadFileSize?: number;
	onUploadSuccess( files: MediaItem[] ): void;
	onUploadError: MediaUploaderErrorCallback;
};
