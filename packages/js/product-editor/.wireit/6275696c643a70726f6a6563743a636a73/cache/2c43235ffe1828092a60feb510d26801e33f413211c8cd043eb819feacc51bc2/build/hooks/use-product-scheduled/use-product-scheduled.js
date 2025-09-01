"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMEZONELESS_FORMAT = void 0;
exports.useProductScheduled = useProductScheduled;
/**
 * External dependencies
 */
const core_data_1 = require("@wordpress/core-data");
const date_1 = require("@wordpress/date");
/**
 * Internal dependencies
 */
const utils_1 = require("../../utils");
const use_product_manager_1 = require("../use-product-manager");
exports.TIMEZONELESS_FORMAT = 'Y-m-d\\TH:i:s';
function useProductScheduled(postType) {
    const { isSaving, save } = (0, use_product_manager_1.useProductManager)(postType);
    const [date, set] = (0, core_data_1.useEntityProp)('postType', postType, 'date_created_gmt');
    const [editedStatus, setStatus, prevStatus] = (0, core_data_1.useEntityProp)('postType', postType, 'status');
    const gmtDate = `${date}+00:00`;
    const siteDate = (0, utils_1.getSiteDatetime)(gmtDate);
    function calcDateAndStatus(value) {
        const newSiteDate = (0, date_1.getDate)(value ?? null);
        const newGmtDate = (0, date_1.date)(exports.TIMEZONELESS_FORMAT, newSiteDate, 'GMT');
        let status = prevStatus;
        if ((0, date_1.isInTheFuture)(newSiteDate.toISOString())) {
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
        isScheduled: editedStatus === 'future' || (0, date_1.isInTheFuture)(siteDate),
        date: siteDate,
        formattedDate: (0, utils_1.formatScheduleDatetime)(gmtDate),
        setDate,
        schedule,
    };
}
