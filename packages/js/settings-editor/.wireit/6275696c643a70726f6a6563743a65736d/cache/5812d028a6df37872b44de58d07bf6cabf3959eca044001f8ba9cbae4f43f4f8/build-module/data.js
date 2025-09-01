/**
 * External dependencies
 */
import { createElement, createContext, useState } from '@wordpress/element';
const initialData = window.wcSettings?.admin?.settingsData;
const initialSettingsScripts = window.wcSettings?.admin?.settingsScripts;
const SettingsDataContext = createContext({
    settingsData: initialData,
    setSettingsData: () => { },
    settingsScripts: {},
    setSettingsScripts: () => { },
});
const SettingsDataProvider = ({ children, }) => {
    const [settingsData, setSettingsData] = useState(initialData);
    const [settingsScripts, setSettingsScripts] = useState(initialSettingsScripts);
    return (createElement(SettingsDataContext.Provider, { value: {
            settingsData,
            setSettingsData,
            settingsScripts,
            setSettingsScripts,
        } }, children));
};
export { SettingsDataContext, SettingsDataProvider };
