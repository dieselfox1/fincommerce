"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResolvers = void 0;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const actions_1 = require("./actions");
const utils_2 = require("../utils");
const createResolvers = ({ storeName, resourceName, pluralResourceName, namespace, }) => {
    const getItem = function* (idQuery) {
        const urlParameters = (0, utils_1.getUrlParameters)(namespace, idQuery);
        const { id, key } = (0, utils_1.parseId)(idQuery, urlParameters);
        try {
            const item = yield (0, data_controls_1.apiFetch)({
                path: (0, utils_1.getRestPath)(`${namespace}/${id}`, {}, urlParameters),
                method: 'GET',
            });
            yield (0, actions_1.getItemSuccess)(key, item);
            return item;
        }
        catch (error) {
            yield (0, actions_1.getItemError)(key, error);
            throw error;
        }
    };
    const getItems = function* (query) {
        const urlParameters = (0, utils_1.getUrlParameters)(namespace, query || {});
        const resourceQuery = (0, utils_1.cleanQuery)(query || {}, namespace);
        yield data_1.controls.dispatch(storeName, 'startResolution', `get${pluralResourceName}TotalCount`, [query]);
        // Require ID when requesting specific fields to later update the resource data.
        if (resourceQuery &&
            resourceQuery._fields &&
            !resourceQuery._fields.includes('id')) {
            resourceQuery._fields = ['id', ...resourceQuery._fields];
        }
        try {
            const path = (0, utils_1.getRestPath)(namespace, query || {}, urlParameters);
            const { items, totalCount } = yield (0, utils_2.request)(path, resourceQuery);
            yield (0, actions_1.getItemsTotalCountSuccess)(query, totalCount);
            yield data_1.controls.dispatch(storeName, 'finishResolution', `get${pluralResourceName}TotalCount`, [query]);
            yield (0, actions_1.getItemsSuccess)(query, items, urlParameters);
            for (const i of items) {
                if (i.id) {
                    yield data_1.controls.dispatch(storeName, 'finishResolution', `get${resourceName}`, [i.id]);
                }
            }
            return items;
        }
        catch (error) {
            yield (0, actions_1.getItemsTotalCountError)(query, error);
            yield (0, actions_1.getItemsError)(query, error);
            throw error;
        }
    };
    const getItemsTotalCount = function* (query) {
        const startedTotalCountUsingGetItems = yield data_1.controls.select(storeName, 'hasStartedResolution', `get${pluralResourceName}`, [query]);
        // Skip resolver as we get the total count from the getItems query as well with same query parameters.
        if (startedTotalCountUsingGetItems) {
            return;
        }
        const totalsQuery = {
            ...(query || {}),
            page: 1,
            per_page: 1,
        };
        const urlParameters = (0, utils_1.getUrlParameters)(namespace, totalsQuery);
        const resourceQuery = (0, utils_1.cleanQuery)(totalsQuery, namespace);
        // Require ID when requesting specific fields to later update the resource data.
        if (resourceQuery &&
            resourceQuery._fields &&
            !resourceQuery._fields.includes('id')) {
            resourceQuery._fields = ['id', ...resourceQuery._fields];
        }
        try {
            const path = (0, utils_1.getRestPath)(namespace, {}, urlParameters);
            const { totalCount } = yield (0, utils_2.request)(path, totalsQuery);
            yield (0, actions_1.getItemsTotalCountSuccess)(query, totalCount);
            return totalCount;
        }
        catch (error) {
            yield (0, actions_1.getItemsTotalCountError)(query, error);
            return error;
        }
    };
    return {
        [`get${resourceName}`]: getItem,
        [`get${pluralResourceName}`]: getItems,
        [`get${pluralResourceName}TotalCount`]: getItemsTotalCount,
    };
};
exports.createResolvers = createResolvers;
