"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectTreeMenu = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
const experimental_tree_control_1 = require("../experimental-tree-control");
const SelectTreeMenu = ({ isEventOutside, isLoading, isOpen, className, position = 'bottom center', scrollIntoViewOnOpen = false, items, treeRef: ref, onClose = () => { }, onEscape, shouldShowCreateButton, onFirstItemLoop, onExpand, ...props }) => {
    const [boundingRect, setBoundingRect] = (0, element_1.useState)();
    const selectControlMenuRef = (0, element_1.useRef)(null);
    (0, element_1.useLayoutEffect)(() => {
        if (selectControlMenuRef.current?.parentElement &&
            selectControlMenuRef.current?.parentElement.clientWidth > 0) {
            setBoundingRect(selectControlMenuRef.current.parentElement.getBoundingClientRect());
        }
    }, [
        selectControlMenuRef.current,
        selectControlMenuRef.current?.clientWidth,
    ]);
    // Scroll the selected item into view when the menu opens.
    (0, element_1.useEffect)(() => {
        if (isOpen && scrollIntoViewOnOpen) {
            selectControlMenuRef.current?.scrollIntoView?.();
        }
    }, [isOpen, scrollIntoViewOnOpen]);
    const shouldItemBeExpanded = (item) => {
        if (!props.createValue || !item.children?.length)
            return false;
        return item.children.some((child) => {
            if (new RegExp((0, lodash_1.escapeRegExp)(props.createValue || ''), 'ig').test(child.data.label)) {
                return true;
            }
            return shouldItemBeExpanded(child);
        });
    };
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    /* Disabled because of the onmouseup on the ul element below. */
    return ((0, element_1.createElement)("div", { ref: selectControlMenuRef, className: "fincommerce-experimental-select-tree-control__menu" },
        (0, element_1.createElement)("div", null,
            (0, element_1.createElement)(components_1.Popover, { focusOnMount: false, inline: true, className: (0, clsx_1.default)('fincommerce-experimental-select-tree-control__popover-menu', className, {
                    'is-open': isOpen,
                    'has-results': items.length > 0,
                }), position: position, flip: false, resize: false, animate: false, onFocusOutside: (event) => {
                    if (isEventOutside(event)) {
                        onClose();
                    }
                } }, isOpen && ((0, element_1.createElement)("div", null, isLoading ? ((0, element_1.createElement)("div", { style: {
                    width: boundingRect?.width,
                } },
                (0, element_1.createElement)(components_1.Spinner, null))) : ((0, element_1.createElement)(experimental_tree_control_1.Tree, { ...props, ref: ref, items: items, onTreeBlur: onClose, onExpand: onExpand, shouldItemBeExpanded: shouldItemBeExpanded, shouldShowCreateButton: shouldShowCreateButton, onFirstItemLoop: onFirstItemLoop, onEscape: onEscape, style: {
                    width: boundingRect?.width,
                } }))))))));
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
};
exports.SelectTreeMenu = SelectTreeMenu;
