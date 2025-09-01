/**
 * External dependencies
 */
import { BaseControl, FormToggle } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { DOWN, ENTER, SPACE, UP } from '@wordpress/keycodes';
import { useRef } from 'react';
const MenuItem = ({ checked, children, isCheckbox = false, isClickable = false, onInvoke = () => { }, }) => {
    const container = useRef(null);
    const onClick = (event) => {
        if (isClickable) {
            event.preventDefault();
            onInvoke();
        }
    };
    const onKeyDown = (event) => {
        const eventTarget = event.target;
        if (eventTarget.isSameNode(event.currentTarget)) {
            if (event.keyCode === ENTER || event.keyCode === SPACE) {
                event.preventDefault();
                onInvoke();
            }
            if (event.keyCode === UP) {
                event.preventDefault();
            }
            if (event.keyCode === DOWN) {
                event.preventDefault();
                const nextElementToFocus = (eventTarget.nextSibling ||
                    eventTarget.parentNode?.querySelector('.fincommerce-ellipsis-menu__item'));
                nextElementToFocus.focus();
            }
        }
    };
    if (isCheckbox) {
        return (createElement("div", { "aria-checked": checked, ref: container, role: "menuitemcheckbox", tabIndex: 0, onKeyDown: onKeyDown, onClick: onClick, className: "fincommerce-ellipsis-menu__item" },
            createElement(BaseControl, { className: "components-toggle-control" },
                createElement(FormToggle, { "aria-hidden": "true", checked: checked, onChange: onInvoke, onClick: (e) => e.stopPropagation(), tabIndex: -1 }),
                children)));
    }
    return (createElement("div", { role: "menuitem", tabIndex: 0, onKeyDown: onKeyDown, onClick: onClick, className: "fincommerce-ellipsis-menu__item" }, children));
};
export default MenuItem;
