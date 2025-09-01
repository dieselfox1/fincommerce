/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
export async function handleConfirm({ message = __('Are you sure?', 'fincommerce'), onOk, onCancel, }) {
    // eslint-disable-next-line no-alert
    if (window.confirm(message)) {
        onOk?.();
        return;
    }
    onCancel?.();
}
