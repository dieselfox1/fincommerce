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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const React = __importStar(require("@wordpress/element"));
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const CategoryMenu = ({ groupedTags, activeCategory, onCategorySelect, }) => {
    const getMenuItemClass = (category) => category === activeCategory
        ? 'fincommerce-personalization-tags-modal-menu-item-active'
        : '';
    return ((0, jsx_runtime_1.jsxs)(components_1.MenuGroup, { className: "fincommerce-personalization-tags-modal-menu", children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { onClick: () => onCategorySelect(null), className: getMenuItemClass(null), children: (0, i18n_1.__)('All', 'fincommerce') }), (0, jsx_runtime_1.jsx)("div", { className: "fincommerce-personalization-tags-modal-menu-separator", "aria-hidden": "true", role: "presentation", "data-testid": "fincommerce-personalization-tags-modal-menu-separator" }), Object.keys(groupedTags).map((category, index, array) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { onClick: () => onCategorySelect(category), className: getMenuItemClass(category), children: category }), index < array.length - 1 && ((0, jsx_runtime_1.jsx)("div", { className: "fincommerce-personalization-tags-modal-menu-separator", "aria-hidden": "true", role: "presentation", "data-testid": "fincommerce-personalization-tags-modal-menu-separator" }))] }, category)))] }));
};
exports.CategoryMenu = CategoryMenu;
