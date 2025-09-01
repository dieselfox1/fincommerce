"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataViewItem;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const router_1 = require("@wordpress/router");
const url_1 = require("@wordpress/url");
const dataviews_1 = require("@wordpress/dataviews");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const sidebar_navigation_item_1 = __importDefault(require("../sidebar-navigation-item"));
const lock_unlock_1 = require("../../lock-unlock");
const { useHistory, useLocation } = (0, lock_unlock_1.unlock)(router_1.privateApis);
function useLink(params, state, shouldReplace = false) {
    const history = useHistory();
    function onClick(event) {
        event?.preventDefault();
        if (shouldReplace) {
            history.replace(params, state);
        }
        else {
            history.push(params, state);
        }
    }
    const currentArgs = (0, url_1.getQueryArgs)(window.location.href);
    const currentUrlWithoutArgs = (0, url_1.removeQueryArgs)(window.location.href, ...Object.keys(currentArgs));
    const newUrl = (0, url_1.addQueryArgs)(currentUrlWithoutArgs, params);
    return {
        href: newUrl,
        onClick,
    };
}
function DataViewItem({ title, slug, customViewId, type, icon, isActive, isCustom, suffix, }) {
    const { params: { postType, page }, } = useLocation();
    const iconToUse = icon || dataviews_1.VIEW_LAYOUTS.find((v) => v.type === type)?.icon;
    let activeView = isCustom ? customViewId : slug;
    if (activeView === 'all') {
        activeView = undefined;
    }
    const linkInfo = useLink({
        page,
        postType,
        layout: type,
        activeView,
        isCustom: isCustom ? 'true' : undefined,
    });
    return ((0, element_1.createElement)(components_1.__experimentalHStack, { justify: "flex-start", className: (0, clsx_1.default)('edit-site-sidebar-dataviews-dataview-item', {
            'is-selected': isActive,
        }) },
        (0, element_1.createElement)(sidebar_navigation_item_1.default, { icon: iconToUse, ...linkInfo, "aria-current": isActive ? 'true' : undefined }, title),
        suffix));
}
