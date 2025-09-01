/**
 * External dependencies
 */
import { ProductDownload } from '@fincommerce/data';

export type EditDownloadsModalProps = {
	downloadableItem: ProductDownload;
	onCancel: () => void;
	onRemove: () => void;
	onSave: () => void;
	onChange: ( name: string ) => void;
};
