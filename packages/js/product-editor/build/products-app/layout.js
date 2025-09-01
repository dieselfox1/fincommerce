"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = Layout;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const compose_1 = require("@wordpress/compose");
const i18n_1 = require("@wordpress/i18n");
const editor_1 = require("@wordpress/editor");
// eslint-disable-next-line @fincommerce/dependency-group
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const sidebar_1 = __importDefault(require("./sidebar"));
const site_hub_1 = __importDefault(require("./site-hub"));
const lock_unlock_1 = require("../lock-unlock");
const { NavigableRegion } = (0, lock_unlock_1.unlock)(editor_1.privateApis);
const ANIMATION_DURATION = 0.3;
function Layout({ route, showNewNavigation = false }) {
    const [fullResizer] = (0, compose_1.useResizeObserver)();
    const toggleRef = (0, element_1.useRef)(null);
    const isMobileViewport = (0, compose_1.useViewportMatch)('medium', '<');
    const disableMotion = (0, compose_1.useReducedMotion)();
    const { key: routeKey, areas, widths } = route;
    return ((0, element_1.createElement)(element_1.Fragment, null,
        fullResizer,
        (0, element_1.createElement)("div", { className: "edit-site-layout" },
            (0, element_1.createElement)("div", { className: "edit-site-layout__content" },
                (!isMobileViewport || !areas.mobile) &&
                    showNewNavigation && ((0, element_1.createElement)(NavigableRegion, { ariaLabel: (0, i18n_1.__)('Navigation', 'fincommerce'), className: "edit-site-layout__sidebar-region" },
                    (0, element_1.createElement)(components_1.__unstableAnimatePresence, null,
                        (0, element_1.createElement)(components_1.__unstableMotion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: {
                                type: 'tween',
                                duration: 
                                // Disable transition in mobile to emulate a full page transition.
                                disableMotion ||
                                    isMobileViewport
                                    ? 0
                                    : ANIMATION_DURATION,
                                ease: 'easeOut',
                            }, className: "edit-site-layout__sidebar" },
                            (0, element_1.createElement)(site_hub_1.default, { ref: toggleRef, isTransparent: false }),
                            (0, element_1.createElement)(sidebar_1.default, { routeKey: routeKey }, areas.sidebar))))),
                (0, element_1.createElement)(editor_1.EditorSnackbars, null),
                !isMobileViewport && areas.content && ((0, element_1.createElement)("div", { className: "edit-site-layout__area", style: {
                        maxWidth: widths?.content,
                    } }, areas.content)),
                !isMobileViewport && areas.edit && ((0, element_1.createElement)("div", { className: "edit-site-layout__area", style: {
                        maxWidth: widths?.edit,
                    } }, areas.edit))))));
}
