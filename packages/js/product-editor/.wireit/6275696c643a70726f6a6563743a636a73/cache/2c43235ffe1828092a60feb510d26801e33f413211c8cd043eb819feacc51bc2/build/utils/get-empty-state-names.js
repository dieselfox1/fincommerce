"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyStateSequentialNames = getEmptyStateSequentialNames;
/**
 * Generates an array of sequentially numbered strings in the format "string number".
 *
 * @param name   The base string to be used.
 * @param number The number of times the string should be repeated with an incremented number.
 * @return An array of formatted strings.
 */
function getEmptyStateSequentialNames(name, number) {
    return Array(number)
        .fill(0)
        .map((_, index) => `${name} ${index + 1}`);
}
