"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOrdering = void 0;
/**
 * Parse an array of items into an ordering object.
 *
 * @param items - The items to parse.
 * @return The ordering object.
 */
const parseOrdering = (items) => {
    return items.reduce((acc, item, index) => {
        return { ...acc, [item.id]: index };
    }, {});
};
exports.parseOrdering = parseOrdering;
