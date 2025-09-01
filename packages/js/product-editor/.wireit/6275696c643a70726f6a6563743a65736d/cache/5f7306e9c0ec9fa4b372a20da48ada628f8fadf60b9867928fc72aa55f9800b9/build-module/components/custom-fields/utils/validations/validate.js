/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
export function validate(customField, customFields) {
    const errors = {};
    if (!customField.key) {
        errors.key = __('The name is required.', 'fincommerce');
    }
    else if (customField.key.startsWith('_')) {
        errors.key = __('The name cannot begin with the underscore (_) character.', 'fincommerce');
    }
    else if (customFields.some((field) => field.id !== customField.id && field.key === customField.key)) {
        errors.key = __('The name must be unique.', 'fincommerce');
    }
    if (!customField.value) {
        errors.value = __('The value is required.', 'fincommerce');
    }
    return errors;
}
