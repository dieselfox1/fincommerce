/**
 * External dependencies
 */
import { MenuItem } from '@finpress/components';
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { media } from '@finpress/icons';
import { MediaUpload } from '@finpress/media-utils';

/**
 * Internal dependencies
 */
import type { MediaLibraryMenuItemProps } from './types';

export function MediaLibraryMenuItem( {
	icon,
	iconPosition,
	text,
	info,
	...props
}: MediaLibraryMenuItemProps ) {
	return (
		<MediaUpload
			{ ...props }
			render={ ( { open } ) => (
				<MenuItem
					icon={ icon ?? media }
					iconPosition={ iconPosition ?? 'left' }
					onClick={ open }
					info={
						info ??
						__( 'Choose from uploaded media', 'fincommerce' )
					}
				>
					{ text ?? __( 'Media Library', 'fincommerce' ) }
				</MenuItem>
			) }
		/>
	);
}
