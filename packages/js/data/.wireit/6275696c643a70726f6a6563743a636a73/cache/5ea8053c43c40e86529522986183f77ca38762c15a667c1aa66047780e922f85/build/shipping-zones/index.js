"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPERIMENTAL_SHIPPING_ZONES_STORE_NAME = exports.store = void 0;
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
const crud_1 = require("../crud");
exports.store = (0, crud_1.createCrudDataStore)({
    storeName: constants_1.STORE_NAME,
    resourceName: 'ShippingZone',
    pluralResourceName: 'ShippingZones',
    namespace: constants_1.WC_SHIPPING_ZONES_NAMESPACE,
});
exports.EXPERIMENTAL_SHIPPING_ZONES_STORE_NAME = constants_1.STORE_NAME;
