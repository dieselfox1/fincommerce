"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTabTracksData = getTabTracksData;
/**
 * Internal dependencies
 */
const constants_1 = require("../../../constants");
/**
 * Get the data for a tab click.
 *
 * @param {string}  tabId   Clicked tab.
 * @param {Product} product Current product.
 * @return {Object} The data for the event.
 */
function getTabTracksData(tabId, product) {
    const data = {
        product_tab: tabId,
        product_type: product.type,
        source: constants_1.TRACKS_SOURCE,
    };
    if (tabId === 'inventory') {
        return {
            ...data,
            is_store_stock_management_enabled: product.manage_stock,
        };
    }
    return data;
}
