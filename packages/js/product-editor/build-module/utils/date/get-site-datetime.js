/**
 * External dependencies
 */
import { date as formatDate, getDate } from '@wordpress/date';
export function getSiteDatetime(value) {
    const datetime = getDate(value ?? null);
    return formatDate('Y-m-d\\TH:i:s', datetime, undefined);
}
