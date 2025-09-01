"use strict";
/**
 * External dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SidebarNavigationScreen;
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@wordpress/icons");
const data_1 = require("@wordpress/data");
const router_1 = require("@wordpress/router");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const lock_unlock_1 = require("../../lock-unlock");
const sidebar_button_1 = __importDefault(require("./sidebar-button"));
const { useHistory, useLocation } = (0, lock_unlock_1.unlock)(router_1.privateApis);
function SidebarNavigationScreen({ isRoot, title, actions, meta, content, footer, description, backPath: backPathProp, }) {
    const { dashboardLink, dashboardLinkText } = (0, data_1.useSelect)((select) => {
        const { getSettings } = (0, lock_unlock_1.unlock)(select('core/edit-site'));
        return {
            dashboardLink: getSettings().__experimentalDashboardLink,
            dashboardLinkText: getSettings().__experimentalDashboardLinkText,
        };
    }, []);
    const location = useLocation();
    const history = useHistory();
    const backPath = backPathProp ?? location.state?.backPath;
    const icon = (0, i18n_1.isRTL)() ? icons_1.chevronRight : icons_1.chevronLeft;
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.__experimentalVStack, { className: (0, clsx_1.default)('edit-site-sidebar-navigation-screen__main', {
                'has-footer': !!footer,
            }), spacing: 0, justify: "flex-start" },
            (0, element_1.createElement)(components_1.__experimentalHStack, { spacing: 3, alignment: "flex-start", className: "edit-site-sidebar-navigation-screen__title-icon" },
                !isRoot && ((0, element_1.createElement)(sidebar_button_1.default, { onClick: () => {
                        history.push(backPath);
                    }, icon: icon, label: (0, i18n_1.__)('Back', 'fincommerce'), showTooltip: false })),
                isRoot && ((0, element_1.createElement)(sidebar_button_1.default, { icon: icon, label: dashboardLinkText ||
                        (0, i18n_1.__)('Go to the Dashboard', 'fincommerce'), href: dashboardLink || 'index.php' })),
                (0, element_1.createElement)(components_1.__experimentalHeading, { as: "h1", className: "edit-site-sidebar-navigation-screen__title", color: '#e0e0e0' /* $gray-200 */, level: 1 }, title),
                actions && ((0, element_1.createElement)("div", { className: "edit-site-sidebar-navigation-screen__actions" }, actions))),
            meta && ((0, element_1.createElement)(element_1.Fragment, null,
                (0, element_1.createElement)("div", { className: "edit-site-sidebar-navigation-screen__meta" }, meta))),
            (0, element_1.createElement)("div", { className: "edit-site-sidebar-navigation-screen__content" },
                description && ((0, element_1.createElement)("p", { className: "edit-site-sidebar-navigation-screen__description" }, description)),
                content)),
        footer && ((0, element_1.createElement)("footer", { className: "edit-site-sidebar-navigation-screen__footer" }, footer))));
}
