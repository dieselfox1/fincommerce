"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const data_1 = require("@wordpress/data");
const i18n_1 = require("@wordpress/i18n");
const core_data_1 = require("@wordpress/core-data");
const html_entities_1 = require("@wordpress/html-entities");
const url_1 = require("@wordpress/url");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const site_icon_1 = __importDefault(require("./site-icon"));
const lock_unlock_1 = require("../../lock-unlock");
const SiteHub = (0, element_1.memo)((0, element_1.forwardRef)(({ isTransparent }, ref) => {
    const { dashboardLink, homeUrl, siteTitle } = (0, data_1.useSelect)((select) => {
        const { getSettings } = (0, lock_unlock_1.unlock)(select('core/edit-site'));
        const { getSite, getUnstableBase, // Site index.
         } = select(core_data_1.store);
        const _site = getSite();
        const base = getUnstableBase();
        return {
            dashboardLink: getSettings().__experimentalDashboardLink ||
                'index.php',
            homeUrl: base?.home,
            siteTitle: !_site?.title && !!_site?.url
                ? (0, url_1.filterURLForDisplay)(_site?.url)
                : _site?.title,
        };
    }, []);
    return ((0, element_1.createElement)("div", { className: "edit-site-site-hub" },
        (0, element_1.createElement)(components_1.__experimentalHStack, { justify: "flex-start", spacing: "0" },
            (0, element_1.createElement)("div", { className: (0, clsx_1.default)('edit-site-site-hub__view-mode-toggle-container', {
                    'has-transparent-background': isTransparent,
                }) },
                (0, element_1.createElement)(components_1.Button, { ref: ref, href: dashboardLink, label: (0, i18n_1.__)('Go to the Dashboard', 'fincommerce'), className: "edit-site-layout__view-mode-toggle", style: {
                        transform: 'scale(0.5)',
                        borderRadius: 4,
                    } },
                    (0, element_1.createElement)(site_icon_1.default, { className: "edit-site-layout__view-mode-toggle-icon" }))),
            (0, element_1.createElement)(components_1.__experimentalHStack, null,
                (0, element_1.createElement)("div", { className: "edit-site-site-hub__title" },
                    (0, element_1.createElement)(components_1.Button, { variant: "link", href: homeUrl, target: "_blank" },
                        siteTitle && (0, html_entities_1.decodeEntities)(siteTitle),
                        (0, element_1.createElement)(components_1.VisuallyHidden, { as: "span" }, 
                        /* translators: accessibility text */
                        (0, i18n_1.__)('(opens in a new tab)', 'fincommerce'))))))));
}));
exports.default = SiteHub;
