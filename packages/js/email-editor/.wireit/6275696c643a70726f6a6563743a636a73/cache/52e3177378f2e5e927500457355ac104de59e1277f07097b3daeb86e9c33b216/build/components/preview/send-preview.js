"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendPreview = SendPreview;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
// eslint-disable-next-line @fincommerce/dependency-group
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const constants_1 = require("../../store/constants");
const send_preview_email_1 = require("./send-preview-email");
const events_1 = require("../../events");
function SendPreview() {
    const { togglePreviewModal } = (0, data_1.useDispatch)(constants_1.storeName);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(editor_1.PluginPreviewMenuItem, { icon: icons_1.external, onClick: () => {
                    (0, events_1.recordEvent)('header_preview_dropdown_send_test_email_selected');
                    togglePreviewModal(true);
                }, children: (0, i18n_1.__)('Send a test email', 'fincommerce') }), (0, jsx_runtime_1.jsx)(send_preview_email_1.SendPreviewEmail, {})] }));
}
