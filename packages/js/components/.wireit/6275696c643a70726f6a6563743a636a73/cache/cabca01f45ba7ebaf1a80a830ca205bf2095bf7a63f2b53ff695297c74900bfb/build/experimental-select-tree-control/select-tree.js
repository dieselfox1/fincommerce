"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectTree = void 0;
/**
 * External dependencies
 */
const icons_1 = require("@wordpress/icons");
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const compose_1 = require("@wordpress/compose");
const components_1 = require("@wordpress/components");
const html_entities_1 = require("@wordpress/html-entities");
const i18n_1 = require("@wordpress/i18n");
const a11y_1 = require("@wordpress/a11y");
/**
 * Internal dependencies
 */
const linked_tree_utils_1 = require("../experimental-tree-control/linked-tree-utils");
const selected_items_1 = require("../experimental-select-control/selected-items");
const combo_box_1 = require("../experimental-select-control/combo-box");
const suffix_icon_1 = require("../experimental-select-control/suffix-icon");
const select_tree_menu_1 = require("./select-tree-menu");
const utils_1 = require("../utils");
function isBlurEvent(event) {
    return event.type === 'blur';
}
const SelectTree = function SelectTree({ items, treeRef: ref, isLoading, disabled, initialInputValue, onInputChange, shouldShowCreateButton, help, isClearingAllowed = false, onClear = () => { }, ...props }) {
    const [linkedTree, setLinkedTree] = (0, element_1.useState)([]);
    const [highlightedIndex, setHighlightedIndex] = (0, element_1.useState)(-1);
    // whenever the items change, the linked tree needs to be recalculated
    (0, element_1.useEffect)(() => {
        setLinkedTree((0, linked_tree_utils_1.createLinkedTree)(items, props.createValue));
    }, [items.length]);
    // reset highlighted index when the input value changes
    (0, element_1.useEffect)(() => setHighlightedIndex(-1), [props.createValue]);
    const selectTreeInstanceId = (0, compose_1.useInstanceId)(SelectTree, 'fincommerce-experimental-select-tree-control__dropdown');
    const menuInstanceId = (0, compose_1.useInstanceId)(SelectTree, 'fincommerce-select-tree-control__menu');
    const selectedItemsFocusHandle = (0, element_1.useRef)(null);
    function isEventOutside(event) {
        let target = event.currentTarget;
        if (isBlurEvent(event)) {
            target = event.relatedTarget;
        }
        const isInsideSelect = document
            .getElementById(selectTreeInstanceId)
            ?.contains(target);
        const isInsidePopover = document
            .getElementById(menuInstanceId)
            ?.closest('.fincommerce-experimental-select-tree-control__popover-menu')
            ?.contains(target);
        const isInRemoveTag = target?.classList.contains('fincommerce-tag__remove');
        return !isInsideSelect && !isInRemoveTag && !isInsidePopover;
    }
    const recalculateInputValue = () => {
        if (onInputChange) {
            if (!props.multiple && props.selected) {
                onInputChange(props.selected.label);
            }
            else {
                onInputChange('');
            }
        }
    };
    const focusOnInput = () => {
        document.querySelector(`#${props.id}-input`)?.focus();
    };
    const [isFocused, setIsFocused] = (0, element_1.useState)(false);
    const [isOpen, setIsOpen] = (0, element_1.useState)(false);
    const [inputValue, setInputValue] = (0, element_1.useState)('');
    const isReadOnly = !isOpen && !isFocused;
    (0, element_1.useEffect)(() => {
        if (initialInputValue !== undefined && isFocused) {
            setInputValue(initialInputValue);
        }
    }, [isFocused]);
    // Scroll the newly highlighted item into view
    (0, element_1.useEffect)(() => document
        .querySelector('.experimental-fincommerce-tree-item--highlighted')
        ?.scrollIntoView?.({
        block: 'nearest',
    }), [highlightedIndex]);
    let placeholder = '';
    if (Array.isArray(props.selected)) {
        placeholder = props.selected.length === 0 ? props.placeholder : '';
    }
    else if (props.selected) {
        placeholder = props.placeholder;
    }
    // reset highlighted index when the input value changes
    (0, element_1.useEffect)(() => {
        if (highlightedIndex === items.length &&
            !shouldShowCreateButton?.(props.createValue)) {
            setHighlightedIndex(items.length - 1);
        }
    }, [props.createValue]);
    const inputProps = {
        className: 'fincommerce-experimental-select-control__input',
        id: `${props.id}-input`,
        'aria-autocomplete': 'list',
        'aria-activedescendant': highlightedIndex >= 0
            ? `fincommerce-experimental-tree-control__menu-item-${highlightedIndex}`
            : undefined,
        'aria-controls': menuInstanceId,
        'aria-owns': menuInstanceId,
        role: 'combobox',
        autoComplete: 'off',
        'aria-expanded': isOpen,
        'aria-haspopup': 'tree',
        disabled,
        onFocus: (event) => {
            if (props.multiple) {
                (0, a11y_1.speak)((0, i18n_1.__)('To select existing items, type its exact label and separate with commas or the Enter key.', 'fincommerce'));
            }
            if (!isOpen) {
                setIsOpen(true);
            }
            setIsFocused(true);
            if (Array.isArray(props.selected) &&
                props.selected?.some((item) => item.label === event.target.value)) {
                setInputValue('');
            }
        },
        onBlur: (event) => {
            event.preventDefault();
            if (isEventOutside(event)) {
                setIsOpen(false);
                setIsFocused(false);
                recalculateInputValue();
            }
        },
        onKeyDown: (event) => {
            setIsOpen(true);
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (
                // is advancing from the last menu item to the create button
                highlightedIndex === items.length - 1 &&
                    shouldShowCreateButton?.(props.createValue)) {
                    setHighlightedIndex(items.length);
                }
                else {
                    const visibleNodeIndex = (0, linked_tree_utils_1.getVisibleNodeIndex)(linkedTree, Math.min(highlightedIndex + 1, items.length), 'down');
                    if (visibleNodeIndex !== undefined) {
                        setHighlightedIndex(visibleNodeIndex);
                    }
                }
            }
            else if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (highlightedIndex > 0) {
                    const visibleNodeIndex = (0, linked_tree_utils_1.getVisibleNodeIndex)(linkedTree, Math.max(highlightedIndex - 1, -1), 'up');
                    if (visibleNodeIndex !== undefined) {
                        setHighlightedIndex(visibleNodeIndex);
                    }
                }
                else {
                    setHighlightedIndex(-1);
                }
            }
            else if (event.key === 'Tab' || event.key === 'Escape') {
                setIsOpen(false);
                recalculateInputValue();
            }
            else if (event.key === 'Enter' || event.key === ',') {
                event.preventDefault();
                if (highlightedIndex === items.length &&
                    shouldShowCreateButton) {
                    props.onCreateNew?.();
                }
                else if (
                // is selecting an item
                highlightedIndex !== -1) {
                    const nodeData = (0, linked_tree_utils_1.getNodeDataByIndex)(linkedTree, highlightedIndex);
                    if (!nodeData) {
                        return;
                    }
                    if (props.multiple && Array.isArray(props.selected)) {
                        if (!Boolean(props.selected.find((i) => i.label === nodeData.label))) {
                            if (props.onSelect) {
                                props.onSelect(nodeData);
                            }
                        }
                        else if (props.onRemove) {
                            props.onRemove(nodeData);
                        }
                        setInputValue('');
                    }
                    else {
                        onInputChange?.(nodeData.label);
                        props.onSelect?.(nodeData);
                        setIsOpen(false);
                        setIsFocused(false);
                        focusOnInput();
                    }
                }
                else if (inputValue) {
                    // no highlighted item, but there is an input value, check if it matches any item
                    const item = items.find((i) => i.label === (0, utils_1.escapeHTML)(inputValue));
                    const isAlreadySelected = Array.isArray(props.selected)
                        ? Boolean(props.selected.find((i) => i.label === (0, utils_1.escapeHTML)(inputValue)))
                        : props.selected?.label === (0, utils_1.escapeHTML)(inputValue);
                    if (item && !isAlreadySelected) {
                        props.onSelect?.(item);
                        setInputValue('');
                        recalculateInputValue();
                    }
                }
            }
            else if (event.key === 'Backspace' &&
                // test if the cursor is at the beginning of the input with nothing selected
                event.target.selectionStart === 0 &&
                event.target.selectionEnd === 0 &&
                selectedItemsFocusHandle.current) {
                selectedItemsFocusHandle.current();
            }
            else if (event.key === 'ArrowRight') {
                setLinkedTree((0, linked_tree_utils_1.toggleNode)(linkedTree, highlightedIndex, true));
            }
            else if (event.key === 'ArrowLeft') {
                setLinkedTree((0, linked_tree_utils_1.toggleNode)(linkedTree, highlightedIndex, false));
            }
            else if (event.key === 'Home') {
                event.preventDefault();
                setHighlightedIndex(0);
            }
            else if (event.key === 'End') {
                event.preventDefault();
                setHighlightedIndex(items.length - 1);
            }
        },
        onChange: (event) => {
            if (onInputChange) {
                onInputChange(event.target.value);
            }
            setInputValue(event.target.value);
        },
        placeholder,
        value: inputValue,
    };
    const handleClear = () => {
        if (isClearingAllowed) {
            onClear();
        }
    };
    return ((0, element_1.createElement)("div", { id: selectTreeInstanceId, className: `fincommerce-experimental-select-tree-control__dropdown`, tabIndex: -1 },
        (0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-experimental-select-control', {
                'is-read-only': isReadOnly,
                'is-focused': isFocused,
                'is-multiple': props.multiple,
                'has-selected-items': Array.isArray(props.selected) &&
                    props.selected.length,
            }) },
            (0, element_1.createElement)(components_1.BaseControl, { label: props.label, id: `${props.id}-input`, help: props.multiple && !help
                    ? (0, i18n_1.__)('Separate with commas or the Enter key.', 'fincommerce')
                    : help },
                (0, element_1.createElement)(element_1.Fragment, null,
                    props.multiple ? ((0, element_1.createElement)(combo_box_1.ComboBox, { comboBoxProps: {
                            className: 'fincommerce-experimental-select-control__combo-box-wrapper',
                        }, inputProps: inputProps, suffix: (0, element_1.createElement)("div", { className: "fincommerce-experimental-select-control__suffix-items" },
                            isClearingAllowed && isOpen && ((0, element_1.createElement)(components_1.Button, { label: (0, i18n_1.__)('Remove all', 'fincommerce'), onClick: handleClear },
                                (0, element_1.createElement)(suffix_icon_1.SuffixIcon, { className: "fincommerce-experimental-select-control__icon-clear", icon: icons_1.closeSmall }))),
                            (0, element_1.createElement)(suffix_icon_1.SuffixIcon, { icon: isOpen ? icons_1.chevronUp : icons_1.chevronDown })) },
                        (0, element_1.createElement)(selected_items_1.SelectedItems, { isReadOnly: isReadOnly, ref: selectedItemsFocusHandle, items: !Array.isArray(props.selected)
                                ? [props.selected]
                                : props.selected, getItemLabel: (item) => item?.label || '', getItemValue: (item) => item?.value || '', onRemove: (item) => {
                                if (item &&
                                    !Array.isArray(item) &&
                                    props.onRemove) {
                                    props.onRemove(item);
                                }
                            }, onBlur: (event) => {
                                if (isEventOutside(event)) {
                                    setIsOpen(false);
                                    setIsFocused(false);
                                }
                            }, onSelectedItemsEnd: focusOnInput, getSelectedItemProps: () => ({}) }))) : ((0, element_1.createElement)(components_1.TextControl, { ...inputProps, value: (0, html_entities_1.decodeEntities)(props.createValue || ''), onChange: (value) => {
                            if (onInputChange)
                                onInputChange(value);
                            const item = items.find((i) => i.label === (0, utils_1.escapeHTML)(value));
                            if (props.onSelect && item) {
                                props.onSelect(item);
                            }
                            if (!value && props.onRemove) {
                                props.onRemove(props.selected);
                            }
                        } })),
                    (0, element_1.createElement)(select_tree_menu_1.SelectTreeMenu, { ...props, onSelect: (item) => {
                            if (!props.multiple && onInputChange) {
                                onInputChange(item.label);
                                setIsOpen(false);
                                setIsFocused(false);
                                focusOnInput();
                            }
                            if (props.onSelect) {
                                props.onSelect(item);
                            }
                        }, id: menuInstanceId, ref: ref, isEventOutside: isEventOutside, isLoading: isLoading, isOpen: isOpen, highlightedIndex: highlightedIndex, onExpand: (index, value) => {
                            setLinkedTree((0, linked_tree_utils_1.toggleNode)(linkedTree, index, value));
                        }, items: linkedTree, shouldShowCreateButton: shouldShowCreateButton, onEscape: () => {
                            focusOnInput();
                            setIsOpen(false);
                        }, onClose: () => {
                            setIsOpen(false);
                        }, onFirstItemLoop: focusOnInput }))))));
};
exports.SelectTree = SelectTree;
