"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const moment_1 = __importDefault(require("moment"));
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const reducer = (state = {
    activeImport: false,
    importStatus: {},
    importTotals: {},
    errors: {},
    lastImportStartTimestamp: 0,
    period: {
        date: (0, moment_1.default)().format((0, i18n_1.__)('MM/DD/YYYY', 'fincommerce')),
        label: 'all',
    },
    skipPrevious: true,
}, action) => {
    switch (action.type) {
        case action_types_1.default.SET_IMPORT_STARTED:
            const { activeImport } = action;
            state = {
                ...state,
                activeImport,
                lastImportStartTimestamp: activeImport
                    ? Date.now()
                    : state.lastImportStartTimestamp,
            };
            break;
        case action_types_1.default.SET_IMPORT_PERIOD:
            state = {
                ...state,
                period: {
                    ...state.period,
                    label: action.date,
                },
                activeImport: false,
            };
            break;
        case action_types_1.default.SET_IMPORT_DATE:
            state = {
                ...state,
                period: {
                    date: action.date,
                    label: 'custom',
                },
                activeImport: false,
            };
            break;
        case action_types_1.default.SET_SKIP_IMPORTED:
            state = {
                ...state,
                skipPrevious: action.skipPrevious,
                activeImport: false,
            };
            break;
        case action_types_1.default.SET_IMPORT_STATUS:
            const { query, importStatus } = action;
            state = {
                ...state,
                importStatus: {
                    ...state.importStatus,
                    [JSON.stringify(query)]: importStatus,
                },
                errors: {
                    ...state.errors,
                    [JSON.stringify(query)]: false,
                },
            };
            break;
        case action_types_1.default.SET_IMPORT_TOTALS:
            state = {
                ...state,
                importTotals: {
                    ...state.importTotals,
                    [JSON.stringify(action.query)]: action.importTotals,
                },
            };
            break;
        case action_types_1.default.SET_IMPORT_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    [JSON.stringify(action.query)]: action.error,
                },
            };
            break;
    }
    return state;
};
exports.default = reducer;
