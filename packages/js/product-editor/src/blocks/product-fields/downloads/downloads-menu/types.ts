/**
 * External dependencies
 */
import { MediaItem } from '@finpress/media-utils';
import { MediaUploaderErrorCallback } from '@fincommerce/components';

/**
 * Internal dependencies
 */
import { InsertUrlLinkErrorCallback } from '../insert-url-menu-item';

export type DownloadsMenuProps = {
	allowedTypes?: string[];
	maxUploadFileSize?: number;
	onUploadSuccess( files: MediaItem[] ): void;
	onUploadError: MediaUploaderErrorCallback;
	onLinkError: InsertUrlLinkErrorCallback;
};
