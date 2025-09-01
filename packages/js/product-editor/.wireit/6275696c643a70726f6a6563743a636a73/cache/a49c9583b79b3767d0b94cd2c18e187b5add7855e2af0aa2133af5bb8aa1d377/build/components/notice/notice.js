"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notice = Notice;
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
const icons_1 = require("@wordpress/icons");
function Notice({ title = '', content = '', className, type = 'info', children, isDismissible = false, handleDismiss = () => { }, }) {
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)(className, type, 'fincommerce-product-notice', {
            'is-dismissible': isDismissible,
        }) },
        title && ((0, element_1.createElement)("h3", { className: "fincommerce-product-notice__title" }, title)),
        content && ((0, element_1.createElement)("p", { className: "fincommerce-product-notice__content" }, content)),
        (0, element_1.createElement)("div", { className: "fincommerce-product-notice__content" }, children),
        isDismissible && ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-product-notice__dismiss", icon: icons_1.closeSmall, onClick: handleDismiss }))));
}
