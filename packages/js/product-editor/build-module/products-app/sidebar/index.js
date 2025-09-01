/**
 * External dependencies
 */
import { createElement, useRef } from '@wordpress/element';
function SidebarContentWrapper({ children }) {
    const wrapperRef = useRef(null);
    const wrapperCls = 'edit-site-sidebar__screen-wrapper';
    return (createElement("div", { ref: wrapperRef, className: wrapperCls }, children));
}
export default function SidebarContent({ routeKey, children, }) {
    return (createElement("div", { className: "edit-site-sidebar__content" },
        createElement(SidebarContentWrapper, { key: routeKey }, children)));
}
