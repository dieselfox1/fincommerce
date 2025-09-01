"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrudDataStore = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const selectors_1 = require("./selectors");
const actions_1 = require("./actions");
const controls_1 = __importDefault(require("../controls"));
const resolvers_1 = require("./resolvers");
const reducer_1 = require("./reducer");
const createCrudDataStore = ({ storeName, resourceName, namespace, pluralResourceName, storeConfig, }) => {
    const crudActions = (0, actions_1.createDispatchActions)({
        resourceName,
        namespace,
    });
    const crudResolvers = (0, resolvers_1.createResolvers)({
        storeName,
        resourceName,
        pluralResourceName,
        namespace,
    });
    const crudSelectors = (0, selectors_1.createSelectors)({
        resourceName,
        pluralResourceName,
        namespace,
    });
    const { reducer, actions = {}, selectors = {}, resolvers = {}, controls = {}, } = storeConfig || {};
    const crudReducer = reducer ? (0, reducer_1.createReducer)(reducer) : (0, reducer_1.createReducer)();
    const store = (0, data_1.createReduxStore)(storeName, {
        reducer: crudReducer,
        actions: { ...crudActions, ...actions },
        selectors: {
            ...crudSelectors,
            ...selectors,
        },
        resolvers: { ...crudResolvers, ...resolvers },
        controls: {
            ...controls_1.default,
            ...controls,
        },
    });
    (0, data_1.register)(store);
    return store;
};
exports.createCrudDataStore = createCrudDataStore;
