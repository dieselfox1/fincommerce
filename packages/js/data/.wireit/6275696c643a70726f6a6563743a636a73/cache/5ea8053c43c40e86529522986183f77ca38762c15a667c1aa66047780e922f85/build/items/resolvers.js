"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = getItems;
exports.getItemsTotalCount = getItemsTotalCount;
exports.getReviewsTotalCount = getReviewsTotalCount;
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const actions_1 = require("./actions");
const utils_1 = require("../utils");
function* getItems(itemType, query) {
    try {
        const endpoint = itemType === 'categories' ? 'products/categories' : itemType;
        const { items, totalCount } = yield (0, utils_1.request)(`${constants_1.NAMESPACE}/${endpoint}`, query);
        yield (0, actions_1.setItemsTotalCount)(itemType, query, totalCount);
        yield (0, actions_1.setItems)(itemType, query, items);
    }
    catch (error) {
        yield (0, actions_1.setError)(itemType, query, error);
    }
}
function* getItemsTotalCount(itemType, query) {
    try {
        const totalsQuery = {
            ...query,
            page: 1,
            per_page: 1,
        };
        const endpoint = itemType === 'categories' ? 'products/categories' : itemType;
        const { totalCount } = yield (0, utils_1.request)(`${constants_1.NAMESPACE}/${endpoint}`, totalsQuery);
        yield (0, actions_1.setItemsTotalCount)(itemType, query, totalCount);
    }
    catch (error) {
        yield (0, actions_1.setError)(itemType, query, error);
    }
}
function* getReviewsTotalCount(itemType, query) {
    yield getItemsTotalCount(itemType, query);
}
