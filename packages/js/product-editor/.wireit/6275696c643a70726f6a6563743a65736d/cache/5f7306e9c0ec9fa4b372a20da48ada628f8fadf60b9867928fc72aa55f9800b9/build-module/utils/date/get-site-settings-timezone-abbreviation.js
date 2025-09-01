/**
 * External dependencies
 */
import { getSettings } from '@wordpress/date';
export function getSiteSettingsTimezoneAbbreviation() {
    const { timezone } = getSettings();
    if (timezone.abbr && isNaN(Number(timezone.abbr))) {
        return timezone.abbr;
    }
    const symbol = Number(timezone.offset) < 0 ? '' : '+';
    return `UTC${symbol}${timezone.offsetFormatted ?? timezone.offset}`;
}
