"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const keycodes_1 = require("@wordpress/keycodes");
const react_1 = require("react");
const MenuItem = ({ checked, children, isCheckbox = false, isClickable = false, onInvoke = () => { }, }) => {
    const container = (0, react_1.useRef)(null);
    const onClick = (event) => {
        if (isClickable) {
            event.preventDefault();
            onInvoke();
        }
    };
    const onKeyDown = (event) => {
        const eventTarget = event.target;
        if (eventTarget.isSameNode(event.currentTarget)) {
            if (event.keyCode === keycodes_1.ENTER || event.keyCode === keycodes_1.SPACE) {
                event.preventDefault();
                onInvoke();
            }
            if (event.keyCode === keycodes_1.UP) {
                event.preventDefault();
            }
            if (event.keyCode === keycodes_1.DOWN) {
                event.preventDefault();
                const nextElementToFocus = (eventTarget.nextSibling ||
                    eventTarget.parentNode?.querySelector('.fincommerce-ellipsis-menu__item'));
                nextElementToFocus.focus();
            }
        }
    };
    if (isCheckbox) {
        return ((0, element_1.createElement)("div", { "aria-checked": checked, ref: container, role: "menuitemcheckbox", tabIndex: 0, onKeyDown: onKeyDown, onClick: onClick, className: "fincommerce-ellipsis-menu__item" },
            (0, element_1.createElement)(components_1.BaseControl, { className: "components-toggle-control" },
                (0, element_1.createElement)(components_1.FormToggle, { "aria-hidden": "true", checked: checked, onChange: onInvoke, onClick: (e) => e.stopPropagation(), tabIndex: -1 }),
                children)));
    }
    return ((0, element_1.createElement)("div", { role: "menuitem", tabIndex: 0, onKeyDown: onKeyDown, onClick: onClick, className: "fincommerce-ellipsis-menu__item" }, children));
};
exports.default = MenuItem;
