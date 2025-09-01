"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSiteSettingsTime12HourFormatted = isSiteSettingsTime12HourFormatted;
/**
 * External dependencies
 */
const date_1 = require("@wordpress/date");
function isSiteSettingsTime12HourFormatted() {
    const settings = (0, date_1.getSettings)();
    return /a(?!\\)/i.test(settings.formats.time
        .toLowerCase()
        .replace(/\\\\/g, '')
        .split('')
        .reverse()
        .join(''));
}
