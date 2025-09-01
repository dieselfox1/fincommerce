"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = getOrders;
exports.getOrdersTotalCount = getOrdersTotalCount;
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
const actions_1 = require("./actions");
const utils_1 = require("../utils");
function* getOrders(query) {
    // id is always required.
    const ordersQuery = {
        ...query,
    };
    if (ordersQuery &&
        ordersQuery._fields &&
        !ordersQuery._fields.includes('id')) {
        ordersQuery._fields = ['id', ...ordersQuery._fields];
    }
    try {
        const { items, totalCount } = yield (0, utils_1.request)(constants_1.WC_ORDERS_NAMESPACE, ordersQuery);
        yield (0, actions_1.getOrdersTotalCountSuccess)(query, totalCount);
        yield (0, actions_1.getOrdersSuccess)(query, items, totalCount);
        return items;
    }
    catch (error) {
        yield (0, actions_1.getOrdersError)(query, error);
        return error;
    }
}
function* getOrdersTotalCount(query) {
    try {
        const totalsQuery = {
            ...query,
            page: 1,
            per_page: 1,
        };
        const { totalCount } = yield (0, utils_1.request)(constants_1.WC_ORDERS_NAMESPACE, totalsQuery);
        yield (0, actions_1.getOrdersTotalCountSuccess)(query, totalCount);
        return totalCount;
    }
    catch (error) {
        yield (0, actions_1.getOrdersTotalCountError)(query, error);
        return error;
    }
}
