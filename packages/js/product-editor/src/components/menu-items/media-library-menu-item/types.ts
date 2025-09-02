/**
 * External dependencies
 */
import { MenuItem as DropdownMenuItem } from '@finpress/components';
import { MediaUpload } from '@finpress/media-utils';

export type MediaLibraryMenuItemProps = Omit<
	MediaUpload.Props< boolean >,
	'render' | 'onChange'
> &
	React.ComponentProps< typeof DropdownMenuItem > & {
		text?: string;
	};
