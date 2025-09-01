/**
 * External dependencies
 */
import { createElement, Fragment, useRef } from '@wordpress/element';
import { useViewportMatch, useResizeObserver, useReducedMotion, } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { 
// @ts-expect-error missing type.
EditorSnackbars, 
// @ts-expect-error missing type.
privateApis as editorPrivateApis, } from '@wordpress/editor';
// eslint-disable-next-line @fincommerce/dependency-group
import { __unstableMotion as motion, __unstableAnimatePresence as AnimatePresence, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import SidebarContent from './sidebar';
import SiteHub from './site-hub';
import { unlock } from '../lock-unlock';
const { NavigableRegion } = unlock(editorPrivateApis);
const ANIMATION_DURATION = 0.3;
export function Layout({ route, showNewNavigation = false }) {
    const [fullResizer] = useResizeObserver();
    const toggleRef = useRef(null);
    const isMobileViewport = useViewportMatch('medium', '<');
    const disableMotion = useReducedMotion();
    const { key: routeKey, areas, widths } = route;
    return (createElement(Fragment, null,
        fullResizer,
        createElement("div", { className: "edit-site-layout" },
            createElement("div", { className: "edit-site-layout__content" },
                (!isMobileViewport || !areas.mobile) &&
                    showNewNavigation && (createElement(NavigableRegion, { ariaLabel: __('Navigation', 'fincommerce'), className: "edit-site-layout__sidebar-region" },
                    createElement(AnimatePresence, null,
                        createElement(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: {
                                type: 'tween',
                                duration: 
                                // Disable transition in mobile to emulate a full page transition.
                                disableMotion ||
                                    isMobileViewport
                                    ? 0
                                    : ANIMATION_DURATION,
                                ease: 'easeOut',
                            }, className: "edit-site-layout__sidebar" },
                            createElement(SiteHub, { ref: toggleRef, isTransparent: false }),
                            createElement(SidebarContent, { routeKey: routeKey }, areas.sidebar))))),
                createElement(EditorSnackbars, null),
                !isMobileViewport && areas.content && (createElement("div", { className: "edit-site-layout__area", style: {
                        maxWidth: widths?.content,
                    } }, areas.content)),
                !isMobileViewport && areas.edit && (createElement("div", { className: "edit-site-layout__area", style: {
                        maxWidth: widths?.edit,
                    } }, areas.edit))))));
}
