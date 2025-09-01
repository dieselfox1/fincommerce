/**
 * External dependencies
 */
import { createElement, forwardRef } from 'react';
/**
 * Internal dependencies
 */
import { createLinkedTree } from './linked-tree-utils';
import { Tree } from './tree';
export const TreeControl = forwardRef(function ForwardedTree({ items, ...props }, ref) {
    const linkedTree = createLinkedTree(items, props.createValue);
    return createElement(Tree, { ...props, ref: ref, items: linkedTree });
});
