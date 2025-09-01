"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeItem = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const html_entities_1 = require("@wordpress/html-entities");
/**
 * Internal dependencies
 */
const use_tree_item_1 = require("./hooks/use-tree-item");
const tree_1 = require("./tree");
exports.TreeItem = (0, react_1.forwardRef)(function ForwardedTreeItem(props, ref) {
    const { item, treeItemProps, headingProps, treeProps, selection, getLabel, } = (0, use_tree_item_1.useTreeItem)({
        ...props,
        ref,
    });
    function handleKeyDown(event) {
        if (event.key === 'Escape' && props.onEscape) {
            event.preventDefault();
            props.onEscape();
        }
        else if (event.key === 'ArrowLeft') {
            if (item.index !== undefined) {
                props.onExpand?.(item.index, false);
            }
        }
        else if (event.key === 'ArrowRight') {
            if (item.index !== undefined) {
                props.onExpand?.(item.index, true);
            }
        }
    }
    return ((0, react_1.createElement)("li", { ...treeItemProps, className: (0, clsx_1.default)(treeItemProps.className, 'experimental-fincommerce-tree-item', {
            'experimental-fincommerce-tree-item--highlighted': props.isHighlighted,
        }) },
        (0, react_1.createElement)("div", { ...headingProps, className: "experimental-fincommerce-tree-item__heading" },
            (0, react_1.createElement)("label", { className: "experimental-fincommerce-tree-item__label" },
                selection.multiple ? ((0, react_1.createElement)(components_1.CheckboxControl, { indeterminate: selection.checkedStatus === 'indeterminate', checked: selection.checkedStatus === 'checked', onChange: selection.onSelectChild, onKeyDown: handleKeyDown, __nextHasNoMarginBottom: true })) : ((0, react_1.createElement)("input", { type: "checkbox", className: "experimental-fincommerce-tree-item__checkbox", checked: selection.checkedStatus === 'checked', onChange: (event) => selection.onSelectChild(event.target.checked), onKeyDown: handleKeyDown })),
                typeof getLabel === 'function' ? (getLabel(item)) : ((0, react_1.createElement)("span", null, (0, html_entities_1.decodeEntities)(item.data.label)))),
            Boolean(item.children?.length) && ((0, react_1.createElement)("div", { className: "experimental-fincommerce-tree-item__expander" },
                (0, react_1.createElement)(components_1.Button, { icon: item.data.isExpanded ? icons_1.chevronUp : icons_1.chevronDown, onClick: () => {
                        if (item.index !== undefined) {
                            props.onExpand?.(item.index, !item.data.isExpanded);
                        }
                    }, onKeyDown: handleKeyDown, className: "experimental-fincommerce-tree-item__expander", "aria-label": item.data.isExpanded
                        ? (0, i18n_1.__)('Collapse', 'fincommerce')
                        : (0, i18n_1.__)('Expand', 'fincommerce') })))),
        Boolean(item.children.length) && item.data.isExpanded && ((0, react_1.createElement)(tree_1.Tree, { ...treeProps, highlightedIndex: props.highlightedIndex, onExpand: props.onExpand, onEscape: props.onEscape }))));
});
