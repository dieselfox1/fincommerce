"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonSortableItem = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const NonSortableItem = ({ children }) => {
    if (children === null) {
        return children;
    }
    return (0, element_1.cloneElement)(children, {
        className: `${children.props?.className || ''} non-sortable-item`,
    });
};
exports.NonSortableItem = NonSortableItem;
