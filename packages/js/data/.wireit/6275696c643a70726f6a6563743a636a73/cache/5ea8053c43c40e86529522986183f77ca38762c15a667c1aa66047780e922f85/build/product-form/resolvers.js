"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFields = getFields;
exports.getProductForm = getProductForm;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
const actions_1 = require("./actions");
const constants_1 = require("../constants");
function* getFields() {
    try {
        const url = constants_1.WC_ADMIN_NAMESPACE + '/product-form/fields';
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        return (0, actions_1.getFieldsSuccess)(results);
    }
    catch (error) {
        return (0, actions_1.getFieldsError)(error);
    }
}
function* getProductForm() {
    try {
        const url = constants_1.WC_ADMIN_NAMESPACE + '/product-form';
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        return (0, actions_1.getProductFormSuccess)(results);
    }
    catch (error) {
        return (0, actions_1.getProductFormError)(error);
    }
}
