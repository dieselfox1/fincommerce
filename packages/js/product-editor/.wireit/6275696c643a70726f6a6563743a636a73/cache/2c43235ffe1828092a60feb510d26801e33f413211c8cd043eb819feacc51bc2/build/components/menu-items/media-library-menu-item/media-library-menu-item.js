"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaLibraryMenuItem = MediaLibraryMenuItem;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const media_utils_1 = require("@wordpress/media-utils");
function MediaLibraryMenuItem({ icon, iconPosition, text, info, ...props }) {
    return ((0, element_1.createElement)(media_utils_1.MediaUpload, { ...props, render: ({ open }) => ((0, element_1.createElement)(components_1.MenuItem, { icon: icon ?? icons_1.media, iconPosition: iconPosition ?? 'left', onClick: open, info: info ??
                (0, i18n_1.__)('Choose from uploaded media', 'fincommerce') }, text ?? (0, i18n_1.__)('Media Library', 'fincommerce'))) }));
}
