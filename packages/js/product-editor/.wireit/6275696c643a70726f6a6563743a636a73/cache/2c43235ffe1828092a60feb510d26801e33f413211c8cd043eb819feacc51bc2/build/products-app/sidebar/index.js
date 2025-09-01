"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SidebarContent;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
function SidebarContentWrapper({ children }) {
    const wrapperRef = (0, element_1.useRef)(null);
    const wrapperCls = 'edit-site-sidebar__screen-wrapper';
    return ((0, element_1.createElement)("div", { ref: wrapperRef, className: wrapperCls }, children));
}
function SidebarContent({ routeKey, children, }) {
    return ((0, element_1.createElement)("div", { className: "edit-site-sidebar__content" },
        (0, element_1.createElement)(SidebarContentWrapper, { key: routeKey }, children)));
}
