"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendButton = SendButton;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const hooks_1 = require("@wordpress/hooks");
const data_1 = require("@wordpress/data");
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const store_1 = require("../../store");
const events_1 = require("../../events");
function SendButton() {
    const { isDirty } = (0, editor_1.useEntitiesSavedStatesIsDirty)();
    const { hasEmptyContent, isEmailSent, urls } = (0, data_1.useSelect)((select) => ({
        hasEmptyContent: select(store_1.storeName).hasEmptyContent(),
        isEmailSent: select(store_1.storeName).isEmailSent(),
        urls: select(store_1.storeName).getUrls(),
    }), []);
    function sendAction() {
        if (urls.send) {
            window.location.href = urls.send;
        }
    }
    const isDisabled = hasEmptyContent || isEmailSent || isDirty;
    const label = (0, hooks_1.applyFilters)('fincommerce_email_editor_send_button_label', (0, i18n_1.__)('Send', 'fincommerce'));
    return ((0, jsx_runtime_1.jsx)(components_1.Button, { variant: "primary", size: "compact", onClick: () => {
            (0, events_1.recordEvent)('header_send_button_clicked');
            const action = (0, hooks_1.applyFilters)('fincommerce_email_editor_send_action_callback', sendAction);
            action();
        }, disabled: isDisabled, "data-automation-id": "email_editor_send_button", children: label }));
}
