"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderSuccess = getOrderSuccess;
exports.getOrderError = getOrderError;
exports.getOrdersSuccess = getOrdersSuccess;
exports.getOrdersError = getOrdersError;
exports.getOrdersTotalCountSuccess = getOrdersTotalCountSuccess;
exports.getOrdersTotalCountError = getOrdersTotalCountError;
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
function getOrderSuccess(id, order) {
    return {
        type: action_types_1.default.GET_ORDER_SUCCESS,
        id,
        order,
    };
}
function getOrderError(query, error) {
    return {
        type: action_types_1.default.GET_ORDER_ERROR,
        query,
        error,
    };
}
function getOrdersSuccess(query, orders, totalCount) {
    return {
        type: action_types_1.default.GET_ORDERS_SUCCESS,
        orders,
        query,
        totalCount,
    };
}
function getOrdersError(query, error) {
    return {
        type: action_types_1.default.GET_ORDERS_ERROR,
        query,
        error,
    };
}
function getOrdersTotalCountSuccess(query, totalCount) {
    return {
        type: action_types_1.default.GET_ORDERS_TOTAL_COUNT_SUCCESS,
        query,
        totalCount,
    };
}
function getOrdersTotalCountError(query, error) {
    return {
        type: action_types_1.default.GET_ORDERS_TOTAL_COUNT_ERROR,
        query,
        error,
    };
}
