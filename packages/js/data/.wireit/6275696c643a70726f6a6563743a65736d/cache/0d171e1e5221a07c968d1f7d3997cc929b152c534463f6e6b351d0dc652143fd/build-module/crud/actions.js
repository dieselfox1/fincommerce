/**
 * External dependencies
 */
import { apiFetch } from '@wordpress/data-controls';
/**
 * Internal dependencies
 */
import { cleanQuery, getUrlParameters, getRestPath, parseId } from './utils';
import CRUD_ACTIONS from './crud-actions';
import TYPES from './action-types';
export function createItemError(query, error) {
    return {
        type: TYPES.CREATE_ITEM_ERROR,
        query,
        error,
        errorType: CRUD_ACTIONS.CREATE_ITEM,
    };
}
export function createItemRequest(query) {
    return {
        type: TYPES.CREATE_ITEM_REQUEST,
        query,
    };
}
export function createItemSuccess(key, item, query, options) {
    return {
        type: TYPES.CREATE_ITEM_SUCCESS,
        key,
        item,
        query,
        options,
    };
}
export function deleteItemError(key, error, force) {
    return {
        type: TYPES.DELETE_ITEM_ERROR,
        key,
        error,
        errorType: CRUD_ACTIONS.DELETE_ITEM,
        force,
    };
}
export function deleteItemRequest(key, force) {
    return {
        type: TYPES.DELETE_ITEM_REQUEST,
        key,
        force,
    };
}
export function deleteItemSuccess(key, force, item) {
    return {
        type: TYPES.DELETE_ITEM_SUCCESS,
        key,
        force,
        item,
    };
}
export function getItemError(key, error) {
    return {
        type: TYPES.GET_ITEM_ERROR,
        key,
        error,
        errorType: CRUD_ACTIONS.GET_ITEM,
    };
}
export function getItemSuccess(key, item) {
    return {
        type: TYPES.GET_ITEM_SUCCESS,
        key,
        item,
    };
}
export function getItemsError(query, error) {
    return {
        type: TYPES.GET_ITEMS_ERROR,
        query,
        error,
        errorType: CRUD_ACTIONS.GET_ITEMS,
    };
}
export function getItemsSuccess(query, items, urlParameters) {
    return {
        type: TYPES.GET_ITEMS_SUCCESS,
        items,
        query,
        urlParameters,
    };
}
export function getItemsTotalCountSuccess(query, totalCount) {
    return {
        type: TYPES.GET_ITEMS_TOTAL_COUNT_SUCCESS,
        query,
        totalCount,
    };
}
export function getItemsTotalCountError(query, error) {
    return {
        type: TYPES.GET_ITEMS_TOTAL_COUNT_ERROR,
        query,
        error,
        errorType: CRUD_ACTIONS.GET_ITEMS_TOTAL_COUNT,
    };
}
export function updateItemError(key, error, query) {
    return {
        type: TYPES.UPDATE_ITEM_ERROR,
        key,
        error,
        errorType: CRUD_ACTIONS.UPDATE_ITEM,
        query,
    };
}
export function updateItemRequest(key, query) {
    return {
        type: TYPES.UPDATE_ITEM_REQUEST,
        key,
        query,
    };
}
export function updateItemSuccess(key, item, query) {
    return {
        type: TYPES.UPDATE_ITEM_SUCCESS,
        key,
        item,
        query,
    };
}
export const createDispatchActions = ({ namespace, resourceName, }) => {
    const createItem = function* (query, options) {
        yield createItemRequest(query);
        const urlParameters = getUrlParameters(namespace, query);
        try {
            const item = yield apiFetch({
                path: getRestPath(namespace, cleanQuery(query, namespace), urlParameters),
                method: 'POST',
            });
            const { key } = parseId(item.id, urlParameters);
            yield createItemSuccess(key, item, query, options);
            return item;
        }
        catch (error) {
            yield createItemError(query, error);
            throw error;
        }
    };
    const deleteItem = function* (idQuery, force = true) {
        const urlParameters = getUrlParameters(namespace, idQuery);
        const { id, key } = parseId(idQuery, urlParameters);
        yield deleteItemRequest(key, force);
        try {
            const item = yield apiFetch({
                path: getRestPath(`${namespace}/${id}`, { force }, urlParameters),
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
        const urlParameters = getUrlParameters(namespace, idQuery);
        const { id, key } = parseId(idQuery, urlParameters);
        yield updateItemRequest(key, query);
        try {
            const item = yield apiFetch({
                path: getRestPath(`${namespace}/${id}`, {}, urlParameters),
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
