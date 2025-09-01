import { DragEvent } from 'react';
/**
 * Move an item from an index in an array to a new index.s
 *
 * @param fromIndex Index to move the item from.
 * @param toIndex   Index to move the item to.
 * @param arr       The array to copy.
 * @return array
 */
export declare const moveIndex: <T>(fromIndex: number, toIndex: number, arr: T[]) => T[];
/**
 * Check whether the mouse is over the first half of the event target.
 *
 * @param event        Drag event.
 * @param isHorizontal Check horizontally or vertically.
 * @return boolean
 */
export declare const isBefore: (event: DragEvent<HTMLDivElement>, isHorizontal?: boolean) => boolean;
export declare const isDraggingOverAfter: (index: number, dragIndex: number | null, dropIndex: number | null) => boolean;
export declare const isDraggingOverBefore: (index: number, dragIndex: number | null, dropIndex: number | null) => boolean;
export declare const isLastDroppable: (index: number, dragIndex: number | null, itemCount: number) => boolean;
export declare const getNextIndex: (currentIndex: number, itemCount: number) => number;
export declare const getPreviousIndex: (currentIndex: number, itemCount: number) => number;
export declare const getItemName: (parentNode: HTMLDivElement | null, index: number) => string | null | undefined;
//# sourceMappingURL=utils.d.ts.map