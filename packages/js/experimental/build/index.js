"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskItem = exports.CollapsibleList = exports.List = exports.ListItem = exports.useSlot = exports.Text = exports.NavigationItem = exports.NavigationMenu = exports.NavigationGroup = exports.NavigationBackButton = exports.Navigation = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
/**
 * Prioritize exports of non-experimental components over experimental.
 */
exports.Navigation = components_1.Navigation || components_1.__experimentalNavigation;
exports.NavigationBackButton = components_1.NavigationBackButton || components_1.__experimentalNavigationBackButton;
exports.NavigationGroup = components_1.NavigationGroup || components_1.__experimentalNavigationGroup;
exports.NavigationMenu = components_1.NavigationMenu || components_1.__experimentalNavigationMenu;
exports.NavigationItem = components_1.NavigationItem || components_1.__experimentalNavigationItem;
exports.Text = components_1.Text || components_1.__experimentalText;
// Add a fallback for useSlotFills hook to not break in older versions of wp.components.
// This hook was introduced in wp.components@21.2.0.
const useSlotFills = components_1.__experimentalUseSlotFills || (() => null);
const useSlot = (name) => {
    const _useSlot = components_1.useSlot || components_1.__experimentalUseSlot;
    const slot = _useSlot(name);
    const fills = useSlotFills(name);
    /*
     * Since wp.components@21.2.0, the slot object no longer contains the fills prop.
     * Add fills prop to the slot object for backward compatibility.
     */
    if (typeof components_1.__experimentalUseSlotFills === 'function') {
        return {
            ...slot,
            fills,
        };
    }
    return slot;
};
exports.useSlot = useSlot;
var experimental_list_item_1 = require("./experimental-list/experimental-list-item");
Object.defineProperty(exports, "ListItem", { enumerable: true, get: function () { return experimental_list_item_1.ExperimentalListItem; } });
var experimental_list_1 = require("./experimental-list/experimental-list");
Object.defineProperty(exports, "List", { enumerable: true, get: function () { return experimental_list_1.ExperimentalList; } });
var collapsible_list_1 = require("./experimental-list/collapsible-list");
Object.defineProperty(exports, "CollapsibleList", { enumerable: true, get: function () { return collapsible_list_1.ExperimentalCollapsibleList; } });
var task_item_1 = require("./experimental-list/task-item");
Object.defineProperty(exports, "TaskItem", { enumerable: true, get: function () { return task_item_1.TaskItem; } });
__exportStar(require("./inbox-note"), exports);
__exportStar(require("./vertical-css-transition"), exports);
