/**
 * External dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { getDate, isInTheFuture, date as parseDate } from '@wordpress/date';
/**
 * Internal dependencies
 */
import { formatScheduleDatetime, getSiteDatetime } from '../../utils';
import { useProductManager } from '../use-product-manager';
export const TIMEZONELESS_FORMAT = 'Y-m-d\\TH:i:s';
export function useProductScheduled(postType) {
    const { isSaving, save } = useProductManager(postType);
    const [date, set] = useEntityProp('postType', postType, 'date_created_gmt');
    const [editedStatus, setStatus, prevStatus] = useEntityProp('postType', postType, 'status');
    const gmtDate = `${date}+00:00`;
    const siteDate = getSiteDatetime(gmtDate);
    function calcDateAndStatus(value) {
        const newSiteDate = getDate(value ?? null);
        const newGmtDate = parseDate(TIMEZONELESS_FORMAT, newSiteDate, 'GMT');
        let status = prevStatus;
        if (isInTheFuture(newSiteDate.toISOString())) {
            status = 'future';
        }
        else if (prevStatus === 'future') {
            status = 'publish';
        }
        return { status, date_created_gmt: newGmtDate };
    }
    async function setDate(value) {
        const result = calcDateAndStatus(value);
        set(result.date_created_gmt);
        setStatus(result.status);
    }
    async function schedule(value) {
        const result = calcDateAndStatus(value);
        return save(result);
    }
    return {
        isScheduling: isSaving,
        isScheduled: editedStatus === 'future' || isInTheFuture(siteDate),
        date: siteDate,
        formattedDate: formatScheduleDatetime(gmtDate),
        setDate,
        schedule,
    };
}
