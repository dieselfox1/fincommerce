"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSettings = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const _1 = require("./");
const useSettings = (group, settingsKeys = []) => {
    const { requestedSettings, settingsError, isRequesting, isDirty } = (0, data_1.useSelect)((select) => {
        const { getLastSettingsErrorForGroup, getSettingsForGroup, getIsDirty, isUpdateSettingsRequesting, } = select(_1.store);
        return {
            requestedSettings: getSettingsForGroup(group, settingsKeys),
            settingsError: Boolean(getLastSettingsErrorForGroup(group)),
            isRequesting: isUpdateSettingsRequesting(group),
            isDirty: getIsDirty(group, settingsKeys),
        };
    }, [group, ...settingsKeys.sort()]);
    const { persistSettingsForGroup, updateAndPersistSettingsForGroup, updateSettingsForGroup, } = (0, data_1.useDispatch)(_1.store);
    const updateSettings = (0, element_1.useCallback)((name, data) => {
        updateSettingsForGroup(group, { [name]: data });
    }, [group]);
    const persistSettings = (0, element_1.useCallback)(() => {
        // this action would simply persist all settings marked as dirty in the
        // store state and then remove the dirty record in the isDirtyMap
        persistSettingsForGroup(group);
    }, [group]);
    const updateAndPersistSettings = (0, element_1.useCallback)((name, data) => {
        updateAndPersistSettingsForGroup(group, { [name]: data });
    }, [group]);
    return {
        settingsError,
        isRequesting,
        isDirty,
        ...requestedSettings,
        persistSettings,
        updateAndPersistSettings,
        updateSettings,
    };
};
exports.useSettings = useSettings;
