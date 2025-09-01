/**
 * External dependencies
 */
import { useCallback } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
export const useValidationNotices = () => {
    const context = 'email-validation';
    const notices = useSelect((mapSelect) => mapSelect(noticesStore).getNotices(context));
    return {
        notices,
        hasValidationNotice: useCallback((noticeId) => {
            if (!noticeId) {
                return notices?.length > 0;
            }
            return (notices.find((notice) => notice.id === noticeId) !==
                undefined);
        }, [notices]),
        addValidationNotice: useCallback((noticeId, message, actions = []) => {
            void dispatch(noticesStore).createNotice('error', message, {
                id: noticeId,
                isDismissible: false,
                actions,
                context,
            });
        }, [context]),
        removeValidationNotice: useCallback((noticeId) => {
            void dispatch(noticesStore).removeNotice(noticeId, context);
        }, [context]),
    };
};
