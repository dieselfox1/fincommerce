"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSiteSettingsTimezoneSameAsDateTimezone = isSiteSettingsTimezoneSameAsDateTimezone;
/**
 * External dependencies
 */
const date_1 = require("@wordpress/date");
function isSiteSettingsTimezoneSameAsDateTimezone(date) {
    const { timezone } = (0, date_1.getSettings)();
    const siteOffset = Number(timezone.offset);
    const dateOffset = -1 * (date.getTimezoneOffset() / 60);
    return siteOffset === dateOffset;
}
