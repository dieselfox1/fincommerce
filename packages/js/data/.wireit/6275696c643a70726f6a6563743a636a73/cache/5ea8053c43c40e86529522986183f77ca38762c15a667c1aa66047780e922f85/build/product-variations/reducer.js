"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = void 0;
const action_types_1 = require("./action-types");
const utils_1 = require("../crud/utils");
const crud_actions_1 = __importDefault(require("./crud-actions"));
const reducer = (state = {
    items: {},
    data: {},
    itemsCount: {},
    errors: {},
    requesting: {},
}, payload) => {
    if (payload && 'type' in payload) {
        switch (payload.type) {
            case action_types_1.TYPES.GENERATE_VARIATIONS_REQUEST:
                return {
                    ...state,
                    requesting: {
                        ...state.requesting,
                        [(0, utils_1.getRequestIdentifier)(crud_actions_1.default.GENERATE_VARIATIONS, payload.key)]: true,
                    },
                };
            case action_types_1.TYPES.GENERATE_VARIATIONS_SUCCESS:
                return {
                    ...state,
                    requesting: {
                        ...state.requesting,
                        [(0, utils_1.getRequestIdentifier)(crud_actions_1.default.GENERATE_VARIATIONS, payload.key)]: false,
                    },
                    errors: {
                        ...state.errors,
                        [(0, utils_1.getRequestIdentifier)(crud_actions_1.default.GENERATE_VARIATIONS, payload.key)]: undefined,
                    },
                };
            case action_types_1.TYPES.GENERATE_VARIATIONS_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [(0, utils_1.getRequestIdentifier)(payload.errorType, payload.key)]: payload.error,
                    },
                    requesting: {
                        ...state.requesting,
                        [(0, utils_1.getRequestIdentifier)(crud_actions_1.default.GENERATE_VARIATIONS, payload.key)]: false,
                    },
                };
            default:
                return state;
        }
    }
    return state;
};
exports.reducer = reducer;
