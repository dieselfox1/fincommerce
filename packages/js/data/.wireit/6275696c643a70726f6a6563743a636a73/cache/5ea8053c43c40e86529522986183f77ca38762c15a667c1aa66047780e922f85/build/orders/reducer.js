"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const utils_1 = require("./utils");
const reducer = (state = {
    orders: {},
    ordersCount: {},
    errors: {},
    data: {},
}, payload) => {
    if (payload && 'type' in payload) {
        switch (payload.type) {
            case action_types_1.default.GET_ORDER_SUCCESS:
                const orderData = state.data || {};
                return {
                    ...state,
                    data: {
                        ...orderData,
                        [payload.id]: {
                            ...(orderData[payload.id] || {}),
                            ...payload.order,
                        },
                    },
                };
            case action_types_1.default.GET_ORDERS_SUCCESS:
                const ids = [];
                const nextOrders = payload.orders.reduce((result, order) => {
                    ids.push(order.id);
                    result[order.id] = {
                        ...(state.data[order.id] || {}),
                        ...order,
                    };
                    return result;
                }, {});
                const resourceName = (0, utils_1.getOrderResourceName)(payload.query);
                return {
                    ...state,
                    orders: {
                        ...state.orders,
                        [resourceName]: { data: ids },
                    },
                    data: {
                        ...state.data,
                        ...nextOrders,
                    },
                };
            case action_types_1.default.GET_ORDERS_TOTAL_COUNT_SUCCESS:
                const totalResourceName = (0, utils_1.getTotalOrderCountResourceName)(payload.query);
                return {
                    ...state,
                    ordersCount: {
                        ...state.ordersCount,
                        [totalResourceName]: payload.totalCount,
                    },
                };
            case action_types_1.default.GET_ORDER_ERROR:
            case action_types_1.default.GET_ORDERS_ERROR:
            case action_types_1.default.GET_ORDERS_TOTAL_COUNT_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [(0, utils_1.getOrderResourceName)(payload.query)]: payload.error,
                    },
                };
            default:
                return state;
        }
    }
    return state;
};
exports.default = reducer;
