"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortableHandle = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const draggable_icon_1 = require("./draggable-icon");
const index_1 = require("./index");
const SortableHandle = ({ children, itemIndex, }) => {
    const { onDragStart, onDragEnd } = (0, element_1.useContext)(index_1.SortableContext);
    return ((0, element_1.createElement)("div", { className: "fincommerce-sortable__handle", draggable: true, onDragStart: onDragStart, onDragEnd: onDragEnd, "data-index": itemIndex }, children ? children : (0, element_1.createElement)(draggable_icon_1.DraggableIcon, null)));
};
exports.SortableHandle = SortableHandle;
