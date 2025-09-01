"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidationNotices = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const notices_1 = require("@wordpress/notices");
const useValidationNotices = () => {
    const context = 'email-validation';
    const notices = (0, data_1.useSelect)((mapSelect) => mapSelect(notices_1.store).getNotices(context));
    return {
        notices,
        hasValidationNotice: (0, element_1.useCallback)((noticeId) => {
            if (!noticeId) {
                return notices?.length > 0;
            }
            return (notices.find((notice) => notice.id === noticeId) !==
                undefined);
        }, [notices]),
        addValidationNotice: (0, element_1.useCallback)((noticeId, message, actions = []) => {
            void (0, data_1.dispatch)(notices_1.store).createNotice('error', message, {
                id: noticeId,
                isDismissible: false,
                actions,
                context,
            });
        }, [context]),
        removeValidationNotice: (0, element_1.useCallback)((noticeId) => {
            void (0, data_1.dispatch)(notices_1.store).removeNotice(noticeId, context);
        }, [context]),
    };
};
exports.useValidationNotices = useValidationNotices;
