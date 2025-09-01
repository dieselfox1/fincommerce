"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = Layout;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
/* eslint-disable @fincommerce/dependency-group */
const editor_1 = require("@wordpress/editor");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const site_admin_1 = require("@automattic/site-admin");
const components_2 = require("./components");
const ANIMATION_DURATION = 0.3;
function Layout({ route, settingsPage, tabs = [], activeSection, }) {
    const [fullResizer] = (0, compose_1.useResizeObserver)();
    const isMobileViewport = (0, compose_1.useViewportMatch)('medium', '<');
    const disableMotion = (0, compose_1.useReducedMotion)();
    const { key: routeKey, areas, widths } = route;
    return ((0, element_1.createElement)(element_1.Fragment, null,
        fullResizer,
        (0, element_1.createElement)("div", { className: "fincommerce-site-layout" },
            (0, element_1.createElement)("div", { className: "fincommerce-site-layout__content" },
                (!isMobileViewport || !areas.mobile) && ((0, element_1.createElement)(components_1.__unstableAnimatePresence, null,
                    (0, element_1.createElement)(components_1.__unstableMotion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: {
                            type: 'tween',
                            duration: 
                            // Disable transition in mobile to emulate a full page transition.
                            disableMotion || isMobileViewport
                                ? 0
                                : ANIMATION_DURATION,
                            ease: 'easeOut',
                        }, className: "fincommerce-site-layout__sidebar a8c-site-admin-sidebar" },
                        (0, element_1.createElement)(site_admin_1.SidebarContent, { shouldAnimate: false, routeKey: routeKey }, areas.sidebar)))),
                (0, element_1.createElement)(editor_1.EditorSnackbars, null),
                !isMobileViewport && areas.content && ((0, element_1.createElement)("div", { className: "fincommerce-site-layout__area", style: {
                        maxWidth: widths?.content,
                    } },
                    (0, element_1.createElement)(components_2.Header, { hasTabs: tabs.length > 1, pageTitle: settingsPage?.label }),
                    (0, element_1.createElement)(components_2.SectionTabs, { tabs: tabs, activeSection: activeSection }, areas.content))),
                !isMobileViewport && areas.edit && ((0, element_1.createElement)("div", { className: "fincommerce-site-layout__area", style: {
                        maxWidth: widths?.edit,
                    } }, areas.edit))))));
}
