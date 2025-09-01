"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsEditor = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const components_1 = require("@wordpress/components");
const notices_1 = require("@wordpress/notices");
const site_admin_1 = require("@automattic/site-admin");
/**
 * Internal dependencies
 */
const layout_1 = require("./layout");
const route_1 = require("./route");
const data_2 = require("./data");
const Notices = () => {
    const notices = (0, data_1.useSelect)((select) => {
        const { getNotices } = select(notices_1.store);
        return getNotices();
    }, []);
    const onRemove = (id) => {
        (0, data_1.dispatch)(notices_1.store).removeNotice(id);
    };
    return (0, element_1.createElement)(components_1.SnackbarList, { notices: notices, onRemove: onRemove });
};
const appendSettingsScripts = (scripts) => {
    return scripts.map((script) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script;
        scriptElement.onerror = () => {
            // eslint-disable-next-line no-console
            console.error(`Failed to load script: ${script}`);
        };
        document.body.appendChild(scriptElement);
        return scriptElement;
    });
};
const removeSettingsScripts = (scripts) => {
    scripts.forEach((script) => {
        document.body.removeChild(script);
    });
};
const SettingsApp = () => {
    const { route, settingsPage, tabs, activeSection, activePage } = (0, route_1.useActiveRoute)();
    const { settingsScripts } = (0, element_1.useContext)(data_2.SettingsDataContext);
    (0, element_1.useEffect)(() => {
        if (!activePage) {
            return;
        }
        const scripts = Array.from(new Set([
            ...(settingsScripts._default || []),
            ...(settingsScripts[activePage] || []),
        ]));
        const scriptsElements = appendSettingsScripts(scripts);
        return () => {
            removeSettingsScripts(scriptsElements);
        };
    }, [activePage, activeSection]);
    return ((0, element_1.createElement)(layout_1.Layout, { route: route, settingsPage: settingsPage, tabs: tabs, activeSection: activeSection }));
};
const SettingsEditor = () => {
    return ((0, element_1.createElement)(site_admin_1.RouterProvider, { routes: [], pathArg: "page" },
        (0, element_1.createElement)(data_2.SettingsDataProvider, null,
            (0, element_1.createElement)(SettingsApp, null),
            (0, element_1.createElement)(Notices, null))));
};
exports.SettingsEditor = SettingsEditor;
__exportStar(require("./components"), exports);
__exportStar(require("./legacy"), exports);
__exportStar(require("./route"), exports);
