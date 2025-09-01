/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
export async function handlePrompt({ message = __('Enter a value', 'fincommerce'), defaultValue, onOk, onCancel, }) {
    // eslint-disable-next-line no-alert
    const value = window.prompt(message, defaultValue);
    if (value === null) {
        onCancel?.();
        return;
    }
    onOk(value);
}
