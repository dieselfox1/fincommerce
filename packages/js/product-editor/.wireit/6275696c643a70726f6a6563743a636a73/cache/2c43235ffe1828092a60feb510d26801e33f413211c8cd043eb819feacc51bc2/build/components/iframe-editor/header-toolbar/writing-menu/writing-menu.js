"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WritingMenu = WritingMenu;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const preferences_1 = require("@wordpress/preferences");
function WritingMenu() {
    const { set: setPreference } = (0, data_1.useDispatch)(preferences_1.store);
    const turnOffDistractionFree = () => {
        setPreference('core', 'distractionFree', false);
    };
    const isLargeViewport = (0, compose_1.useViewportMatch)('medium');
    if (!isLargeViewport) {
        return null;
    }
    return ((0, element_1.createElement)(components_1.MenuGroup, { label: (0, i18n_1.__)('View', 'fincommerce') },
        (0, element_1.createElement)(preferences_1.PreferenceToggleMenuItem, { scope: "core", name: "fixedToolbar", onToggle: turnOffDistractionFree, label: (0, i18n_1.__)('Top toolbar', 'fincommerce'), info: (0, i18n_1.__)('Access all block and document tools in a single place', 'fincommerce'), messageActivated: (0, i18n_1.__)('Top toolbar activated', 'fincommerce'), messageDeactivated: (0, i18n_1.__)('Top toolbar deactivated', 'fincommerce') })));
}
