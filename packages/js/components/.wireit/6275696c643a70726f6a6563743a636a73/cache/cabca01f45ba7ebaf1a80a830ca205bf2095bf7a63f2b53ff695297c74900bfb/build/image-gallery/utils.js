"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceItem = exports.removeItem = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Remove the item with the selected index from an array of items.
 *
 * @param items       The array to remove the item from.
 * @param removeIndex Index to remove.
 * @return array
 */
const removeItem = (items, removeIndex) => items.filter((_, index) => index !== removeIndex);
exports.removeItem = removeItem;
/**
 * Replace the React Element with given index with specific props.
 *
 * @param items        The initial array to operate on.
 * @param replaceIndex Index to remove.
 * @return array
 */
const replaceItem = (items, replaceIndex, newProps) => {
    const newChildren = [...items];
    newChildren.splice(replaceIndex, 1, (0, element_1.cloneElement)(items[replaceIndex], newProps));
    return newChildren;
};
exports.replaceItem = replaceItem;
