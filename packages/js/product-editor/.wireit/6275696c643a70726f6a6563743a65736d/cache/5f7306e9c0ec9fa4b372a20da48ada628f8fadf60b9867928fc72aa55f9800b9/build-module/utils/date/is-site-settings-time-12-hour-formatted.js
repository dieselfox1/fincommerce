/**
 * External dependencies
 */
import { getSettings } from '@wordpress/date';
export function isSiteSettingsTime12HourFormatted() {
    const settings = getSettings();
    return /a(?!\\)/i.test(settings.formats.time
        .toLowerCase()
        .replace(/\\\\/g, '')
        .split('')
        .reverse()
        .join(''));
}
