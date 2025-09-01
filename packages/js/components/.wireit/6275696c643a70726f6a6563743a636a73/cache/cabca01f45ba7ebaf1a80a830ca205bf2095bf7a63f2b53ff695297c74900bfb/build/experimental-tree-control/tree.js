"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const icons_1 = require("@wordpress/icons");
const compose_1 = require("@wordpress/compose");
/**
 * Internal dependencies
 */
const use_tree_1 = require("./hooks/use-tree");
const tree_item_1 = require("./tree-item");
const linked_tree_utils_1 = require("./linked-tree-utils");
exports.Tree = (0, react_1.forwardRef)(function ForwardedTree(props, forwardedRef) {
    const rootListRef = (0, react_1.useRef)(null);
    const ref = (0, compose_1.useMergeRefs)([rootListRef, forwardedRef]);
    const { level, items, treeProps, treeItemProps } = (0, use_tree_1.useTree)({
        ...props,
        ref,
    });
    const numberOfItems = (0, linked_tree_utils_1.countNumberOfNodes)(items);
    const isCreateButtonVisible = props.shouldShowCreateButton &&
        props.shouldShowCreateButton(props.createValue);
    return ((0, react_1.createElement)(react_1.Fragment, null,
        items.length || isCreateButtonVisible ? ((0, react_1.createElement)("ol", { ...treeProps, className: (0, clsx_1.default)(treeProps.className, 'experimental-fincommerce-tree', `experimental-fincommerce-tree--level-${level}`) }, items.map((child, index) => ((0, react_1.createElement)(tree_item_1.TreeItem, { ...treeItemProps, isHighlighted: props.highlightedIndex === child.index, onExpand: props.onExpand, highlightedIndex: props.highlightedIndex, isExpanded: child.data.isExpanded, key: child.data.value, item: child, index: index, 
            // Button ref is not working, so need to use CSS directly
            onLastItemLoop: () => {
                rootListRef.current
                    ?.closest('ol[role="listbox"]')
                    ?.parentElement?.querySelector('.experimental-fincommerce-tree__button')?.focus();
            }, onFirstItemLoop: props.onFirstItemLoop, onEscape: props.onEscape }))))) : null,
        isCreateButtonVisible && ((0, react_1.createElement)(components_1.Button, { id: 'fincommerce-experimental-tree-control__menu-item-' +
                numberOfItems, className: (0, clsx_1.default)('experimental-fincommerce-tree__button', {
                'experimental-fincommerce-tree__button--highlighted': props.highlightedIndex === numberOfItems,
            }), onClick: () => {
                if (props.onCreateNew) {
                    props.onCreateNew();
                }
                if (props.onTreeBlur) {
                    props.onTreeBlur();
                }
            }, 
            // Component's event type definition is not working
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onKeyDown: (event) => {
                if (event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown') {
                    event.preventDefault();
                    if (event.key === 'ArrowUp') {
                        const allHeadings = event.nativeEvent.srcElement.previousSibling.querySelectorAll('.experimental-fincommerce-tree-item > .experimental-fincommerce-tree-item__heading');
                        allHeadings[allHeadings.length - 1]
                            ?.querySelector('.experimental-fincommerce-tree-item__label')
                            ?.focus();
                    }
                }
                else if (event.key === 'Escape' && props.onEscape) {
                    event.preventDefault();
                    props.onEscape();
                }
            } },
            (0, react_1.createElement)(components_1.Icon, { icon: icons_1.plus, size: 20 }),
            props.createValue
                ? (0, i18n_1.sprintf)(
                /* translators: %s: create value */
                (0, i18n_1.__)('Create "%s"', 'fincommerce'), props.createValue)
                : (0, i18n_1.__)('Create new', 'fincommerce')))));
});
