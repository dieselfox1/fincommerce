"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrompt = handlePrompt;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
async function handlePrompt({ message = (0, i18n_1.__)('Enter a value', 'fincommerce'), defaultValue, onOk, onCancel, }) {
    // eslint-disable-next-line no-alert
    const value = window.prompt(message, defaultValue);
    if (value === null) {
        onCancel?.();
        return;
    }
    onOk(value);
}
