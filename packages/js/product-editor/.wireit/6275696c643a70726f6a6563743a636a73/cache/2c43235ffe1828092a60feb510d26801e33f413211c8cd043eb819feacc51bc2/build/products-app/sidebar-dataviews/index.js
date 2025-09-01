"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataViewsSidebarContent;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const router_1 = require("@wordpress/router");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const lock_unlock_1 = require("../../lock-unlock");
const dataview_item_1 = __importDefault(require("./dataview-item"));
const default_views_1 = require("./default-views");
const { useLocation } = (0, lock_unlock_1.unlock)(router_1.privateApis);
function DataViewsSidebarContent() {
    const { params: { postType = 'product', activeView = 'all', isCustom = 'false', }, } = useLocation();
    const defaultViews = (0, default_views_1.useDefaultViews)({ postType });
    if (!postType) {
        return null;
    }
    const isCustomBoolean = isCustom === 'true';
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.__experimentalItemGroup, null, defaultViews.map((dataview) => {
            return ((0, element_1.createElement)(dataview_item_1.default, { key: dataview.slug, slug: dataview.slug, title: dataview.title, icon: dataview.icon, type: dataview.view.type, isActive: !isCustomBoolean &&
                    dataview.slug === activeView, isCustom: false }));
        }))));
}
