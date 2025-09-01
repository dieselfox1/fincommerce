/**
 * External dependencies
 */
import { useViewportMatch, useResizeObserver, useReducedMotion, } from '@wordpress/compose';
/* eslint-disable @fincommerce/dependency-group */
import { 
// @ts-expect-error missing type.
EditorSnackbars, } from '@wordpress/editor';
import { __unstableMotion as motion, __unstableAnimatePresence as AnimatePresence, } from '@wordpress/components';
import { createElement, Fragment } from '@wordpress/element';
import { SidebarContent } from '@automattic/site-admin';
import { SectionTabs, Header } from './components';
const ANIMATION_DURATION = 0.3;
export function Layout({ route, settingsPage, tabs = [], activeSection, }) {
    const [fullResizer] = useResizeObserver();
    const isMobileViewport = useViewportMatch('medium', '<');
    const disableMotion = useReducedMotion();
    const { key: routeKey, areas, widths } = route;
    return (createElement(Fragment, null,
        fullResizer,
        createElement("div", { className: "fincommerce-site-layout" },
            createElement("div", { className: "fincommerce-site-layout__content" },
                (!isMobileViewport || !areas.mobile) && (createElement(AnimatePresence, null,
                    createElement(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: {
                            type: 'tween',
                            duration: 
                            // Disable transition in mobile to emulate a full page transition.
                            disableMotion || isMobileViewport
                                ? 0
                                : ANIMATION_DURATION,
                            ease: 'easeOut',
                        }, className: "fincommerce-site-layout__sidebar a8c-site-admin-sidebar" },
                        createElement(SidebarContent, { shouldAnimate: false, routeKey: routeKey }, areas.sidebar)))),
                createElement(EditorSnackbars, null),
                !isMobileViewport && areas.content && (createElement("div", { className: "fincommerce-site-layout__area", style: {
                        maxWidth: widths?.content,
                    } },
                    createElement(Header, { hasTabs: tabs.length > 1, pageTitle: settingsPage?.label }),
                    createElement(SectionTabs, { tabs: tabs, activeSection: activeSection }, areas.content))),
                !isMobileViewport && areas.edit && (createElement("div", { className: "fincommerce-site-layout__area", style: {
                        maxWidth: widths?.edit,
                    } }, areas.edit))))));
}
