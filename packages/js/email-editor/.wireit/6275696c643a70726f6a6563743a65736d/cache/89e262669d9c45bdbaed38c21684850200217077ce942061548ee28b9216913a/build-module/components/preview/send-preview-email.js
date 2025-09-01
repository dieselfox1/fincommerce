import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { Button, Modal, TextControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { check, Icon } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useRef, createInterpolateElement, memo, useMemo, } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';
import { isEmail } from '@wordpress/url';
import { applyFilters } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import { SendingPreviewStatus, storeName } from '../../store';
import { recordEvent, recordEventOnce } from '../../events';
function RawSendPreviewEmail() {
    const sendToRef = useRef(null);
    const { requestSendingNewsletterPreview, togglePreviewModal, updateSendPreviewEmail, } = useDispatch(storeName);
    const { toEmail: previewToEmail, isSendingPreviewEmail, sendingPreviewStatus, isModalOpened, errorMessage, postType, } = useSelect((select) => ({
        ...select(storeName).getPreviewState(),
        postType: select(storeName).getEmailPostType(),
    }), []);
    const handleSendPreviewEmail = () => {
        void requestSendingNewsletterPreview(previewToEmail);
    };
    const sendingMethodConfigurationLink = useMemo(() => applyFilters('fincommerce_email_editor_check_sending_method_configuration_link', `https://www.mailpoet.com/blog/mailpoet-smtp-plugin/?utm_source=fincommerce_email_editor&utm_medium=plugin&utm_source_platform=${postType}`), [postType]);
    const closeCallback = () => {
        recordEvent('send_preview_email_modal_closed');
        void togglePreviewModal(false);
    };
    // We use this effect to focus on the input field when the modal is opened
    useEffect(() => {
        if (isModalOpened) {
            sendToRef.current?.focus();
            recordEvent('send_preview_email_modal_opened');
        }
    }, [isModalOpened]);
    if (!isModalOpened) {
        return null;
    }
    return (_jsxs(Modal, { className: "fincommerce-send-preview-email", title: __('Send a test email', 'fincommerce'), onRequestClose: closeCallback, focusOnMount: false, children: [sendingPreviewStatus === SendingPreviewStatus.ERROR ? (_jsxs("div", { className: "fincommerce-send-preview-modal-notice-error", children: [_jsx("p", { children: __('Sorry, we were unable to send this email.', 'fincommerce') }), _jsx("strong", { children: errorMessage &&
                            sprintf(
                            // translators: %s is an error message.
                            __('Error: %s', 'fincommerce'), errorMessage) }), _jsxs("ul", { children: [_jsx("li", { children: sendingMethodConfigurationLink &&
                                    createInterpolateElement(__('Please check your <link>sending method configuration</link> with your hosting provider.', 'fincommerce'), {
                                        link: (
                                        // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label
                                        _jsx("a", { href: sendingMethodConfigurationLink, target: "_blank", rel: "noopener noreferrer", onClick: () => recordEvent('send_preview_email_modal_check_sending_method_configuration_link_clicked') })),
                                    }) }), _jsx("li", { children: createInterpolateElement(__('Or, sign up for MailPoet Sending Service to easily send emails. <link>Sign up for free</link>', 'fincommerce'), {
                                    link: (
                                    // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label
                                    _jsx("a", { href: `https://account.mailpoet.com/?s=1&g=1&utm_source=fincommerce_email_editor&utm_medium=plugin&utm_source_platform=${postType}`, target: "_blank", rel: "noopener noreferrer", onClick: () => recordEvent('send_preview_email_modal_sign_up_for_mailpoet_sending_service_link_clicked') }, "sign-up-for-free")),
                                }) })] })] })) : null, _jsx("p", { children: __('Send yourself a test email to test how your email would look like in different email apps.', 'fincommerce') }), _jsx(TextControl, { label: __('Send to', 'fincommerce'), onChange: (email) => {
                    void updateSendPreviewEmail(email);
                    recordEventOnce('send_preview_email_modal_send_to_field_updated');
                }, onKeyDown: (event) => {
                    const { keyCode } = event;
                    if (keyCode === ENTER) {
                        event.preventDefault();
                        handleSendPreviewEmail();
                        recordEvent('send_preview_email_modal_send_to_field_key_code_enter');
                    }
                }, className: "fincommerce-send-preview-email__send-to-field", value: previewToEmail, type: "email", ref: sendToRef, required: true, __next40pxDefaultSize: true, __nextHasNoMarginBottom: true }), sendingPreviewStatus === SendingPreviewStatus.SUCCESS ? (_jsxs("p", { className: "fincommerce-send-preview-modal-notice-success", children: [_jsx(Icon, { icon: check, style: { fill: '#4AB866' } }), __('Test email sent successfully!', 'fincommerce')] })) : null, _jsxs("div", { className: "fincommerce-send-preview-modal-footer", children: [_jsx(Button, { variant: "tertiary", onClick: () => {
                            recordEvent('send_preview_email_modal_close_button_clicked');
                            closeCallback();
                        }, children: __('Cancel', 'fincommerce') }), _jsx(Button, { variant: "primary", onClick: () => {
                            handleSendPreviewEmail();
                            recordEvent('send_preview_email_modal_send_test_email_button_clicked');
                        }, disabled: isSendingPreviewEmail || !isEmail(previewToEmail), children: isSendingPreviewEmail
                            ? __('Sending…', 'fincommerce')
                            : __('Send test email', 'fincommerce') })] })] }));
}
export const SendPreviewEmail = memo(RawSendPreviewEmail);
