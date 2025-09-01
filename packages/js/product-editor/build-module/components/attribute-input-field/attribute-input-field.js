/**
 * External dependencies
 */
import { Spinner } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __experimentalSelectControl as SelectControl, __experimentalSelectControlMenu as Menu, } from '@fincommerce/components';
/**
 * Internal dependencies
 */
import { MenuAttributeList } from './menu-attribute-list';
export const AttributeInputField = ({ value = null, items = [], isLoading, onChange, placeholder, label, disabled, disabledAttributeMessage, createNewAttributesAsGlobal = false, }) => {
    const getFilteredItems = (allItems, inputValue) => {
        const filteredItems = allItems.filter((item) => (item.name || '')
            .toLowerCase()
            .startsWith(inputValue.toLowerCase()));
        if (inputValue.length > 0 &&
            (createNewAttributesAsGlobal ||
                !allItems.find((item) => item.name.toLowerCase() === inputValue.toLowerCase()))) {
            return [
                ...filteredItems,
                {
                    id: -99,
                    name: inputValue,
                },
            ];
        }
        return filteredItems;
    };
    return (createElement(SelectControl, { className: "fincommerce-attribute-input-field", items: items, label: label || '', disabled: disabled, getFilteredItems: getFilteredItems, placeholder: placeholder, getItemLabel: (item) => item?.name || '', getItemValue: (item) => item?.id || '', selected: value, onSelect: onChange, __experimentalOpenMenuOnFocus: true }, ({ items: renderItems, highlightedIndex, getItemProps, getMenuProps, isOpen, }) => {
        return (createElement(Menu, { getMenuProps: getMenuProps, isOpen: isOpen }, isLoading ? (createElement(Spinner, null)) : (createElement(MenuAttributeList, { renderItems: renderItems, highlightedIndex: highlightedIndex, disabledAttributeMessage: disabledAttributeMessage, getItemProps: getItemProps }))));
    }));
};
