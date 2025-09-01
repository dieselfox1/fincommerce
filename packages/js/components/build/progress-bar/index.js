"use strict";
/**
 * External dependencies
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const react_1 = require("react");
const ProgressBar = ({ className = '', percent = 0, color = '#674399', bgcolor = 'var(--wp-admin-theme-color)', }) => {
    const containerStyles = {
        backgroundColor: bgcolor,
    };
    const fillerStyles = {
        backgroundColor: color,
        width: `${percent}%`,
        display: percent === 0 ? 'none' : 'inherit',
    };
    return ((0, react_1.createElement)("div", { className: `fincommerce-progress-bar ${className}` },
        (0, react_1.createElement)("div", { className: "fincommerce-progress-bar__container", style: containerStyles },
            (0, react_1.createElement)("div", { className: "fincommerce-progress-bar__filler", style: fillerStyles }))));
};
exports.ProgressBar = ProgressBar;
