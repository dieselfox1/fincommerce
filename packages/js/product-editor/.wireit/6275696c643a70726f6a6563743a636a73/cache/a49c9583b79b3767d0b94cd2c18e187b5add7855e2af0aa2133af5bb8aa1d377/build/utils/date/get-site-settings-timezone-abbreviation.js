"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteSettingsTimezoneAbbreviation = getSiteSettingsTimezoneAbbreviation;
/**
 * External dependencies
 */
const date_1 = require("@wordpress/date");
function getSiteSettingsTimezoneAbbreviation() {
    const { timezone } = (0, date_1.getSettings)();
    if (timezone.abbr && isNaN(Number(timezone.abbr))) {
        return timezone.abbr;
    }
    const symbol = Number(timezone.offset) < 0 ? '' : '+';
    return `UTC${symbol}${timezone.offsetFormatted ?? timezone.offset}`;
}
