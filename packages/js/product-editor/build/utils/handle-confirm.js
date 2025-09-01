"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConfirm = handleConfirm;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
async function handleConfirm({ message = (0, i18n_1.__)('Are you sure?', 'fincommerce'), onOk, onCancel, }) {
    // eslint-disable-next-line no-alert
    if (window.confirm(message)) {
        onOk?.();
        return;
    }
    onCancel?.();
}
