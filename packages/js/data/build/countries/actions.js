"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalesSuccess = getLocalesSuccess;
exports.getLocalesError = getLocalesError;
exports.getCountriesSuccess = getCountriesSuccess;
exports.getCountriesError = getCountriesError;
exports.geolocationSuccess = geolocationSuccess;
exports.geolocationError = geolocationError;
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
function getLocalesSuccess(locales) {
    return {
        type: action_types_1.default.GET_LOCALES_SUCCESS,
        locales,
    };
}
function getLocalesError(error) {
    return {
        type: action_types_1.default.GET_LOCALES_ERROR,
        error,
    };
}
function getCountriesSuccess(countries) {
    return {
        type: action_types_1.default.GET_COUNTRIES_SUCCESS,
        countries,
    };
}
function getCountriesError(error) {
    return {
        type: action_types_1.default.GET_COUNTRIES_ERROR,
        error,
    };
}
function geolocationSuccess(geolocation) {
    return {
        type: action_types_1.default.GEOLOCATION_SUCCESS,
        geolocation,
    };
}
function geolocationError(error) {
    return {
        type: action_types_1.default.GEOLOCATION_ERROR,
        error,
    };
}
