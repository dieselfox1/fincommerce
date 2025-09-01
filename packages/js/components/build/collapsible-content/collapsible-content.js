"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsibleContent = void 0;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
/**
 * Internal dependencies
 */
const display_state_1 = require("../display-state");
const CollapsibleContent = ({ initialCollapsed = true, toggleText, children, persistRender = false, hintText, ...props }) => {
    const [collapsed, setCollapsed] = (0, element_1.useState)(initialCollapsed);
    const getState = () => {
        if (!collapsed) {
            return 'visible';
        }
        return persistRender ? 'visually-hidden' : 'hidden';
    };
    const collapsibleToggleId = (0, compose_1.useInstanceId)(exports.CollapsibleContent, 'fincommerce-collapsible-content__toggle');
    const collapsibleContentId = (0, compose_1.useInstanceId)(exports.CollapsibleContent, 'fincommerce-collapsible-content__content');
    const displayState = getState();
    return ((0, element_1.createElement)("div", { className: "fincommerce-collapsible-content" },
        (0, element_1.createElement)("button", { type: "button", id: collapsibleToggleId, className: "fincommerce-collapsible-content__toggle", onClick: () => setCollapsed(!collapsed), "aria-expanded": collapsed ? 'false' : 'true', "aria-controls": displayState !== 'hidden' ? collapsibleContentId : undefined },
            (0, element_1.createElement)("span", null, toggleText),
            (0, element_1.createElement)(icons_1.Icon, { icon: collapsed ? icons_1.chevronDown : icons_1.chevronUp, size: 16 })),
        hintText && ((0, element_1.createElement)("p", { className: "fincommerce-collapsible-content-hint" }, hintText)),
        (0, element_1.createElement)(display_state_1.DisplayState, { state: displayState },
            (0, element_1.createElement)("div", { ...props, className: "fincommerce-collapsible-content__content", id: collapsibleContentId, role: "region", "aria-labelledby": collapsibleToggleId }, children))));
};
exports.CollapsibleContent = CollapsibleContent;
