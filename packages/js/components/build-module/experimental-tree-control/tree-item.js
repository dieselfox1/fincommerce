/**
 * External dependencies
 */
import { Button, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { chevronDown, chevronUp } from '@wordpress/icons';
import clsx from 'clsx';
import { createElement, forwardRef } from 'react';
import { decodeEntities } from '@wordpress/html-entities';
/**
 * Internal dependencies
 */
import { useTreeItem } from './hooks/use-tree-item';
import { Tree } from './tree';
export const TreeItem = forwardRef(function ForwardedTreeItem(props, ref) {
    const { item, treeItemProps, headingProps, treeProps, selection, getLabel, } = useTreeItem({
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
    return (createElement("li", { ...treeItemProps, className: clsx(treeItemProps.className, 'experimental-fincommerce-tree-item', {
            'experimental-fincommerce-tree-item--highlighted': props.isHighlighted,
        }) },
        createElement("div", { ...headingProps, className: "experimental-fincommerce-tree-item__heading" },
            createElement("label", { className: "experimental-fincommerce-tree-item__label" },
                selection.multiple ? (createElement(CheckboxControl, { indeterminate: selection.checkedStatus === 'indeterminate', checked: selection.checkedStatus === 'checked', onChange: selection.onSelectChild, onKeyDown: handleKeyDown, __nextHasNoMarginBottom: true })) : (createElement("input", { type: "checkbox", className: "experimental-fincommerce-tree-item__checkbox", checked: selection.checkedStatus === 'checked', onChange: (event) => selection.onSelectChild(event.target.checked), onKeyDown: handleKeyDown })),
                typeof getLabel === 'function' ? (getLabel(item)) : (createElement("span", null, decodeEntities(item.data.label)))),
            Boolean(item.children?.length) && (createElement("div", { className: "experimental-fincommerce-tree-item__expander" },
                createElement(Button, { icon: item.data.isExpanded ? chevronUp : chevronDown, onClick: () => {
                        if (item.index !== undefined) {
                            props.onExpand?.(item.index, !item.data.isExpanded);
                        }
                    }, onKeyDown: handleKeyDown, className: "experimental-fincommerce-tree-item__expander", "aria-label": item.data.isExpanded
                        ? __('Collapse', 'fincommerce')
                        : __('Expand', 'fincommerce') })))),
        Boolean(item.children.length) && item.data.isExpanded && (createElement(Tree, { ...treeProps, highlightedIndex: props.highlightedIndex, onExpand: props.onExpand, onEscape: props.onEscape }))));
});
