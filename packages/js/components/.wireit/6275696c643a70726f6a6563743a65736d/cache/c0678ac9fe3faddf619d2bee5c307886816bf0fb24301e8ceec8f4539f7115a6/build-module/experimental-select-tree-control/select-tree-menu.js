/**
 * External dependencies
 */
import { Popover, Spinner } from '@wordpress/components';
import clsx from 'clsx';
import { createElement, useEffect, useRef, useLayoutEffect, useState, } from '@wordpress/element';
import { escapeRegExp } from 'lodash';
/**
 * Internal dependencies
 */
import { Tree, } from '../experimental-tree-control';
export const SelectTreeMenu = ({ isEventOutside, isLoading, isOpen, className, position = 'bottom center', scrollIntoViewOnOpen = false, items, treeRef: ref, onClose = () => { }, onEscape, shouldShowCreateButton, onFirstItemLoop, onExpand, ...props }) => {
    const [boundingRect, setBoundingRect] = useState();
    const selectControlMenuRef = useRef(null);
    useLayoutEffect(() => {
        if (selectControlMenuRef.current?.parentElement &&
            selectControlMenuRef.current?.parentElement.clientWidth > 0) {
            setBoundingRect(selectControlMenuRef.current.parentElement.getBoundingClientRect());
        }
    }, [
        selectControlMenuRef.current,
        selectControlMenuRef.current?.clientWidth,
    ]);
    // Scroll the selected item into view when the menu opens.
    useEffect(() => {
        if (isOpen && scrollIntoViewOnOpen) {
            selectControlMenuRef.current?.scrollIntoView?.();
        }
    }, [isOpen, scrollIntoViewOnOpen]);
    const shouldItemBeExpanded = (item) => {
        if (!props.createValue || !item.children?.length)
            return false;
        return item.children.some((child) => {
            if (new RegExp(escapeRegExp(props.createValue || ''), 'ig').test(child.data.label)) {
                return true;
            }
            return shouldItemBeExpanded(child);
        });
    };
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    /* Disabled because of the onmouseup on the ul element below. */
    return (createElement("div", { ref: selectControlMenuRef, className: "fincommerce-experimental-select-tree-control__menu" },
        createElement("div", null,
            createElement(Popover, { focusOnMount: false, inline: true, className: clsx('fincommerce-experimental-select-tree-control__popover-menu', className, {
                    'is-open': isOpen,
                    'has-results': items.length > 0,
                }), position: position, flip: false, resize: false, animate: false, onFocusOutside: (event) => {
                    if (isEventOutside(event)) {
                        onClose();
                    }
                } }, isOpen && (createElement("div", null, isLoading ? (createElement("div", { style: {
                    width: boundingRect?.width,
                } },
                createElement(Spinner, null))) : (createElement(Tree, { ...props, ref: ref, items: items, onTreeBlur: onClose, onExpand: onExpand, shouldItemBeExpanded: shouldItemBeExpanded, shouldShowCreateButton: shouldShowCreateButton, onFirstItemLoop: onFirstItemLoop, onEscape: onEscape, style: {
                    width: boundingRect?.width,
                } }))))))));
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
};
