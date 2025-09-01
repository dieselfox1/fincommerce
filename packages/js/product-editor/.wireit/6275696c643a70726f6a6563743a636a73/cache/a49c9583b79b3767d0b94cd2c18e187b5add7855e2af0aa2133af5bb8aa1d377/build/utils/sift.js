"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sift = void 0;
/**
 * Similar to filter, but return two arrays separated by a partitioner function
 *
 * @param {Array}    arr         - Original array of values.
 * @param {Function} partitioner - Function to return truthy/falsy values to separate items in array.
 *
 * @return {Array} - Array of two arrays, first including truthy values, and second including falsy.
 */
const sift = (arr, partitioner) => arr.reduce((all, item) => {
    all[!!partitioner(item) ? 0 : 1].push(item);
    return all;
}, [[], []]);
exports.sift = sift;
