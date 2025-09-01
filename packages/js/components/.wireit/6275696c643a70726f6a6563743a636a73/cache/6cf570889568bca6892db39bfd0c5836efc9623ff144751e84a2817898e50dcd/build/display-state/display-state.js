"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayState = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const DisplayState = ({ state = 'visible', children, ...props }) => {
    if (state === 'visible') {
        return (0, element_1.createElement)("div", { ...props }, children);
    }
    if (state === 'visually-hidden') {
        return ((0, element_1.createElement)("div", { ...props, style: { display: 'none' } }, children));
    }
    return null;
};
exports.DisplayState = DisplayState;
