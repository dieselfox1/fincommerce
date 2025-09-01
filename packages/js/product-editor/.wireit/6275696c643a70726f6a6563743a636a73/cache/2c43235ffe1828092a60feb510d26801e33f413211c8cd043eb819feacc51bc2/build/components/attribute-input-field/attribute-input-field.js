"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeInputField = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const components_2 = require("@fincommerce/components");
/**
 * Internal dependencies
 */
const menu_attribute_list_1 = require("./menu-attribute-list");
const AttributeInputField = ({ value = null, items = [], isLoading, onChange, placeholder, label, disabled, disabledAttributeMessage, createNewAttributesAsGlobal = false, }) => {
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
    return ((0, element_1.createElement)(components_2.__experimentalSelectControl, { className: "fincommerce-attribute-input-field", items: items, label: label || '', disabled: disabled, getFilteredItems: getFilteredItems, placeholder: placeholder, getItemLabel: (item) => item?.name || '', getItemValue: (item) => item?.id || '', selected: value, onSelect: onChange, __experimentalOpenMenuOnFocus: true }, ({ items: renderItems, highlightedIndex, getItemProps, getMenuProps, isOpen, }) => {
        return ((0, element_1.createElement)(components_2.__experimentalSelectControlMenu, { getMenuProps: getMenuProps, isOpen: isOpen }, isLoading ? ((0, element_1.createElement)(components_1.Spinner, null)) : ((0, element_1.createElement)(menu_attribute_list_1.MenuAttributeList, { renderItems: renderItems, highlightedIndex: highlightedIndex, disabledAttributeMessage: disabledAttributeMessage, getItemProps: getItemProps }))));
    }));
};
exports.AttributeInputField = AttributeInputField;
