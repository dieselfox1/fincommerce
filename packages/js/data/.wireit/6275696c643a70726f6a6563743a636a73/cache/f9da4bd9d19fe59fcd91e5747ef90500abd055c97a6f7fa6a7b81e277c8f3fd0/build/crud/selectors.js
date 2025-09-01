"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSelectors = exports.getItemUpdateError = exports.getItemsError = exports.getItemsTotalCount = exports.getItems = exports.getItemError = exports.getItem = exports.getItemDeleteError = exports.getItemCreateError = void 0;
/**
 * External dependencies
 */
const rememo_1 = __importDefault(require("rememo"));
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const utils_2 = require("../utils");
const crud_actions_1 = __importDefault(require("./crud-actions"));
const getItemCreateError = (state, query) => {
    const itemQuery = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.CREATE_ITEM, query);
    return state.errors[itemQuery];
};
exports.getItemCreateError = getItemCreateError;
const getItemDeleteError = (state, idQuery, namespace) => {
    const urlParameters = (0, utils_1.getUrlParameters)(namespace, idQuery);
    const { key } = (0, utils_1.parseId)(idQuery, urlParameters);
    const itemQuery = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.DELETE_ITEM, key);
    return state.errors[itemQuery];
};
exports.getItemDeleteError = getItemDeleteError;
const getItem = (state, idQuery, namespace) => {
    const urlParameters = (0, utils_1.getUrlParameters)(namespace, idQuery);
    const { key } = (0, utils_1.parseId)(idQuery, urlParameters);
    return state.data[key];
};
exports.getItem = getItem;
const getItemError = (state, idQuery, namespace) => {
    const urlParameters = (0, utils_1.getUrlParameters)(namespace, idQuery);
    const { key } = (0, utils_1.parseId)(idQuery, urlParameters);
    const itemQuery = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.GET_ITEM, key);
    return state.errors[itemQuery];
};
exports.getItemError = getItemError;
exports.getItems = (0, rememo_1.default)((state, query) => {
    const itemQuery = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.GET_ITEMS, query || {});
    const ids = state.items[itemQuery]
        ? state.items[itemQuery].data
        : undefined;
    if (!ids) {
        return null;
    }
    if (query && typeof query._fields !== 'undefined') {
        const fields = query._fields;
        return ids.map((id) => {
            return fields.reduce((item, field) => {
                return {
                    ...item,
                    [field]: state.data[id][field],
                };
            }, {});
        });
    }
    const data = ids
        .map((id) => {
        return state.data[id];
    })
        .filter((item) => item !== undefined);
    return data;
}, (state, query) => {
    const itemQuery = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.GET_ITEMS, query || {});
    const ids = state.items[itemQuery]
        ? state.items[itemQuery].data
        : undefined;
    return [
        state.items[itemQuery],
        ...(ids || []).map((id) => {
            return state.data[id];
        }),
    ];
});
const getItemsTotalCount = (state, query, defaultValue = undefined) => {
    const itemQuery = (0, utils_2.getTotalCountResourceName)(crud_actions_1.default.GET_ITEMS, query || {});
    const totalCount = state.itemsCount.hasOwnProperty(itemQuery)
        ? state.itemsCount[itemQuery]
        : defaultValue;
    return totalCount;
};
exports.getItemsTotalCount = getItemsTotalCount;
const getItemsError = (state, query) => {
    const itemQuery = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.GET_ITEMS, query || {});
    return state.errors[itemQuery];
};
exports.getItemsError = getItemsError;
const getItemUpdateError = (state, idQuery, urlParameters) => {
    const { key } = (0, utils_1.parseId)(idQuery, urlParameters);
    const itemQuery = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.UPDATE_ITEM, key);
    return state.errors[itemQuery];
};
exports.getItemUpdateError = getItemUpdateError;
const EMPTY_OBJECT = {};
const createSelectors = ({ resourceName, pluralResourceName, namespace, }) => {
    const hasFinishedRequest = (state, action, args = []) => {
        const sanitizedArgs = (0, utils_1.maybeReplaceIdQuery)(args, namespace);
        const actionName = (0, utils_1.getGenericActionName)(action, resourceName);
        const requestId = (0, utils_1.getRequestIdentifier)(actionName, ...sanitizedArgs);
        if (action)
            return (state.requesting.hasOwnProperty(requestId) &&
                !state.requesting[requestId]);
    };
    const isRequesting = (state, action, args = []) => {
        const sanitizedArgs = (0, utils_1.maybeReplaceIdQuery)(args, namespace);
        const actionName = (0, utils_1.getGenericActionName)(action, resourceName);
        const requestId = (0, utils_1.getRequestIdentifier)(actionName, ...sanitizedArgs);
        return state.requesting[requestId];
    };
    return {
        [`get${resourceName}`]: (0, utils_1.applyNamespace)(exports.getItem, namespace),
        [`get${resourceName}Error`]: (0, utils_1.applyNamespace)(exports.getItemError, namespace),
        [`get${pluralResourceName}`]: (0, utils_1.applyNamespace)(exports.getItems, namespace, [
            EMPTY_OBJECT,
        ]),
        [`get${pluralResourceName}TotalCount`]: (0, utils_1.applyNamespace)(exports.getItemsTotalCount, namespace, [EMPTY_OBJECT, undefined]),
        [`get${pluralResourceName}Error`]: (0, utils_1.applyNamespace)(exports.getItemsError, namespace),
        [`get${resourceName}CreateError`]: (0, utils_1.applyNamespace)(exports.getItemCreateError, namespace),
        [`get${resourceName}DeleteError`]: (0, utils_1.applyNamespace)(exports.getItemDeleteError, namespace),
        [`get${resourceName}UpdateError`]: (0, utils_1.applyNamespace)(exports.getItemUpdateError, namespace),
        hasFinishedRequest,
        isRequesting,
    };
};
exports.createSelectors = createSelectors;
