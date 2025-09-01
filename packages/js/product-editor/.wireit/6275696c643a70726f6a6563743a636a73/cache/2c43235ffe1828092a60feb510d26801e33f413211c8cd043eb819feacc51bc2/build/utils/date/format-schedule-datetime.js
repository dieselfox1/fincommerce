"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMEZONELESS_FORMAT = void 0;
exports.getFormattedDateTime = getFormattedDateTime;
exports.getFullScheduleLabel = getFullScheduleLabel;
exports.formatScheduleDatetime = formatScheduleDatetime;
/**
 * External dependencies
 */
const date_1 = require("@wordpress/date");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const get_site_settings_timezone_abbreviation_1 = require("./get-site-settings-timezone-abbreviation");
const is_same_day_1 = require("./is-same-day");
const is_site_settings_timezone_same_as_date_timezone_1 = require("./is-site-settings-timezone-same-as-date-timezone");
exports.TIMEZONELESS_FORMAT = 'Y-m-d\\TH:i:s';
function getFormattedDateTime(value, format) {
    const { formats } = (0, date_1.getSettings)();
    const dateTimeFormat = (0, i18n_1.sprintf)(
    // translators: %s: Time of day the product is scheduled for.
    (0, i18n_1._x)('F j, Y %s', 'product schedule full date format', 'fincommerce'), formats.time);
    return (0, date_1.dateI18n)(format ?? dateTimeFormat, value, undefined);
}
function getFullScheduleLabel(dateAttribute) {
    const timezoneAbbreviation = (0, get_site_settings_timezone_abbreviation_1.getSiteSettingsTimezoneAbbreviation)();
    const formattedDate = getFormattedDateTime(dateAttribute);
    return (0, i18n_1.isRTL)()
        ? `${timezoneAbbreviation} ${formattedDate}`
        : `${formattedDate} ${timezoneAbbreviation}`;
}
function formatScheduleDatetime(dateAttribute) {
    const { formats } = (0, date_1.getSettings)();
    const date = (0, date_1.getDate)(dateAttribute);
    const now = (0, date_1.getDate)(null);
    if ((0, is_same_day_1.isSameDay)(date, now) && !(0, date_1.isInTheFuture)(dateAttribute)) {
        return (0, i18n_1.__)('Immediately', 'fincommerce');
    }
    // If the user timezone does not equal the site timezone then using words
    // like 'tomorrow' is confusing, so show the full date.
    if (!(0, is_site_settings_timezone_same_as_date_timezone_1.isSiteSettingsTimezoneSameAsDateTimezone)(now)) {
        return getFullScheduleLabel(dateAttribute);
    }
    if ((0, is_same_day_1.isSameDay)(date, now)) {
        return (0, i18n_1.sprintf)(
        // translators: %s: Time of day the product is scheduled for.
        (0, i18n_1.__)('Today at %s', 'fincommerce'), getFormattedDateTime(dateAttribute, formats.time));
    }
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if ((0, is_same_day_1.isSameDay)(date, tomorrow)) {
        return (0, i18n_1.sprintf)(
        // translators: %s: Time of day the product is scheduled for.
        (0, i18n_1.__)('Tomorrow at %s', 'fincommerce'), getFormattedDateTime(dateAttribute, formats.time));
    }
    if (date.getFullYear() === now.getFullYear()) {
        return getFormattedDateTime(date, (0, i18n_1.sprintf)(
        // translators: %s: Time of day the product is scheduled for.
        (0, i18n_1._x)('F j %s', 'product schedule date format without year', 'fincommerce'), formats.time));
    }
    return getFormattedDateTime(dateAttribute);
}
