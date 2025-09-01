"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentEmailNotice = SentEmailNotice;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const notices_1 = require("@wordpress/notices");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const store_1 = require("../../store");
const events_1 = require("../../events");
function SentEmailNotice() {
    const { isEmailSent } = (0, data_1.useSelect)((select) => ({
        isEmailSent: select(store_1.storeName).isEmailSent(),
    }), []);
    (0, element_1.useEffect)(() => {
        if (isEmailSent) {
            void (0, data_1.dispatch)(notices_1.store).createNotice('warning', (0, i18n_1.__)('This email has already been sent. It can be edited, but not sent again. Duplicate this email if you want to send it again.', 'fincommerce'), {
                id: 'email-sent',
                isDismissible: false,
                context: 'email-editor',
            });
            (0, events_1.recordEvent)('editor_showed_email_sent_notice');
        }
    }, [isEmailSent]);
    return null;
}
