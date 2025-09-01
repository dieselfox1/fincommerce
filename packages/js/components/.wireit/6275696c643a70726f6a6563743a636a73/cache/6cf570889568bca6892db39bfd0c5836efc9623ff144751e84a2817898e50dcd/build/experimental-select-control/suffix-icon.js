"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffixIcon = void 0;
/**
 * External dependencies
 */
const react_1 = require("react");
const icons_1 = require("@wordpress/icons");
const clsx_1 = __importDefault(require("clsx"));
const SuffixIcon = ({ className = '', icon }) => {
    return ((0, react_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-experimental-select-control__suffix-icon', className) },
        (0, react_1.createElement)(icons_1.Icon, { icon: icon, size: 24 })));
};
exports.SuffixIcon = SuffixIcon;
