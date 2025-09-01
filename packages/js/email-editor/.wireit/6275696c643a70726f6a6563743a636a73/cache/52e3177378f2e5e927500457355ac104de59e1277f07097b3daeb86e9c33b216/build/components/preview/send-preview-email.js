"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendPreviewEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const icons_1 = require("@wordpress/icons");
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const keycodes_1 = require("@wordpress/keycodes");
const url_1 = require("@wordpress/url");
const hooks_1 = require("@wordpress/hooks");
/**
 * Internal dependencies
 */
const store_1 = require("../../store");
const events_1 = require("../../events");
function RawSendPreviewEmail() {
    const sendToRef = (0, element_1.useRef)(null);
    const { requestSendingNewsletterPreview, togglePreviewModal, updateSendPreviewEmail, } = (0, data_1.useDispatch)(store_1.storeName);
    const { toEmail: previewToEmail, isSendingPreviewEmail, sendingPreviewStatus, isModalOpened, errorMessage, postType, } = (0, data_1.useSelect)((select) => ({
        ...select(store_1.storeName).getPreviewState(),
        postType: select(store_1.storeName).getEmailPostType(),
    }), []);
    const handleSendPreviewEmail = () => {
        void requestSendingNewsletterPreview(previewToEmail);
    };
    const sendingMethodConfigurationLink = (0, element_1.useMemo)(() => (0, hooks_1.applyFilters)('fincommerce_email_editor_check_sending_method_configuration_link', `https://www.mailpoet.com/blog/mailpoet-smtp-plugin/?utm_source=fincommerce_email_editor&utm_medium=plugin&utm_source_platform=${postType}`), [postType]);
    const closeCallback = () => {
        (0, events_1.recordEvent)('send_preview_email_modal_closed');
        void togglePreviewModal(false);
    };
    // We use this effect to focus on the input field when the modal is opened
    (0, element_1.useEffect)(() => {
        if (isModalOpened) {
            sendToRef.current?.focus();
            (0, events_1.recordEvent)('send_preview_email_modal_opened');
        }
    }, [isModalOpened]);
    if (!isModalOpened) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(components_1.Modal, { className: "fincommerce-send-preview-email", title: (0, i18n_1.__)('Send a test email', 'fincommerce'), onRequestClose: closeCallback, focusOnMount: false, children: [sendingPreviewStatus === store_1.SendingPreviewStatus.ERROR ? ((0, jsx_runtime_1.jsxs)("div", { className: "fincommerce-send-preview-modal-notice-error", children: [(0, jsx_runtime_1.jsx)("p", { children: (0, i18n_1.__)('Sorry, we were unable to send this email.', 'fincommerce') }), (0, jsx_runtime_1.jsx)("strong", { children: errorMessage &&
                            (0, i18n_1.sprintf)(
                            // translators: %s is an error message.
                            (0, i18n_1.__)('Error: %s', 'fincommerce'), errorMessage) }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: sendingMethodConfigurationLink &&
                                    (0, element_1.createInterpolateElement)((0, i18n_1.__)('Please check your <link>sending method configuration</link> with your hosting provider.', 'fincommerce'), {
                                        link: (
                                        // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label
                                        (0, jsx_runtime_1.jsx)("a", { href: sendingMethodConfigurationLink, target: "_blank", rel: "noopener noreferrer", onClick: () => (0, events_1.recordEvent)('send_preview_email_modal_check_sending_method_configuration_link_clicked') })),
                                    }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, element_1.createInterpolateElement)((0, i18n_1.__)('Or, sign up for MailPoet Sending Service to easily send emails. <link>Sign up for free</link>', 'fincommerce'), {
                                    link: (
                                    // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label
                                    (0, jsx_runtime_1.jsx)("a", { href: `https://account.mailpoet.com/?s=1&g=1&utm_source=fincommerce_email_editor&utm_medium=plugin&utm_source_platform=${postType}`, target: "_blank", rel: "noopener noreferrer", onClick: () => (0, events_1.recordEvent)('send_preview_email_modal_sign_up_for_mailpoet_sending_service_link_clicked') }, "sign-up-for-free")),
                                }) })] })] })) : null, (0, jsx_runtime_1.jsx)("p", { children: (0, i18n_1.__)('Send yourself a test email to test how your email would look like in different email apps.', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.TextControl, { label: (0, i18n_1.__)('Send to', 'fincommerce'), onChange: (email) => {
                    void updateSendPreviewEmail(email);
                    (0, events_1.recordEventOnce)('send_preview_email_modal_send_to_field_updated');
                }, onKeyDown: (event) => {
                    const { keyCode } = event;
                    if (keyCode === keycodes_1.ENTER) {
                        event.preventDefault();
                        handleSendPreviewEmail();
                        (0, events_1.recordEvent)('send_preview_email_modal_send_to_field_key_code_enter');
                    }
                }, className: "fincommerce-send-preview-email__send-to-field", value: previewToEmail, type: "email", ref: sendToRef, required: true, __next40pxDefaultSize: true, __nextHasNoMarginBottom: true }), sendingPreviewStatus === store_1.SendingPreviewStatus.SUCCESS ? ((0, jsx_runtime_1.jsxs)("p", { className: "fincommerce-send-preview-modal-notice-success", children: [(0, jsx_runtime_1.jsx)(icons_1.Icon, { icon: icons_1.check, style: { fill: '#4AB866' } }), (0, i18n_1.__)('Test email sent successfully!', 'fincommerce')] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "fincommerce-send-preview-modal-footer", children: [(0, jsx_runtime_1.jsx)(components_1.Button, { variant: "tertiary", onClick: () => {
                            (0, events_1.recordEvent)('send_preview_email_modal_close_button_clicked');
                            closeCallback();
                        }, children: (0, i18n_1.__)('Cancel', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.Button, { variant: "primary", onClick: () => {
                            handleSendPreviewEmail();
                            (0, events_1.recordEvent)('send_preview_email_modal_send_test_email_button_clicked');
                        }, disabled: isSendingPreviewEmail || !(0, url_1.isEmail)(previewToEmail), children: isSendingPreviewEmail
                            ? (0, i18n_1.__)('Sending…', 'fincommerce')
                            : (0, i18n_1.__)('Send test email', 'fincommerce') })] })] }));
}
exports.SendPreviewEmail = (0, element_1.memo)(RawSendPreviewEmail);
