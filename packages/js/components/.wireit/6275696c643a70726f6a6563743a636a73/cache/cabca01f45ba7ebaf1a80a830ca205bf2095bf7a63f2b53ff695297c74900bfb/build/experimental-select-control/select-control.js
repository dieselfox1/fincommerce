"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectControlStateChangeTypes = void 0;
exports.SelectControl = SelectControl;
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const downshift_1 = require("downshift");
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const selected_items_1 = require("./selected-items");
const combo_box_1 = require("./combo-box");
const menu_1 = require("./menu");
const menu_item_1 = require("./menu-item");
const suffix_icon_1 = require("./suffix-icon");
const utils_1 = require("./utils");
exports.selectControlStateChangeTypes = downshift_1.useCombobox.stateChangeTypes;
function SelectControl({ getItemLabel = utils_1.defaultGetItemLabel, getItemValue = utils_1.defaultGetItemValue, hasExternalTags = false, children = ({ items: renderItems, highlightedIndex, getItemProps, getMenuProps, isOpen, }) => {
    return ((0, element_1.createElement)(menu_1.Menu, { getMenuProps: getMenuProps, isOpen: isOpen }, renderItems.map((item, index) => ((0, element_1.createElement)(menu_item_1.MenuItem, { key: `${getItemValue(item)}${index}`, index: index, isActive: highlightedIndex === index, item: item, getItemProps: getItemProps }, getItemLabel(item))))));
}, multiple = false, items, label, getFilteredItems = utils_1.defaultGetFilteredItems, onInputChange = () => null, onRemove = () => null, onSelect = () => null, onFocus = () => null, onBlur = () => null, onKeyDown = () => null, stateReducer = (state, actionAndChanges) => actionAndChanges.changes, placeholder, selected, className, disabled, inputProps = {}, suffix = (0, element_1.createElement)(suffix_icon_1.SuffixIcon, { icon: icons_1.chevronDown }), showToggleButton = false, readOnlyWhenClosed = true, __experimentalOpenMenuOnFocus = false, }) {
    const [isFocused, setIsFocused] = (0, element_1.useState)(false);
    const [inputValue, setInputValue] = (0, element_1.useState)('');
    const instanceId = (0, compose_1.useInstanceId)(SelectControl, 'fincommerce-experimental-select-control');
    const innerInputClassName = 'fincommerce-experimental-select-control__input';
    const selectControlWrapperRef = (0, element_1.useRef)(null);
    let selectedItems = selected === null ? [] : selected;
    selectedItems = Array.isArray(selectedItems)
        ? selectedItems
        : [selectedItems].filter(Boolean);
    const singleSelectedItem = !multiple && selectedItems.length ? selectedItems[0] : null;
    const filteredItems = getFilteredItems(items, inputValue, selectedItems, getItemLabel);
    const { getSelectedItemProps, getDropdownProps, removeSelectedItem,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
     } = (0, downshift_1.useMultipleSelection)({ itemToString: getItemLabel, selectedItems });
    (0, element_1.useEffect)(() => {
        if (multiple) {
            return;
        }
        setInputValue(getItemLabel(singleSelectedItem));
    }, [getItemLabel, multiple, singleSelectedItem]);
    const { isOpen, getLabelProps, getMenuProps, getToggleButtonProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps, selectItem, 
    // @ts-expect-error We're allowed to use the property.
    selectedItem: comboboxSingleSelectedItem, openMenu, closeMenu, } = (0, downshift_1.useCombobox)({
        id: instanceId,
        initialSelectedItem: singleSelectedItem,
        inputValue,
        items: filteredItems,
        selectedItem: multiple ? null : singleSelectedItem,
        itemToString: getItemLabel,
        onSelectedItemChange: ({ selectedItem }) => {
            if (selectedItem) {
                onSelect(selectedItem);
            }
            else if (singleSelectedItem) {
                onRemove(singleSelectedItem);
            }
        },
        onInputValueChange: ({ inputValue: value, ...changes }) => {
            if (value !== undefined) {
                setInputValue(value);
                onInputChange(value, changes);
            }
        },
        // @ts-expect-error We're allowed to use the property.
        stateReducer: (state, actionAndChanges) => {
            const { changes, type } = actionAndChanges;
            let newChanges;
            switch (type) {
                case exports.selectControlStateChangeTypes.InputBlur:
                    // Set input back to selected item if there is a selected item, blank otherwise.
                    newChanges = {
                        ...changes,
                        selectedItem: !changes.inputValue?.length && !multiple
                            ? null
                            : changes.selectedItem,
                        inputValue: changes.selectedItem === state.selectedItem &&
                            changes.inputValue?.length &&
                            !multiple
                            ? getItemLabel(comboboxSingleSelectedItem)
                            : '',
                    };
                    break;
                case exports.selectControlStateChangeTypes.InputKeyDownEnter:
                case exports.selectControlStateChangeTypes.FunctionSelectItem:
                case exports.selectControlStateChangeTypes.ItemClick:
                    if (changes.selectedItem && multiple) {
                        newChanges = {
                            ...changes,
                            inputValue: '',
                        };
                    }
                    break;
                default:
                    break;
            }
            return stateReducer(state, {
                ...actionAndChanges,
                changes: newChanges ?? changes,
            });
        },
    });
    const isEventOutside = (event) => {
        const selectControlWrapperElement = selectControlWrapperRef.current;
        const menuElement = document.getElementById(`${instanceId}-menu`);
        const parentPopoverMenuElement = menuElement?.closest('.fincommerce-experimental-select-control__popover-menu');
        return (!selectControlWrapperElement?.contains(event.relatedTarget) &&
            !parentPopoverMenuElement?.contains(event.relatedTarget));
    };
    const onRemoveItem = (item) => {
        selectItem(null);
        removeSelectedItem(item);
        onRemove(item);
    };
    const isReadOnly = readOnlyWhenClosed && !isOpen && !isFocused;
    const selectedItemTags = multiple ? ((0, element_1.createElement)(selected_items_1.SelectedItems, { items: selectedItems, isReadOnly: isReadOnly, getItemLabel: getItemLabel, getItemValue: getItemValue, getSelectedItemProps: getSelectedItemProps, onRemove: onRemoveItem })) : null;
    return ((0, element_1.createElement)("div", { id: instanceId, ref: selectControlWrapperRef, className: (0, clsx_1.default)('fincommerce-experimental-select-control', className, {
            'is-read-only': isReadOnly,
            'is-focused': isFocused,
            'is-multiple': multiple,
            'has-selected-items': selectedItems.length,
        }) },
        label && ((0, element_1.createElement)("label", { ...getLabelProps(), className: "fincommerce-experimental-select-control__label" }, label)),
        (0, element_1.createElement)(combo_box_1.ComboBox, { comboBoxProps: getComboboxProps(), getToggleButtonProps: getToggleButtonProps, inputProps: getInputProps({
                ...getDropdownProps({
                    preventKeyAction: isOpen,
                }),
                className: innerInputClassName,
                onFocus: () => {
                    setIsFocused(true);
                    onFocus({ inputValue });
                    if (__experimentalOpenMenuOnFocus) {
                        openMenu();
                    }
                },
                onBlur: (event) => {
                    if (isEventOutside(event)) {
                        setIsFocused(false);
                        onBlur({ inputValue });
                    }
                },
                onKeyDown,
                placeholder,
                disabled,
                ...inputProps,
            }), suffix: suffix, showToggleButton: showToggleButton },
            (0, element_1.createElement)(element_1.Fragment, null,
                children({
                    items: filteredItems,
                    highlightedIndex,
                    getItemProps,
                    getMenuProps,
                    isOpen,
                    getItemLabel,
                    getItemValue,
                    selectItem,
                    setInputValue,
                    openMenu,
                    closeMenu,
                }),
                !hasExternalTags && selectedItemTags)),
        hasExternalTags && selectedItemTags));
}
