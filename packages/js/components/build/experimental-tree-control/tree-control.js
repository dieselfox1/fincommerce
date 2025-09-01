"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeControl = void 0;
/**
 * External dependencies
 */
const react_1 = require("react");
/**
 * Internal dependencies
 */
const linked_tree_utils_1 = require("./linked-tree-utils");
const tree_1 = require("./tree");
exports.TreeControl = (0, react_1.forwardRef)(function ForwardedTree({ items, ...props }, ref) {
    const linkedTree = (0, linked_tree_utils_1.createLinkedTree)(items, props.createValue);
    return (0, react_1.createElement)(tree_1.Tree, { ...props, ref: ref, items: linkedTree });
});
