"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAttributeTermInputField = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const components_2 = require("@fincommerce/components");
function isNewTermItem(item) {
    return item !== null && typeof item === 'object' && !!item.label;
}
const CustomAttributeTermInputField = ({ value = [], onChange, placeholder, disabled, label, }) => {
    const [listItems, setListItems] = (0, element_1.useState)(value);
    const onRemove = (item) => {
        onChange(value.filter((opt) => opt !== item));
    };
    const onSelect = (item) => {
        // Add new item.
        if (isNewTermItem(item)) {
            setListItems([...listItems, item.label]);
            onChange([...value, item.label]);
            return;
        }
        const isSelected = value.includes(item);
        if (isSelected) {
            onRemove(item);
            return;
        }
        onChange([...value, item]);
    };
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_2.__experimentalSelectControl, { items: listItems, multiple: true, disabled: disabled, label: label || '', placeholder: placeholder || '', getItemLabel: (item) => isNewTermItem(item) ? item.label : item || '', getItemValue: (item) => isNewTermItem(item) ? item.id : item || '', getFilteredItems: (allItems, inputValue) => {
                const filteredItems = allItems.filter((item) => !inputValue.length ||
                    (!isNewTermItem(item) &&
                        item
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())));
                if (inputValue.length > 0 &&
                    !filteredItems.find((item) => !isNewTermItem(item) &&
                        item.toLowerCase() === inputValue.toLowerCase())) {
                    return [
                        ...filteredItems,
                        {
                            id: 'is-new',
                            label: inputValue,
                        },
                    ];
                }
                return filteredItems;
            }, selected: value, onSelect: onSelect, onRemove: onRemove, className: "fincommerce-attribute-term-field" }, ({ items, highlightedIndex, getItemProps, getMenuProps, isOpen, }) => {
            return ((0, element_1.createElement)(components_2.__experimentalSelectControlMenu, { isOpen: isOpen, getMenuProps: getMenuProps }, items.map((item, menuIndex) => {
                return ((0, element_1.createElement)(components_2.__experimentalSelectControlMenuItem, { key: `${isNewTermItem(item)
                        ? item.id
                        : item}`, index: menuIndex, isActive: highlightedIndex === menuIndex, item: item, getItemProps: getItemProps }, isNewTermItem(item) ? ((0, element_1.createElement)("div", { className: "fincommerce-attribute-term-field__add-new" },
                    (0, element_1.createElement)(components_1.Icon, { icon: icons_1.plus, size: 20, className: "fincommerce-attribute-term-field__add-new-icon" }),
                    (0, element_1.createElement)("span", null, (0, i18n_1.sprintf)(
                    /* translators: The name of the new attribute term to be created */
                    (0, i18n_1.__)('Create "%s"', 'fincommerce'), item.label)))) : ((0, element_1.createElement)(components_1.CheckboxControl, { onChange: () => null, checked: value.includes(item), 
                    // @ts-expect-error The label prop can be a string, however, the final consumer of this prop accepts ReactNode.
                    label: (0, element_1.createElement)("span", null,
                        " ",
                        item,
                        " ") }))));
            })));
        })));
};
exports.CustomAttributeTermInputField = CustomAttributeTermInputField;
