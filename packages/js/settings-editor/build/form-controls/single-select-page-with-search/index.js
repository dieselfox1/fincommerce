"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleSelectPageWithSearch = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@fincommerce/components");
const components_2 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const utils_1 = require("../../utils");
const suffix_1 = require("./suffix");
const hooks_1 = require("./hooks");
const SingleSelectPageWithSearch = ({ data, field, onChange, hideLabelFromVision, help, className, exclude, }) => {
    const value = field.getValue({ item: data }) ?? '';
    const { id } = field;
    const { selectedItem, isLoading } = (0, hooks_1.useSelectedItem)(value);
    const [isFocused, setIsFocused] = (0, element_1.useState)(false);
    const { items: allItems, isFetching } = (0, hooks_1.useItems)(exclude);
    const handleSelect = (0, element_1.useCallback)((item) => {
        onChange({ [id]: item?.value || '' });
        setIsFocused(false);
    }, [onChange, id]);
    const label = field.label === id ? undefined : ((0, element_1.createElement)("div", { dangerouslySetInnerHTML: {
            __html: (0, utils_1.sanitizeHTML)(field.label),
        } }));
    return ((0, element_1.createElement)(components_2.BaseControl, { __nextHasNoMarginBottom: true, id: id, help: help, label: label, hideLabelFromVision: hideLabelFromVision },
        (0, element_1.createElement)("input", { type: "hidden", id: id, value: value }),
        (0, element_1.createElement)(components_1.__experimentalSelectControl, { __experimentalOpenMenuOnFocus: true, className: className, placeholder: isLoading
                ? (0, i18n_1.__)('Loading…', 'fincommerce')
                : (0, i18n_1.__)('Search for a page…', 'fincommerce'), label: "", 
            // The select control input does not require an id since its value represents the label (which displays the page title to the user). A hidden input with the actual id is provided above, ensuring that the value is saved correctly.
            inputProps: {
                id: undefined,
                'aria-readonly': true,
                'aria-label': (0, i18n_1.__)('Use up and down arrow keys to navigate', 'fincommerce'),
            }, items: allItems, selected: isFocused ? null : selectedItem, onSelect: handleSelect, onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), onRemove: () => handleSelect(null), suffix: (0, element_1.createElement)(suffix_1.Suffix, { value: value, isLoading: isLoading || isFetching, isFocused: isFocused, onRemove: () => handleSelect(null) }) }, ({ items, isOpen, highlightedIndex, getItemProps, getMenuProps, }) => ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(components_2.Icon, { icon: icons_1.search, size: 20 }),
            (0, element_1.createElement)(components_1.__experimentalSelectControlMenu, { isOpen: isOpen, getMenuProps: getMenuProps }, isFetching ? ((0, element_1.createElement)("div", { className: "fincommerce-single-select-page-with-search__menu-loading" },
                (0, element_1.createElement)(components_2.Spinner, null))) : (items.map((item, index) => ((0, element_1.createElement)(components_1.__experimentalSelectControlMenuItem, { key: `${item.value}${index}`, index: index, isActive: highlightedIndex === index, item: item, getItemProps: getItemProps }, item.label))))))))));
};
exports.SingleSelectPageWithSearch = SingleSelectPageWithSearch;
