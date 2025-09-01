"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = getSettings;
exports.getSettingsForGroup = getSettingsForGroup;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const constants_2 = require("./constants");
const actions_1 = require("./actions");
const types_1 = require("../types");
// Can be removed in WP 5.9.
const dispatch = data_1.controls && data_1.controls.dispatch ? data_1.controls.dispatch : data_controls_1.dispatch;
function settingsToSettingsResource(settings) {
    return settings.reduce((resource, setting) => {
        resource[setting.id] = setting.value;
        return resource;
    }, {});
}
function* getSettings(group) {
    yield dispatch(constants_2.STORE_NAME, 'setIsRequesting', group, true);
    try {
        const url = constants_1.NAMESPACE + '/settings/' + group;
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        const resource = settingsToSettingsResource(results);
        return (0, actions_1.updateSettingsForGroup)(group, { [group]: resource });
    }
    catch (error) {
        if (error instanceof Error || (0, types_1.isRestApiError)(error)) {
            return (0, actions_1.updateErrorForGroup)(group, null, error.message);
        }
        throw `Unexpected error ${error}`;
    }
}
function* getSettingsForGroup(group) {
    return getSettings(group);
}
