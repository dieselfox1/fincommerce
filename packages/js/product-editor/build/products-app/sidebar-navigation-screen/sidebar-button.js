"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SidebarButton;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const clsx_1 = __importDefault(require("clsx"));
function SidebarButton(props) {
    return ((0, element_1.createElement)(components_1.Button, { ...props, className: (0, clsx_1.default)('edit-site-sidebar-button', props.className) }));
}
