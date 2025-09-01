"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateCategoriesListSidebar = TemplateCategoriesListSidebar;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
function TemplateCategoriesListSidebar({ selectedCategory, templateCategories, onClickCategory, }) {
    const baseClassName = 'block-editor-block-patterns-explorer__sidebar';
    return ((0, jsx_runtime_1.jsx)("div", { className: baseClassName, children: (0, jsx_runtime_1.jsx)("div", { className: `${baseClassName}__categories-list`, children: templateCategories.map(({ name, label }) => {
                return ((0, jsx_runtime_1.jsx)(components_1.Button, { label: label, className: `${baseClassName}__categories-list__item`, isPressed: selectedCategory === name, onClick: () => {
                        onClickCategory(name);
                    }, children: label }, name));
            }) }) }));
}
