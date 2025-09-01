"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReducer = void 0;
const crud_actions_1 = __importDefault(require("./crud-actions"));
const utils_1 = require("./utils");
const utils_2 = require("../utils");
const action_types_1 = require("./action-types");
const createReducer = (additionalReducer) => {
    const reducer = (state = {
        items: {},
        data: {},
        itemsCount: {},
        errors: {},
        requesting: {},
    }, payload) => {
        const itemData = state.data || {};
        if (payload && 'type' in payload) {
            switch (payload.type) {
                case action_types_1.TYPES.CREATE_ITEM_ERROR:
                    const createItemErrorRequestId = (0, utils_1.getRequestIdentifier)(payload.errorType, payload.query || {});
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            [createItemErrorRequestId]: payload.error,
                        },
                        requesting: {
                            ...state.requesting,
                            [createItemErrorRequestId]: false,
                        },
                    };
                case action_types_1.TYPES.GET_ITEMS_TOTAL_COUNT_ERROR:
                case action_types_1.TYPES.GET_ITEMS_ERROR:
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            [(0, utils_1.getRequestIdentifier)(payload.errorType, (payload.query || {}))]: payload.error,
                        },
                    };
                case action_types_1.TYPES.GET_ITEMS_TOTAL_COUNT_SUCCESS:
                    return {
                        ...state,
                        itemsCount: {
                            ...state.itemsCount,
                            [(0, utils_2.getTotalCountResourceName)(crud_actions_1.default.GET_ITEMS, (payload.query || {}))]: payload.totalCount,
                        },
                    };
                case action_types_1.TYPES.CREATE_ITEM_SUCCESS: {
                    const { options = {} } = payload;
                    const { objItems, ids } = (0, utils_1.organizeItemsById)([payload.item], options.optimisticUrlParameters, itemData);
                    const data = {
                        ...itemData,
                        ...objItems,
                    };
                    const createItemSuccessRequestId = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.CREATE_ITEM, ids[0], payload.query);
                    const getItemQueryId = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.GET_ITEMS, options.optimisticQueryUpdate);
                    const getItemCountQueryId = (0, utils_2.getTotalCountResourceName)(crud_actions_1.default.GET_ITEMS, options?.optimisticQueryUpdate || {});
                    let currentItems = state.items;
                    const currentItemsByQueryId = currentItems[getItemQueryId]?.data || [];
                    let nextItemsData = [...currentItemsByQueryId, ...ids];
                    let itemsCount = state.itemsCount;
                    /*
                     * Check it needs to update the store with the new item,
                     * optimistically.
                     */
                    if (options?.optimisticQueryUpdate) {
                        /*
                         * If the query has an order_by property, sort the items
                         * by the order_by property.
                         *
                         * The sort criteria could be different from the
                         * the server side.
                         * Ensure to keep in sync with the server side, for instance,
                         * by invalidating the cache.
                         *
                         * Todo: Add a mechanism to use the server side sorting criteria.
                         */
                        if (options.optimisticQueryUpdate?.order_by) {
                            const order_by = options.optimisticQueryUpdate
                                ?.order_by;
                            /*
                             * Pick the data to sort by the order_by property,
                             * from the data store,
                             * based on the nextItemsData ids.
                             */
                            let sourceDataToOrderBy = Object.values((0, utils_1.filterDataByKeys)(data, nextItemsData));
                            sourceDataToOrderBy = sourceDataToOrderBy.sort((a, b) => String(a[order_by])
                                .toLowerCase()
                                .localeCompare(String(b[order_by]).toLowerCase()));
                            // Pick the ids from the sorted data.
                            const { ids: sortedIds } = (0, utils_1.organizeItemsById)(sourceDataToOrderBy, options.optimisticUrlParameters);
                            // Update the items data with the sorted ids.
                            nextItemsData = sortedIds;
                        }
                        currentItems = {
                            ...currentItems,
                            [getItemQueryId]: {
                                data: nextItemsData,
                            },
                        };
                        itemsCount = {
                            ...state.itemsCount,
                            [getItemCountQueryId]: nextItemsData.length,
                        };
                    }
                    return {
                        ...state,
                        items: currentItems,
                        itemsCount,
                        data,
                        requesting: {
                            ...state.requesting,
                            [createItemSuccessRequestId]: false,
                        },
                    };
                }
                case action_types_1.TYPES.GET_ITEM_SUCCESS:
                    return {
                        ...state,
                        data: {
                            ...itemData,
                            [payload.key]: {
                                ...(itemData[payload.key] || {}),
                                ...payload.item,
                            },
                        },
                    };
                case action_types_1.TYPES.UPDATE_ITEM_SUCCESS:
                    const updateItemSuccessRequestId = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.UPDATE_ITEM, payload.key, payload.query);
                    return {
                        ...state,
                        data: {
                            ...itemData,
                            [payload.key]: {
                                ...(itemData[payload.key] || {}),
                                ...payload.item,
                            },
                        },
                        requesting: {
                            ...state.requesting,
                            [updateItemSuccessRequestId]: false,
                        },
                    };
                case action_types_1.TYPES.DELETE_ITEM_SUCCESS:
                    const deleteItemSuccessRequestId = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.DELETE_ITEM, payload.key, payload.force);
                    const itemKeys = Object.keys(state.data);
                    const nextData = itemKeys.reduce((items, key) => {
                        if (key !== payload.key.toString()) {
                            items[key] = state.data[key];
                            return items;
                        }
                        if (payload.force) {
                            return items;
                        }
                        items[key] = payload.item;
                        return items;
                    }, {});
                    return {
                        ...state,
                        data: nextData,
                        requesting: {
                            ...state.requesting,
                            [deleteItemSuccessRequestId]: false,
                        },
                    };
                case action_types_1.TYPES.DELETE_ITEM_ERROR:
                    const deleteItemErrorRequestId = (0, utils_1.getRequestIdentifier)(payload.errorType, payload.key, payload.force);
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            [deleteItemErrorRequestId]: payload.error,
                        },
                        requesting: {
                            ...state.requesting,
                            [deleteItemErrorRequestId]: false,
                        },
                    };
                case action_types_1.TYPES.GET_ITEM_ERROR:
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            [(0, utils_1.getRequestIdentifier)(payload.errorType, payload.key)]: payload.error,
                        },
                    };
                case action_types_1.TYPES.UPDATE_ITEM_ERROR:
                    const updateItemErrorRequestId = (0, utils_1.getRequestIdentifier)(payload.errorType, payload.key, payload.query);
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            [updateItemErrorRequestId]: payload.error,
                        },
                        requesting: {
                            ...state.requesting,
                            [updateItemErrorRequestId]: false,
                        },
                    };
                case action_types_1.TYPES.GET_ITEMS_SUCCESS:
                    const { objItems, ids } = (0, utils_1.organizeItemsById)(payload.items, payload.urlParameters, itemData);
                    const itemQuery = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.GET_ITEMS, (payload.query || {}));
                    return {
                        ...state,
                        items: {
                            ...state.items,
                            [itemQuery]: { data: ids },
                        },
                        data: {
                            ...state.data,
                            ...objItems,
                        },
                    };
                case action_types_1.TYPES.CREATE_ITEM_REQUEST:
                    return {
                        ...state,
                        requesting: {
                            ...state.requesting,
                            [(0, utils_1.getRequestIdentifier)(crud_actions_1.default.CREATE_ITEM, payload.query)]: true,
                        },
                    };
                case action_types_1.TYPES.DELETE_ITEM_REQUEST:
                    return {
                        ...state,
                        requesting: {
                            ...state.requesting,
                            [(0, utils_1.getRequestIdentifier)(crud_actions_1.default.DELETE_ITEM, payload.key, payload.force)]: true,
                        },
                    };
                case action_types_1.TYPES.UPDATE_ITEM_REQUEST:
                    return {
                        ...state,
                        requesting: {
                            ...state.requesting,
                            [(0, utils_1.getRequestIdentifier)(crud_actions_1.default.UPDATE_ITEM, payload.key, payload.query)]: true,
                        },
                    };
            }
        }
        if (additionalReducer) {
            return additionalReducer(state, payload);
        }
        return state;
    };
    return reducer;
};
exports.createReducer = createReducer;
