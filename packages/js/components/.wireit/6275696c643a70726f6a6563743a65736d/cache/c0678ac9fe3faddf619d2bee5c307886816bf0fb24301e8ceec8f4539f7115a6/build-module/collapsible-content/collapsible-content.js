/**
 * External dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { createElement, useState } from '@wordpress/element';
import { Icon, chevronDown, chevronUp } from '@wordpress/icons';
/**
 * Internal dependencies
 */
import { DisplayState } from '../display-state';
export const CollapsibleContent = ({ initialCollapsed = true, toggleText, children, persistRender = false, hintText, ...props }) => {
    const [collapsed, setCollapsed] = useState(initialCollapsed);
    const getState = () => {
        if (!collapsed) {
            return 'visible';
        }
        return persistRender ? 'visually-hidden' : 'hidden';
    };
    const collapsibleToggleId = useInstanceId(CollapsibleContent, 'fincommerce-collapsible-content__toggle');
    const collapsibleContentId = useInstanceId(CollapsibleContent, 'fincommerce-collapsible-content__content');
    const displayState = getState();
    return (createElement("div", { className: "fincommerce-collapsible-content" },
        createElement("button", { type: "button", id: collapsibleToggleId, className: "fincommerce-collapsible-content__toggle", onClick: () => setCollapsed(!collapsed), "aria-expanded": collapsed ? 'false' : 'true', "aria-controls": displayState !== 'hidden' ? collapsibleContentId : undefined },
            createElement("span", null, toggleText),
            createElement(Icon, { icon: collapsed ? chevronDown : chevronUp, size: 16 })),
        hintText && (createElement("p", { className: "fincommerce-collapsible-content-hint" }, hintText)),
        createElement(DisplayState, { state: displayState },
            createElement("div", { ...props, className: "fincommerce-collapsible-content__content", id: collapsibleContentId, role: "region", "aria-labelledby": collapsibleToggleId }, children))));
};
