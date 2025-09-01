"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SidebarNavigationItem;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const router_1 = require("@wordpress/router");
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const lock_unlock_1 = require("../../lock-unlock");
const { useHistory } = (0, lock_unlock_1.unlock)(router_1.privateApis);
function SidebarNavigationItem({ className, icon, withChevron = false, suffix, uid, params, onClick, children, ...props }) {
    const history = useHistory();
    // If there is no custom click handler, create one that navigates to `params`.
    function handleClick(e) {
        if (onClick) {
            onClick(e);
        }
        else if (params) {
            e.preventDefault();
            history.push(params);
        }
    }
    return ((0, element_1.createElement)(components_1.__experimentalItem, { className: (0, clsx_1.default)('edit-site-sidebar-navigation-item', { 'with-suffix': !withChevron && suffix }, className), onClick: handleClick, id: uid, ...props },
        (0, element_1.createElement)(components_1.__experimentalHStack, { justify: "flex-start" },
            icon && ((0, element_1.createElement)(icons_1.Icon, { style: { fill: 'currentcolor' }, icon: icon, size: 24 })),
            (0, element_1.createElement)(components_1.FlexBlock, null, children),
            withChevron && ((0, element_1.createElement)(icons_1.Icon, { icon: (0, i18n_1.isRTL)() ? icons_1.chevronLeftSmall : icons_1.chevronRightSmall, className: "edit-site-sidebar-navigation-item__drilldown-indicator", size: 24 })),
            !withChevron && suffix)));
}
