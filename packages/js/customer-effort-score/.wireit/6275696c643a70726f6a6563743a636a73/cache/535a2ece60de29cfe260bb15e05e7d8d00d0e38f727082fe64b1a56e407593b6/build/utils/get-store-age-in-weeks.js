"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreAgeInWeeks = getStoreAgeInWeeks;
/**
 * External dependencies
 */
const data_1 = require("@fincommerce/data");
function getStoreAgeInWeeks(adminInstallTimestamp) {
    if (adminInstallTimestamp === 0) {
        return null;
    }
    // Date.now() is ms since Unix epoch, adminInstallTimestamp is in
    // seconds since Unix epoch.
    const storeAgeInMs = Date.now() - adminInstallTimestamp * 1000;
    const storeAgeInWeeks = Math.round(storeAgeInMs / data_1.WEEK);
    return storeAgeInWeeks;
}
