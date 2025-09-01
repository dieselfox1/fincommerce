import { jsx as _jsx } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
export function TemplateCategoriesListSidebar({ selectedCategory, templateCategories, onClickCategory, }) {
    const baseClassName = 'block-editor-block-patterns-explorer__sidebar';
    return (_jsx("div", { className: baseClassName, children: _jsx("div", { className: `${baseClassName}__categories-list`, children: templateCategories.map(({ name, label }) => {
                return (_jsx(Button, { label: label, className: `${baseClassName}__categories-list__item`, isPressed: selectedCategory === name, onClick: () => {
                        onClickCategory(name);
                    }, children: label }, name));
            }) }) }));
}
