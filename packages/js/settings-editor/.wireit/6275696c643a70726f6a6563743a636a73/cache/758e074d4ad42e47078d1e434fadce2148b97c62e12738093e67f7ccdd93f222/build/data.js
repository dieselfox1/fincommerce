"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsDataProvider = exports.SettingsDataContext = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const initialData = window.wcSettings?.admin?.settingsData;
const initialSettingsScripts = window.wcSettings?.admin?.settingsScripts;
const SettingsDataContext = (0, element_1.createContext)({
    settingsData: initialData,
    setSettingsData: () => { },
    settingsScripts: {},
    setSettingsScripts: () => { },
});
exports.SettingsDataContext = SettingsDataContext;
const SettingsDataProvider = ({ children, }) => {
    const [settingsData, setSettingsData] = (0, element_1.useState)(initialData);
    const [settingsScripts, setSettingsScripts] = (0, element_1.useState)(initialSettingsScripts);
    return ((0, element_1.createElement)(SettingsDataContext.Provider, { value: {
            settingsData,
            setSettingsData,
            settingsScripts,
            setSettingsScripts,
        } }, children));
};
exports.SettingsDataProvider = SettingsDataProvider;
