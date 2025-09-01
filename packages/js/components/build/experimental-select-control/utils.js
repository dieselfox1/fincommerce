"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultGetFilteredItems = exports.defaultGetItemValue = exports.defaultGetItemLabel = void 0;
function isDefaultItemType(item) {
    return (Boolean(item) &&
        item.label !== undefined &&
        item.value !== undefined);
}
const defaultGetItemLabel = (item) => {
    if (isDefaultItemType(item)) {
        return item.label;
    }
    return '';
};
exports.defaultGetItemLabel = defaultGetItemLabel;
const defaultGetItemValue = (item) => {
    if (isDefaultItemType(item)) {
        return item.value;
    }
    return '';
};
exports.defaultGetItemValue = defaultGetItemValue;
const defaultGetFilteredItems = (allItems, inputValue, selectedItems, getItemLabel) => {
    const escapedInputValue = inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(escapedInputValue, 'gi');
    return allItems.filter((item) => {
        return (selectedItems.indexOf(item) < 0 &&
            re.test(getItemLabel(item).toLowerCase()));
    });
};
exports.defaultGetFilteredItems = defaultGetFilteredItems;
