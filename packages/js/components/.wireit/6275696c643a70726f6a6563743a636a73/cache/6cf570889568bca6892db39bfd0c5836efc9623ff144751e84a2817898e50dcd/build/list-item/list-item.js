"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItem = void 0;
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const sortable_1 = require("../sortable");
const sortable_item_1 = require("../sortable/sortable-item");
const ListItem = ({ children, className, index = 0, onDragStart, onDragEnd, ...props }) => {
    const isDraggable = onDragEnd && onDragStart;
    return ((0, element_1.createElement)(sortable_item_1.SortableItem, { ...props, index: index, className: (0, clsx_1.default)('fincommerce-list-item', className) },
        isDraggable && (0, element_1.createElement)(sortable_1.SortableHandle, null),
        children));
};
exports.ListItem = ListItem;
