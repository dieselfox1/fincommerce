"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
function validate(customField, customFields) {
    const errors = {};
    if (!customField.key) {
        errors.key = (0, i18n_1.__)('The name is required.', 'fincommerce');
    }
    else if (customField.key.startsWith('_')) {
        errors.key = (0, i18n_1.__)('The name cannot begin with the underscore (_) character.', 'fincommerce');
    }
    else if (customFields.some((field) => field.id !== customField.id && field.key === customField.key)) {
        errors.key = (0, i18n_1.__)('The name must be unique.', 'fincommerce');
    }
    if (!customField.value) {
        errors.value = (0, i18n_1.__)('The value is required.', 'fincommerce');
    }
    return errors;
}
