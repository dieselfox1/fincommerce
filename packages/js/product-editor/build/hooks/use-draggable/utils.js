"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDraggableIndex = findDraggableIndex;
exports.sort = sort;
function findDraggableIndex(draggableElements, element) {
    const index = draggableElements.findIndex((child) => child === element || child.contains(element));
    return {
        draggable: index >= 0 ? draggableElements[index] : undefined,
        index,
    };
}
function sort(items, currentIndex, newIndex) {
    const currentItem = items[currentIndex];
    const newItems = items.reduce((current, item, index) => {
        if (index !== currentIndex) {
            if (index === newIndex) {
                current.push(currentItem);
            }
            current.push(item);
        }
        return current;
    }, []);
    if (newIndex >= items.length) {
        newItems.push(currentItem);
    }
    return newItems;
}
