import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import * as React from '@wordpress/element';
import { MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
const CategoryMenu = ({ groupedTags, activeCategory, onCategorySelect, }) => {
    const getMenuItemClass = (category) => category === activeCategory
        ? 'fincommerce-personalization-tags-modal-menu-item-active'
        : '';
    return (_jsxs(MenuGroup, { className: "fincommerce-personalization-tags-modal-menu", children: [_jsx(MenuItem, { onClick: () => onCategorySelect(null), className: getMenuItemClass(null), children: __('All', 'fincommerce') }), _jsx("div", { className: "fincommerce-personalization-tags-modal-menu-separator", "aria-hidden": "true", role: "presentation", "data-testid": "fincommerce-personalization-tags-modal-menu-separator" }), Object.keys(groupedTags).map((category, index, array) => (_jsxs(React.Fragment, { children: [_jsx(MenuItem, { onClick: () => onCategorySelect(category), className: getMenuItemClass(category), children: category }), index < array.length - 1 && (_jsx("div", { className: "fincommerce-personalization-tags-modal-menu-separator", "aria-hidden": "true", role: "presentation", "data-testid": "fincommerce-personalization-tags-modal-menu-separator" }))] }, category)))] }));
};
export { CategoryMenu };
