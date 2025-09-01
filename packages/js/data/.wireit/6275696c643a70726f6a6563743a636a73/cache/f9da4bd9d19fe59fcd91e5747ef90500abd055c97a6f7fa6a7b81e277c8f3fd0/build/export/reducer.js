"use strict";
/**
 * External dependencies
 */
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
    errors: {},
    requesting: {},
    exportMeta: {},
    exportIds: {},
}, action) => {
    switch (action.type) {
        case action_types_1.default.SET_IS_REQUESTING:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    [action.selector]: {
                        ...state.requesting[action.selector],
                        [(0, utils_1.hashExportArgs)(action.selectorArgs)]: action.isRequesting,
                    },
                },
            };
        case action_types_1.default.SET_EXPORT_ID:
            const { exportType, exportArgs, exportId } = action;
            return {
                ...state,
                exportMeta: {
                    ...state.exportMeta,
                    [exportId]: {
                        exportType,
                        exportArgs,
                    },
                },
                exportIds: {
                    ...state.exportIds,
                    [exportType]: {
                        ...state.exportIds[exportType],
                        [(0, utils_1.hashExportArgs)({
                            type: exportType,
                            args: exportArgs,
                        })]: exportId,
                    },
                },
            };
        case action_types_1.default.SET_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.selector]: {
                        ...state.errors[action.selector],
                        [(0, utils_1.hashExportArgs)(action.selectorArgs)]: action.error,
                    },
                },
            };
        default:
            return state;
    }
};
exports.default = reducer;
