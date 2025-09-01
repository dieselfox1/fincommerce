"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyContent = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const form_1 = require("./form");
const LegacyContent = ({ settingsPage, activeSection, settingsData, }) => {
    const section = settingsPage.sections[activeSection];
    if (!section) {
        return null;
    }
    return ((0, element_1.createElement)(form_1.Form, { settings: section.settings, settingsData: settingsData, settingsPage: settingsPage, activeSection: activeSection }));
};
exports.LegacyContent = LegacyContent;
