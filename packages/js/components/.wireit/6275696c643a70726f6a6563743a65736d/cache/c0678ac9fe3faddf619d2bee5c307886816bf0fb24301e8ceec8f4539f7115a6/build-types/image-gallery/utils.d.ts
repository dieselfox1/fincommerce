/**
 * Remove the item with the selected index from an array of items.
 *
 * @param items       The array to remove the item from.
 * @param removeIndex Index to remove.
 * @return array
 */
export declare const removeItem: <T>(items: T[], removeIndex: number) => T[];
/**
 * Replace the React Element with given index with specific props.
 *
 * @param items        The initial array to operate on.
 * @param replaceIndex Index to remove.
 * @return array
 */
export declare const replaceItem: <T extends Record<string, unknown>>(items: JSX.Element[], replaceIndex: number, newProps: T) => JSX.Element[];
//# sourceMappingURL=utils.d.ts.map