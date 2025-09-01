"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelection = useSelection;
/**
 * External dependencies
 */
const react_1 = require("react");
let selectedItemsMap = {};
let indeterminateMemo = {};
function getDeepChildren(item) {
    if (item.children.length) {
        const children = item.children.map(({ data }) => data);
        item.children.forEach((child) => {
            children.push(...getDeepChildren(child));
        });
        return children;
    }
    return [];
}
function isIndeterminate(selectedItems, children, memo = indeterminateMemo) {
    if (children?.length) {
        for (const child of children) {
            if (child.data.value in indeterminateMemo) {
                return true;
            }
            const isChildSelected = child.data.value in selectedItems;
            if (!isChildSelected ||
                isIndeterminate(selectedItems, child.children, memo)) {
                indeterminateMemo[child.data.value] = true;
                return true;
            }
        }
    }
    return false;
}
function mapSelectedItems(selected = []) {
    const selectedArray = Array.isArray(selected) ? selected : [selected];
    return selectedArray.reduce((map, selectedItem, index) => ({
        ...map,
        [selectedItem.value]: index,
    }), {});
}
function hasSelectedSibblingChildren(children, values, selectedItems) {
    return children.some((child) => {
        const isChildSelected = child.data.value in selectedItems;
        if (!isChildSelected)
            return false;
        return !values.some((childValue) => childValue.value === child.data.value);
    });
}
function useSelection({ item, multiple, shouldNotRecursivelySelect, selected, level, index, onSelect, onRemove, }) {
    const selectedItems = (0, react_1.useMemo)(() => {
        if (level === 1 && index === 0) {
            selectedItemsMap = mapSelectedItems(selected);
            indeterminateMemo = {};
        }
        return selectedItemsMap;
    }, [selected, level, index]);
    const checkedStatus = (0, react_1.useMemo)(() => {
        if (item.data.value in selectedItems) {
            if (multiple &&
                !shouldNotRecursivelySelect &&
                isIndeterminate(selectedItems, item.children)) {
                return 'indeterminate';
            }
            return 'checked';
        }
        return 'unchecked';
    }, [selectedItems, item, multiple]);
    function onSelectChild(checked) {
        let value = item.data;
        if (multiple) {
            value = [item.data];
            if (item.children.length && !shouldNotRecursivelySelect) {
                value.push(...getDeepChildren(item));
            }
        }
        if (checked) {
            if (typeof onSelect === 'function') {
                onSelect(value);
            }
        }
        else if (typeof onRemove === 'function') {
            onRemove(value);
        }
    }
    function onSelectChildren(value) {
        if (typeof onSelect !== 'function')
            return;
        if (multiple && !shouldNotRecursivelySelect) {
            value = [item.data, ...value];
        }
        onSelect(value);
    }
    function onRemoveChildren(value) {
        if (typeof onRemove !== 'function')
            return;
        if (multiple &&
            item.children?.length &&
            !shouldNotRecursivelySelect) {
            const hasSelectedSibbling = hasSelectedSibblingChildren(item.children, value, selectedItems);
            if (!hasSelectedSibbling) {
                value = [item.data, ...value];
            }
        }
        onRemove(value);
    }
    return {
        multiple,
        selected,
        checkedStatus,
        onSelectChild,
        onSelectChildren,
        onRemoveChildren,
    };
}
