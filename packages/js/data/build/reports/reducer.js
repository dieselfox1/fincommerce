"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const initialState = {
    itemErrors: {},
    items: {},
    statErrors: {},
    stats: {},
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case action_types_1.default.SET_REPORT_ITEMS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.resourceName]: action.items,
                },
            };
        case action_types_1.default.SET_REPORT_STATS:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    [action.resourceName]: action.stats,
                },
            };
        case action_types_1.default.SET_ITEM_ERROR:
            return {
                ...state,
                itemErrors: {
                    ...state.itemErrors,
                    [action.resourceName]: action.error,
                },
            };
        case action_types_1.default.SET_STAT_ERROR:
            return {
                ...state,
                statErrors: {
                    ...state.statErrors,
                    [action.resourceName]: action.error,
                },
            };
        default:
            return state;
    }
};
exports.default = reducer;
