"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpMenuItem = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const i18n_1 = require("@wordpress/i18n");
const tracks_1 = require("@fincommerce/tracks");
const HelpMenuItem = () => {
    const recordClick = () => {
        (0, tracks_1.recordEvent)('product_iframe_editor_help_menu_item_click');
    };
    return ((0, element_1.createElement)(components_1.MenuItem, { role: "menuitem", icon: icons_1.external, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore href is okay here
        href: (0, i18n_1.__)('https://wordpress.org/documentation/article/wordpress-block-editor/', 'fincommerce'), onClick: recordClick, target: "_blank", rel: "noopener noreferrer" },
        (0, i18n_1.__)('Help', 'fincommerce'),
        (0, element_1.createElement)(components_1.VisuallyHidden, { as: "span" }, 
        /* translators: accessibility text */
        (0, i18n_1.__)('(opens in a new tab)', 'fincommerce'))));
};
exports.HelpMenuItem = HelpMenuItem;
