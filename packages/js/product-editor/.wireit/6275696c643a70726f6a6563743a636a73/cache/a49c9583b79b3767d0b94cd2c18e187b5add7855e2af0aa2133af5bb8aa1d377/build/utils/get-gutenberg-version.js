"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGutenbergVersion = getGutenbergVersion;
/**
 * External dependencies
 */
const settings_1 = require("@fincommerce/settings");
function getGutenbergVersion() {
    const adminSettings = (0, settings_1.getSetting)('admin');
    if (adminSettings.gutenberg_version) {
        return parseFloat(adminSettings?.gutenberg_version);
    }
    return 0;
}
