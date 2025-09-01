"use strict";
/**
 * External dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettingsForGroup = updateSettingsForGroup;
exports.updateErrorForGroup = updateErrorForGroup;
exports.setIsRequesting = setIsRequesting;
exports.clearIsDirty = clearIsDirty;
exports.persistSettingsForGroup = persistSettingsForGroup;
exports.updateAndPersistSettingsForGroup = updateAndPersistSettingsForGroup;
exports.clearSettings = clearSettings;
const i18n_1 = require("@wordpress/i18n");
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
const lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const constants_2 = require("./constants");
const action_types_1 = __importDefault(require("./action-types"));
// Can be removed in WP 5.9, wp.data is supported in >5.7.
const resolveSelect = data_1.controls && data_1.controls.resolveSelect ? data_1.controls.resolveSelect : data_controls_1.select;
function updateSettingsForGroup(group, data, time = new Date()) {
    return {
        type: action_types_1.default.UPDATE_SETTINGS_FOR_GROUP,
        group,
        data,
        time,
    };
}
function updateErrorForGroup(group, data, error, time = new Date()) {
    return {
        type: action_types_1.default.UPDATE_ERROR_FOR_GROUP,
        group,
        data,
        error,
        time,
    };
}
function setIsRequesting(group, isRequesting) {
    return {
        type: action_types_1.default.SET_IS_REQUESTING,
        group,
        isRequesting,
    };
}
function clearIsDirty(group) {
    return {
        type: action_types_1.default.CLEAR_IS_DIRTY,
        group,
    };
}
// this would replace setSettingsForGroup
function* persistSettingsForGroup(group) {
    // first dispatch the is persisting action
    yield setIsRequesting(group, true);
    // get all dirty keys with select control
    const dirtyKeys = yield resolveSelect(constants_2.STORE_NAME, 'getDirtyKeys', group);
    // if there is nothing dirty, bail
    if (dirtyKeys.length === 0) {
        yield setIsRequesting(group, false);
        return;
    }
    // get data slice for keys
    const dirtyData = yield resolveSelect(constants_2.STORE_NAME, 'getSettingsForGroup', group, dirtyKeys);
    const url = `${constants_1.NAMESPACE}/settings/${group}/batch`;
    const update = dirtyKeys.reduce((updates, key) => {
        const u = Object.keys(dirtyData[key]).map((k) => {
            return { id: k, value: dirtyData[key][k] };
        });
        return (0, lodash_1.concat)(updates, u);
    }, []);
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'POST',
            data: { update },
        });
        yield setIsRequesting(group, false);
        if (!results) {
            throw new Error((0, i18n_1.__)('There was a problem updating your settings.', 'fincommerce'));
        }
        // remove dirtyKeys from map - note we're only doing this if there is no error.
        yield clearIsDirty(group);
    }
    catch (e) {
        yield updateErrorForGroup(group, null, e);
        yield setIsRequesting(group, false);
        throw e;
    }
}
// allows updating and persisting immediately in one action.
function* updateAndPersistSettingsForGroup(group, data) {
    // Preemptively set requesting to allow for loading UI when optimistically updating settings.
    yield setIsRequesting(group, true);
    yield updateSettingsForGroup(group, data);
    yield* persistSettingsForGroup(group);
}
function clearSettings() {
    return {
        type: action_types_1.default.CLEAR_SETTINGS,
    };
}
