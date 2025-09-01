"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuSlot = exports.Menu = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const Menu = ({ children, getMenuProps, isOpen, className, position = 'bottom right', scrollIntoViewOnOpen = false, }) => {
    const selectControlMenuRef = (0, element_1.useRef)(null);
    const popoverRef = (0, element_1.useRef)(null);
    (0, element_1.useLayoutEffect)(() => {
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
    (0, element_1.useEffect)(() => {
        if (isOpen && scrollIntoViewOnOpen) {
            selectControlMenuRef.current?.scrollIntoView();
        }
    }, [isOpen, scrollIntoViewOnOpen]);
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    /* Disabled because of the onmouseup on the ul element below. */
    return ((0, element_1.createElement)("div", { ref: selectControlMenuRef, className: "fincommerce-experimental-select-control__menu" },
        (0, element_1.createElement)("div", null,
            (0, element_1.createElement)(components_1.Popover, { __unstableSlotName: "fincommerce-select-control-menu", focusOnMount: false, className: (0, clsx_1.default)('fincommerce-experimental-select-control__popover-menu', {
                    'is-open': isOpen,
                    'has-results': element_1.Children.count(children) > 0,
                }), position: position, animate: false, resize: false, ref: popoverRef },
                (0, element_1.createElement)("ul", { ...getMenuProps(), className: (0, clsx_1.default)('fincommerce-experimental-select-control__popover-menu-container', className), onMouseUp: (e) => 
                    // Fix to prevent select control dropdown from closing when selecting within the Popover.
                    e.stopPropagation() }, isOpen && children)))));
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
};
exports.Menu = Menu;
const MenuSlot = () => (0, element_1.createPortal)((0, element_1.createElement)("div", { "aria-live": "off" },
    (0, element_1.createElement)(components_1.Popover.Slot, { name: "fincommerce-select-control-menu" })), document.body);
exports.MenuSlot = MenuSlot;
