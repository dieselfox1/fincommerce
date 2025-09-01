"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxNoteActionButton = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
/**
 * Renders a secondary button that can also be a link. If href is provided it will
 * automatically open it in a new tab/window.
 */
const InboxNoteActionButton = ({ label, onClick, href, preventBusyState, variant = 'link', }) => {
    const [inAction, setInAction] = (0, element_1.useState)(false);
    const handleActionClick = (event) => {
        const targetHref = event.currentTarget && 'href' in event.currentTarget
            ? event.currentTarget.href
            : '';
        let isActionable = true;
        let adminUrl = '';
        if (window.wcSettings) {
            adminUrl = window.wcSettings.adminUrl;
        }
        if (targetHref.length &&
            (!adminUrl || !targetHref.startsWith(adminUrl))) {
            event.preventDefault();
            isActionable = false; // link buttons shouldn't be "busy".
            window.open(targetHref, '_blank');
        }
        if (preventBusyState) {
            isActionable = false;
        }
        setInAction(isActionable);
        onClick();
    };
    return ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-inbox-note__action-button", variant: variant, isBusy: inAction, disabled: inAction, href: href || undefined, onClick: handleActionClick },
        (0, element_1.createElement)("span", null, label)));
};
exports.InboxNoteActionButton = InboxNoteActionButton;
