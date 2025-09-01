"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTreeItem = useTreeItem;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const use_expander_1 = require("./use-expander");
const use_highlighter_1 = require("./use-highlighter");
const use_keyboard_1 = require("./use-keyboard");
const use_selection_1 = require("./use-selection");
function useTreeItem({ item, level, multiple, shouldNotRecursivelySelect, selected, index, getLabel, shouldItemBeExpanded, shouldItemBeHighlighted, onSelect, onRemove, isExpanded, onCreateNew, shouldShowCreateButton, onLastItemLoop, onFirstItemLoop, onTreeBlur, onEscape, highlightedIndex, isHighlighted, onExpand, ...props }) {
    const nextLevel = level + 1;
    const expander = (0, use_expander_1.useExpander)({
        item,
        shouldItemBeExpanded,
    });
    const selection = (0, use_selection_1.useSelection)({
        item,
        multiple,
        selected,
        level,
        index,
        onSelect,
        onRemove,
        shouldNotRecursivelySelect,
    });
    const highlighter = (0, use_highlighter_1.useHighlighter)({
        item,
        checkedStatus: selection.checkedStatus,
        multiple,
        shouldItemBeHighlighted,
    });
    const subTreeId = `experimental-fincommerce-tree__group-${(0, compose_1.useInstanceId)(useTreeItem)}`;
    const { onKeyDown } = (0, use_keyboard_1.useKeyboard)({
        ...expander,
        onLastItemLoop,
        onFirstItemLoop,
        item,
    });
    return {
        item,
        level: nextLevel,
        expander,
        selection,
        highlighter,
        getLabel,
        treeItemProps: {
            ...props,
            id: 'fincommerce-experimental-tree-control__menu-item-' +
                item.index,
            role: 'option',
        },
        headingProps: {
            role: 'treeitem',
            'aria-selected': selection.checkedStatus !== 'unchecked',
            'aria-expanded': item.children.length
                ? item.data.isExpanded
                : undefined,
            'aria-owns': item.children.length && item.data.isExpanded
                ? subTreeId
                : undefined,
            style: {
                '--level': level,
            },
            onKeyDown,
        },
        treeProps: {
            id: subTreeId,
            items: item.children,
            level: nextLevel,
            multiple: selection.multiple,
            selected: selection.selected,
            role: 'group',
            'aria-label': item.data.label,
            getItemLabel: getLabel,
            shouldItemBeExpanded,
            shouldItemBeHighlighted,
            shouldNotRecursivelySelect,
            onSelect: selection.onSelectChildren,
            onRemove: selection.onRemoveChildren,
        },
    };
}
