"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const core_data_1 = require("@wordpress/core-data");
const clsx_1 = __importDefault(require("clsx"));
function SiteIcon({ className }) {
    const { isRequestingSite, siteIconUrl } = (0, data_1.useSelect)((select) => {
        const { getEntityRecord } = select(core_data_1.store);
        // @ts-expect-error Selector is not right typed with '__unstableBase'
        const siteData = getEntityRecord('root', '__unstableBase');
        return {
            isRequestingSite: !siteData,
            siteIconUrl: siteData?.site_icon_url,
        };
    }, []);
    if (isRequestingSite && !siteIconUrl) {
        return (0, element_1.createElement)("div", { className: "edit-site-site-icon__image" });
    }
    const icon = siteIconUrl ? ((0, element_1.createElement)("img", { className: "edit-site-site-icon__image", alt: (0, i18n_1.__)('Site Icon', 'fincommerce'), src: siteIconUrl })) : ((0, element_1.createElement)(components_1.Icon, { className: "edit-site-site-icon__icon", icon: icons_1.wordpress, size: 48 }));
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)(className, 'edit-site-site-icon') }, icon));
}
exports.default = SiteIcon;
