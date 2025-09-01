/**
 * External dependencies
 */
import clsx from 'clsx';
import { useCombobox, useMultipleSelection, } from 'downshift';
import { useInstanceId } from '@wordpress/compose';
import { useState, useEffect, createElement, Fragment, useRef, } from '@wordpress/element';
import { chevronDown } from '@wordpress/icons';
import { SelectedItems } from './selected-items';
import { ComboBox } from './combo-box';
import { Menu } from './menu';
import { MenuItem } from './menu-item';
import { SuffixIcon } from './suffix-icon';
import { defaultGetItemLabel, defaultGetItemValue, defaultGetFilteredItems, } from './utils';
export const selectControlStateChangeTypes = useCombobox.stateChangeTypes;
function SelectControl({ getItemLabel = defaultGetItemLabel, getItemValue = defaultGetItemValue, hasExternalTags = false, children = ({ items: renderItems, highlightedIndex, getItemProps, getMenuProps, isOpen, }) => {
    return (createElement(Menu, { getMenuProps: getMenuProps, isOpen: isOpen }, renderItems.map((item, index) => (createElement(MenuItem, { key: `${getItemValue(item)}${index}`, index: index, isActive: highlightedIndex === index, item: item, getItemProps: getItemProps }, getItemLabel(item))))));
}, multiple = false, items, label, getFilteredItems = defaultGetFilteredItems, onInputChange = () => null, onRemove = () => null, onSelect = () => null, onFocus = () => null, onBlur = () => null, onKeyDown = () => null, stateReducer = (state, actionAndChanges) => actionAndChanges.changes, placeholder, selected, className, disabled, inputProps = {}, suffix = createElement(SuffixIcon, { icon: chevronDown }), showToggleButton = false, readOnlyWhenClosed = true, __experimentalOpenMenuOnFocus = false, }) {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const instanceId = useInstanceId(SelectControl, 'fincommerce-experimental-select-control');
    const innerInputClassName = 'fincommerce-experimental-select-control__input';
    const selectControlWrapperRef = useRef(null);
    let selectedItems = selected === null ? [] : selected;
    selectedItems = Array.isArray(selectedItems)
        ? selectedItems
        : [selectedItems].filter(Boolean);
    const singleSelectedItem = !multiple && selectedItems.length ? selectedItems[0] : null;
    const filteredItems = getFilteredItems(items, inputValue, selectedItems, getItemLabel);
    const { getSelectedItemProps, getDropdownProps, removeSelectedItem,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
     } = useMultipleSelection({ itemToString: getItemLabel, selectedItems });
    useEffect(() => {
        if (multiple) {
            return;
        }
        setInputValue(getItemLabel(singleSelectedItem));
    }, [getItemLabel, multiple, singleSelectedItem]);
    const { isOpen, getLabelProps, getMenuProps, getToggleButtonProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps, selectItem, 
    // @ts-expect-error We're allowed to use the property.
    selectedItem: comboboxSingleSelectedItem, openMenu, closeMenu, } = useCombobox({
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
                case selectControlStateChangeTypes.InputBlur:
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
                case selectControlStateChangeTypes.InputKeyDownEnter:
                case selectControlStateChangeTypes.FunctionSelectItem:
                case selectControlStateChangeTypes.ItemClick:
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
    const selectedItemTags = multiple ? (createElement(SelectedItems, { items: selectedItems, isReadOnly: isReadOnly, getItemLabel: getItemLabel, getItemValue: getItemValue, getSelectedItemProps: getSelectedItemProps, onRemove: onRemoveItem })) : null;
    return (createElement("div", { id: instanceId, ref: selectControlWrapperRef, className: clsx('fincommerce-experimental-select-control', className, {
            'is-read-only': isReadOnly,
            'is-focused': isFocused,
            'is-multiple': multiple,
            'has-selected-items': selectedItems.length,
        }) },
        label && (createElement("label", { ...getLabelProps(), className: "fincommerce-experimental-select-control__label" }, label)),
        createElement(ComboBox, { comboBoxProps: getComboboxProps(), getToggleButtonProps: getToggleButtonProps, inputProps: getInputProps({
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
            createElement(Fragment, null,
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
export { SelectControl };
