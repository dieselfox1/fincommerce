/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Move an item from an index in an array to a new index.s
 *
 * @param fromIndex Index to move the item from.
 * @param toIndex   Index to move the item to.
 * @param arr       The array to copy.
 * @return array
 */
export const moveIndex = (fromIndex, toIndex, arr) => {
    const newArr = [...arr];
    const item = arr[fromIndex];
    newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, item);
    return newArr;
};
/**
 * Check whether the mouse is over the first half of the event target.
 *
 * @param event        Drag event.
 * @param isHorizontal Check horizontally or vertically.
 * @return boolean
 */
export const isBefore = (event, isHorizontal = false) => {
    const target = event.target;
    if (isHorizontal) {
        const middle = target.offsetWidth / 2;
        const rect = target.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        return relativeX < middle;
    }
    const middle = target.offsetHeight / 2;
    const rect = target.getBoundingClientRect();
    const relativeY = event.clientY - rect.top;
    return relativeY < middle;
};
export const isDraggingOverAfter = (index, dragIndex, dropIndex) => {
    if (dragIndex === null) {
        return false;
    }
    if (dragIndex < index) {
        return dropIndex === index;
    }
    return dropIndex === index + 1;
};
export const isDraggingOverBefore = (index, dragIndex, dropIndex) => {
    if (dragIndex === null) {
        return false;
    }
    if (dragIndex < index) {
        return dropIndex === index - 1;
    }
    return dropIndex === index;
};
export const isLastDroppable = (index, dragIndex, itemCount) => {
    if (dragIndex === index) {
        return false;
    }
    if (index === itemCount - 1) {
        return true;
    }
    if (dragIndex === itemCount - 1 && index === itemCount - 2) {
        return true;
    }
    return false;
};
export const getNextIndex = (currentIndex, itemCount) => {
    let index = currentIndex + 1;
    if (index > itemCount - 1) {
        index = 0;
    }
    return index;
};
export const getPreviousIndex = (currentIndex, itemCount) => {
    let index = currentIndex - 1;
    if (index < 0) {
        index = itemCount - 1;
    }
    return index;
};
export const getItemName = (parentNode, index) => {
    const listItemNode = parentNode?.childNodes[index];
    if (index === null || !listItemNode) {
        return null;
    }
    if (listItemNode.querySelector('[aria-label]')) {
        return listItemNode.querySelector('[aria-label]')?.ariaLabel;
    }
    if (listItemNode.textContent) {
        return listItemNode.textContent;
    }
    if (listItemNode.querySelector('[alt]')) {
        return listItemNode.querySelector('[alt]')
            .alt;
    }
    return __('Item', 'fincommerce');
};
