/**
 * External dependencies
 */
import { ProductDownload } from '@fincommerce/data';
import { BlockAttributes } from '@finpress/blocks';

export interface UploadsBlockAttributes extends BlockAttributes {
	name: string;
}

export type DownloadableFileItem = {
	key: string;
	download: ProductDownload;
	uploading?: boolean;
};
