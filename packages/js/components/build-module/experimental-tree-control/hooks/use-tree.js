/**
 * External dependencies
 */
export function useTree({ items, level = 1, role = 'listbox', multiple, selected, getItemLabel, shouldItemBeExpanded, shouldItemBeHighlighted, onSelect, onRemove, shouldNotRecursivelySelect, createValue, onTreeBlur, onCreateNew, shouldShowCreateButton, onFirstItemLoop, onEscape, highlightedIndex, onExpand, ...props }) {
    return {
        level,
        items,
        treeProps: {
            ...props,
            role,
        },
        treeItemProps: {
            level,
            multiple,
            selected,
            getLabel: getItemLabel,
            shouldItemBeExpanded,
            shouldItemBeHighlighted,
            shouldNotRecursivelySelect,
            onSelect,
            onRemove,
        },
    };
}
