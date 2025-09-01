"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
/**
 * External dependencies
 */
const react_1 = require("react");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
const MenuItem = ({ children, getItemProps, index, isActive, activeStyle = { backgroundColor: '#bde4ff' }, item, tooltipText, className, }) => {
    function renderListItem() {
        const itemProps = getItemProps({ item, index });
        return ((0, react_1.createElement)("li", { ...itemProps, style: isActive ? activeStyle : itemProps.style, className: (0, clsx_1.default)('fincommerce-experimental-select-control__menu-item', itemProps.className, className) }, children));
    }
    if (tooltipText) {
        return ((0, react_1.createElement)(components_1.Tooltip, { text: tooltipText, position: "top center" }, renderListItem()));
    }
    return renderListItem();
};
exports.MenuItem = MenuItem;
