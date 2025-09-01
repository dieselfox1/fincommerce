"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geolocate = void 0;
exports.getLocale = getLocale;
exports.getLocales = getLocales;
exports.getCountry = getCountry;
exports.getCountries = getCountries;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
const actions_1 = require("./actions");
const constants_1 = require("../constants");
const constants_2 = require("./constants");
const resolveSelect = data_1.controls && data_1.controls.resolveSelect ? data_1.controls.resolveSelect : data_controls_1.select;
function* getLocale() {
    yield resolveSelect(constants_2.STORE_NAME, 'getLocales');
}
function* getLocales() {
    try {
        const url = constants_1.NAMESPACE + '/data/countries/locales';
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        return (0, actions_1.getLocalesSuccess)(results);
    }
    catch (error) {
        return (0, actions_1.getLocalesError)(error);
    }
}
function* getCountry() {
    yield resolveSelect(constants_2.STORE_NAME, 'getCountries');
}
function* getCountries() {
    try {
        const url = constants_1.NAMESPACE + '/data/countries';
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        return (0, actions_1.getCountriesSuccess)(results);
    }
    catch (error) {
        return (0, actions_1.getCountriesError)(error);
    }
}
const geolocate = () => async ({ dispatch }) => {
    try {
        const url = `https://public-api.wordpress.com/geo/?v=${new Date().getTime()}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const result = await response.json();
        dispatch.geolocationSuccess(result);
    }
    catch (error) {
        dispatch.geolocationError(error);
    }
};
exports.geolocate = geolocate;
