"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const navigation_1 = require("@fincommerce/navigation");
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
exports.default = async () => {
    const { onLoad, onHistoryChange } = (0, data_1.dispatch)(constants_1.STORE_NAME);
    await onLoad();
    (0, navigation_1.addHistoryListener)(async () => {
        setTimeout(async () => {
            await onHistoryChange();
        }, 0);
    });
};
