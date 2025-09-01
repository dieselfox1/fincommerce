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
const reducer = (state = {
    errors: {},
    locales: {},
    countries: [],
    geolocation: undefined,
}, action) => {
    switch (action.type) {
        case action_types_1.default.GET_LOCALES_SUCCESS:
            state = {
                ...state,
                locales: action.locales,
            };
            break;
        case action_types_1.default.GET_LOCALES_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    locales: action.error,
                },
            };
            break;
        case action_types_1.default.GET_COUNTRIES_SUCCESS:
            state = {
                ...state,
                countries: action.countries,
            };
            break;
        case action_types_1.default.GET_COUNTRIES_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    countries: action.error,
                },
            };
            break;
        case action_types_1.default.GEOLOCATION_SUCCESS:
            state = {
                ...state,
                geolocation: action.geolocation,
            };
            break;
        case action_types_1.default.GEOLOCATION_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    geolocation: action.error,
                },
            };
            break;
    }
    return state;
};
exports.default = reducer;
