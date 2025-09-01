/**
 * External dependencies
 */
import { MenuItem } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { media } from '@wordpress/icons';
import { MediaUpload } from '@wordpress/media-utils';
export function MediaLibraryMenuItem({ icon, iconPosition, text, info, ...props }) {
    return (createElement(MediaUpload, { ...props, render: ({ open }) => (createElement(MenuItem, { icon: icon ?? media, iconPosition: iconPosition ?? 'left', onClick: open, info: info ??
                __('Choose from uploaded media', 'fincommerce') }, text ?? __('Media Library', 'fincommerce'))) }));
}
