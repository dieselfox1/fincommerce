/**
 * External dependencies
 */
import { getSettings } from '@wordpress/date';
export function isSiteSettingsTimezoneSameAsDateTimezone(date) {
    const { timezone } = getSettings();
    const siteOffset = Number(timezone.offset);
    const dateOffset = -1 * (date.getTimezoneOffset() / 60);
    return siteOffset === dateOffset;
}
