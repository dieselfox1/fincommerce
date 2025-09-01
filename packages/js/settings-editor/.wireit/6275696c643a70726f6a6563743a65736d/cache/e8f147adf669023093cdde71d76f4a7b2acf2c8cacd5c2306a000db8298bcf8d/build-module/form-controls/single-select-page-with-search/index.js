/**
 * External dependencies
 */
import { createElement, Fragment, useCallback, useState, } from '@wordpress/element';
import { __experimentalSelectControl as SelectControl, __experimentalSelectControlMenu as Menu, __experimentalSelectControlMenuItem as MenuItem, } from '@fincommerce/components';
import { Spinner, BaseControl, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { search } from '@wordpress/icons';
import { sanitizeHTML } from '../../utils';
import { Suffix } from './suffix';
import { useItems, useSelectedItem } from './hooks';
export const SingleSelectPageWithSearch = ({ data, field, onChange, hideLabelFromVision, help, className, exclude, }) => {
    const value = field.getValue({ item: data }) ?? '';
    const { id } = field;
    const { selectedItem, isLoading } = useSelectedItem(value);
    const [isFocused, setIsFocused] = useState(false);
    const { items: allItems, isFetching } = useItems(exclude);
    const handleSelect = useCallback((item) => {
        onChange({ [id]: item?.value || '' });
        setIsFocused(false);
    }, [onChange, id]);
    const label = field.label === id ? undefined : (createElement("div", { dangerouslySetInnerHTML: {
            __html: sanitizeHTML(field.label),
        } }));
    return (createElement(BaseControl, { __nextHasNoMarginBottom: true, id: id, help: help, label: label, hideLabelFromVision: hideLabelFromVision },
        createElement("input", { type: "hidden", id: id, value: value }),
        createElement(SelectControl, { __experimentalOpenMenuOnFocus: true, className: className, placeholder: isLoading
                ? __('Loading…', 'fincommerce')
                : __('Search for a page…', 'fincommerce'), label: "", 
            // The select control input does not require an id since its value represents the label (which displays the page title to the user). A hidden input with the actual id is provided above, ensuring that the value is saved correctly.
            inputProps: {
                id: undefined,
                'aria-readonly': true,
                'aria-label': __('Use up and down arrow keys to navigate', 'fincommerce'),
            }, items: allItems, selected: isFocused ? null : selectedItem, onSelect: handleSelect, onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), onRemove: () => handleSelect(null), suffix: createElement(Suffix, { value: value, isLoading: isLoading || isFetching, isFocused: isFocused, onRemove: () => handleSelect(null) }) }, ({ items, isOpen, highlightedIndex, getItemProps, getMenuProps, }) => (createElement(Fragment, null,
            createElement(Icon, { icon: search, size: 20 }),
            createElement(Menu, { isOpen: isOpen, getMenuProps: getMenuProps }, isFetching ? (createElement("div", { className: "fincommerce-single-select-page-with-search__menu-loading" },
                createElement(Spinner, null))) : (items.map((item, index) => (createElement(MenuItem, { key: `${item.value}${index}`, index: index, isActive: highlightedIndex === index, item: item, getItemProps: getItemProps }, item.label))))))))));
};
