"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDispatchActions = void 0;
exports.createItemError = createItemError;
exports.createItemRequest = createItemRequest;
exports.createItemSuccess = createItemSuccess;
exports.deleteItemError = deleteItemError;
exports.deleteItemRequest = deleteItemRequest;
exports.deleteItemSuccess = deleteItemSuccess;
exports.getItemError = getItemError;
exports.getItemSuccess = getItemSuccess;
exports.getItemsError = getItemsError;
exports.getItemsSuccess = getItemsSuccess;
exports.getItemsTotalCountSuccess = getItemsTotalCountSuccess;
exports.getItemsTotalCountError = getItemsTotalCountError;
exports.updateItemError = updateItemError;
exports.updateItemRequest = updateItemRequest;
exports.updateItemSuccess = updateItemSuccess;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const crud_actions_1 = __importDefault(require("./crud-actions"));
const action_types_1 = __importDefault(require("./action-types"));
function createItemError(query, error) {
    return {
        type: action_types_1.default.CREATE_ITEM_ERROR,
        query,
        error,
        errorType: crud_actions_1.default.CREATE_ITEM,
    };
}
function createItemRequest(query) {
    return {
        type: action_types_1.default.CREATE_ITEM_REQUEST,
        query,
    };
}
function createItemSuccess(key, item, query, options) {
    return {
        type: action_types_1.default.CREATE_ITEM_SUCCESS,
        key,
        item,
        query,
        options,
    };
}
function deleteItemError(key, error, force) {
    return {
        type: action_types_1.default.DELETE_ITEM_ERROR,
        key,
        error,
        errorType: crud_actions_1.default.DELETE_ITEM,
        force,
    };
}
function deleteItemRequest(key, force) {
    return {
        type: action_types_1.default.DELETE_ITEM_REQUEST,
        key,
        force,
    };
}
function deleteItemSuccess(key, force, item) {
    return {
        type: action_types_1.default.DELETE_ITEM_SUCCESS,
        key,
        force,
        item,
    };
}
function getItemError(key, error) {
    return {
        type: action_types_1.default.GET_ITEM_ERROR,
        key,
        error,
        errorType: crud_actions_1.default.GET_ITEM,
    };
}
function getItemSuccess(key, item) {
    return {
        type: action_types_1.default.GET_ITEM_SUCCESS,
        key,
        item,
    };
}
function getItemsError(query, error) {
    return {
        type: action_types_1.default.GET_ITEMS_ERROR,
        query,
        error,
        errorType: crud_actions_1.default.GET_ITEMS,
    };
}
function getItemsSuccess(query, items, urlParameters) {
    return {
        type: action_types_1.default.GET_ITEMS_SUCCESS,
        items,
        query,
        urlParameters,
    };
}
function getItemsTotalCountSuccess(query, totalCount) {
    return {
        type: action_types_1.default.GET_ITEMS_TOTAL_COUNT_SUCCESS,
        query,
        totalCount,
    };
}
function getItemsTotalCountError(query, error) {
    return {
        type: action_types_1.default.GET_ITEMS_TOTAL_COUNT_ERROR,
        query,
        error,
        errorType: crud_actions_1.default.GET_ITEMS_TOTAL_COUNT,
    };
}
function updateItemError(key, error, query) {
    return {
        type: action_types_1.default.UPDATE_ITEM_ERROR,
        key,
        error,
        errorType: crud_actions_1.default.UPDATE_ITEM,
        query,
    };
}
function updateItemRequest(key, query) {
    return {
        type: action_types_1.default.UPDATE_ITEM_REQUEST,
        key,
        query,
    };
}
function updateItemSuccess(key, item, query) {
    return {
        type: action_types_1.default.UPDATE_ITEM_SUCCESS,
        key,
        item,
        query,
    };
}
const createDispatchActions = ({ namespace, resourceName, }) => {
    const createItem = function* (query, options) {
        yield createItemRequest(query);
        const urlParameters = (0, utils_1.getUrlParameters)(namespace, query);
        try {
            const item = yield (0, data_controls_1.apiFetch)({
                path: (0, utils_1.getRestPath)(namespace, (0, utils_1.cleanQuery)(query, namespace), urlParameters),
                method: 'POST',
            });
            const { key } = (0, utils_1.parseId)(item.id, urlParameters);
            yield createItemSuccess(key, item, query, options);
            return item;
        }
        catch (error) {
            yield createItemError(query, error);
            throw error;
        }
    };
    const deleteItem = function* (idQuery, force = true) {
        const urlParameters = (0, utils_1.getUrlParameters)(namespace, idQuery);
        const { id, key } = (0, utils_1.parseId)(idQuery, urlParameters);
        yield deleteItemRequest(key, force);
        try {
            const item = yield (0, data_controls_1.apiFetch)({
                path: (0, utils_1.getRestPath)(`${namespace}/${id}`, { force }, urlParameters),
                method: 'DELETE',
            });
            yield deleteItemSuccess(key, force, item);
            return item;
        }
        catch (error) {
            yield deleteItemError(key, error, force);
            throw error;
        }
    };
    const updateItem = function* (idQuery, query) {
        const urlParameters = (0, utils_1.getUrlParameters)(namespace, idQuery);
        const { id, key } = (0, utils_1.parseId)(idQuery, urlParameters);
        yield updateItemRequest(key, query);
        try {
            const item = yield (0, data_controls_1.apiFetch)({
                path: (0, utils_1.getRestPath)(`${namespace}/${id}`, {}, urlParameters),
                method: 'PUT',
                data: query,
            });
            yield updateItemSuccess(key, item, query);
            return item;
        }
        catch (error) {
            yield updateItemError(key, error, query);
            throw error;
        }
    };
    return {
        [`create${resourceName}`]: createItem,
        [`delete${resourceName}`]: deleteItem,
        [`update${resourceName}`]: updateItem,
    };
};
exports.createDispatchActions = createDispatchActions;
