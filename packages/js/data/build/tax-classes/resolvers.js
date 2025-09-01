"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaxClasses = getTaxClasses;
/**
 * Internal dependencies
 */
const actions_1 = require("../crud/actions");
const utils_1 = require("../crud/utils");
const utils_2 = require("../utils");
const constants_1 = require("./constants");
function* getTaxClasses(query) {
    const urlParameters = (0, utils_1.getUrlParameters)(constants_1.WC_TAX_CLASSES_NAMESPACE, query || {});
    const resourceQuery = (0, utils_1.cleanQuery)(query || {}, constants_1.WC_TAX_CLASSES_NAMESPACE);
    try {
        const path = (0, utils_1.getRestPath)(constants_1.WC_TAX_CLASSES_NAMESPACE, query || {}, urlParameters);
        const { items } = yield (0, utils_2.request)(path, resourceQuery);
        yield (0, actions_1.getItemsTotalCountSuccess)(query, items.length);
        yield (0, actions_1.getItemsSuccess)(query, items.map((item) => ({ ...item, id: item.id ?? item.slug })), urlParameters);
        return items;
    }
    catch (error) {
        yield (0, actions_1.getItemsTotalCountError)(query, error);
        yield (0, actions_1.getItemsError)(query, error);
        throw error;
    }
}
