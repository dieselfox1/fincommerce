/**
 * External dependencies
 */
import { Popover } from '@wordpress/components';
import clsx from 'clsx';
import { createElement, useEffect, useRef, createPortal, Children, useLayoutEffect, } from '@wordpress/element';
export const Menu = ({ children, getMenuProps, isOpen, className, position = 'bottom right', scrollIntoViewOnOpen = false, }) => {
    const selectControlMenuRef = useRef(null);
    const popoverRef = useRef(null);
    useLayoutEffect(() => {
        const comboboxWrapper = selectControlMenuRef.current?.closest('.fincommerce-experimental-select-control__combo-box-wrapper');
        const popoverContent = popoverRef.current?.querySelector('.components-popover__content');
        if (comboboxWrapper && comboboxWrapper?.clientWidth > 0) {
            if (popoverContent) {
                popoverContent.style.width = `${comboboxWrapper.getBoundingClientRect().width}px`;
            }
        }
    }, [
        selectControlMenuRef.current,
        selectControlMenuRef.current?.clientWidth,
        popoverRef.current,
    ]);
    // Scroll the selected item into view when the menu opens.
    useEffect(() => {
        if (isOpen && scrollIntoViewOnOpen) {
            selectControlMenuRef.current?.scrollIntoView();
        }
    }, [isOpen, scrollIntoViewOnOpen]);
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    /* Disabled because of the onmouseup on the ul element below. */
    return (createElement("div", { ref: selectControlMenuRef, className: "fincommerce-experimental-select-control__menu" },
        createElement("div", null,
            createElement(Popover, { __unstableSlotName: "fincommerce-select-control-menu", focusOnMount: false, className: clsx('fincommerce-experimental-select-control__popover-menu', {
                    'is-open': isOpen,
                    'has-results': Children.count(children) > 0,
                }), position: position, animate: false, resize: false, ref: popoverRef },
                createElement("ul", { ...getMenuProps(), className: clsx('fincommerce-experimental-select-control__popover-menu-container', className), onMouseUp: (e) => 
                    // Fix to prevent select control dropdown from closing when selecting within the Popover.
                    e.stopPropagation() }, isOpen && children)))));
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
};
export const MenuSlot = () => createPortal(createElement("div", { "aria-live": "off" },
    createElement(Popover.Slot, { name: "fincommerce-select-control-menu" })), document.body);
