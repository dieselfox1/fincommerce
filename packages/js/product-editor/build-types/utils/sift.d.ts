type SiftResult<T> = [T[], T[]];
/**
 * Similar to filter, but return two arrays separated by a partitioner function
 *
 * @param {Array}    arr         - Original array of values.
 * @param {Function} partitioner - Function to return truthy/falsy values to separate items in array.
 *
 * @return {Array} - Array of two arrays, first including truthy values, and second including falsy.
 */
export declare const sift: <T>(arr: Array<T>, partitioner: (item: T) => boolean) => SiftResult<T>;
export {};
//# sourceMappingURL=sift.d.ts.map