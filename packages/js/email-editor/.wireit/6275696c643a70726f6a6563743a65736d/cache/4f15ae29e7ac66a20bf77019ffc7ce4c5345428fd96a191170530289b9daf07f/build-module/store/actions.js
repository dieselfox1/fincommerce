/**
 * External dependencies
 */
import { select } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { apiFetch } from '@wordpress/data-controls';
/**
 * Internal dependencies
 */
import { storeName } from './constants';
import { SendingPreviewStatus, } from './types';
import { recordEvent } from '../events';
export function togglePreviewModal(isOpen) {
    return {
        type: 'CHANGE_PREVIEW_STATE',
        state: { isModalOpened: isOpen },
    };
}
export function updateSendPreviewEmail(toEmail) {
    return {
        type: 'CHANGE_PREVIEW_STATE',
        state: { toEmail },
    };
}
export function setEmailPost(postId, postType) {
    if (!postId || !postType) {
        throw new Error('setEmailPost requires valid postId and postType parameters');
    }
    return {
        type: 'SET_EMAIL_POST',
        state: { postId, postType },
    };
}
export const setTemplateToPost = (templateSlug) => async ({ registry }) => {
    const postId = registry.select(storeName).getEmailPostId();
    const postType = registry.select(storeName).getEmailPostType();
    registry
        .dispatch(coreDataStore)
        .editEntityRecord('postType', postType, postId, {
        template: templateSlug,
    });
};
export function* requestSendingNewsletterPreview(email) {
    // If preview is already sending do nothing
    const previewState = select(storeName).getPreviewState();
    if (previewState.isSendingPreviewEmail) {
        return;
    }
    // Initiate sending
    yield {
        type: 'CHANGE_PREVIEW_STATE',
        state: {
            sendingPreviewStatus: null,
            isSendingPreviewEmail: true,
        },
    };
    try {
        const postId = select(storeName).getEmailPostId();
        yield apiFetch({
            path: '/fincommerce-email-editor/v1/send_preview_email',
            method: 'POST',
            data: {
                email,
                postId,
            },
        });
        yield {
            type: 'CHANGE_PREVIEW_STATE',
            state: {
                sendingPreviewStatus: SendingPreviewStatus.SUCCESS,
                isSendingPreviewEmail: false,
            },
        };
        recordEvent('sent_preview_email', { postId, email });
    }
    catch (errorResponse) {
        recordEvent('sent_preview_email_error', { email });
        yield {
            type: 'CHANGE_PREVIEW_STATE',
            state: {
                sendingPreviewStatus: SendingPreviewStatus.ERROR,
                isSendingPreviewEmail: false,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                errorMessage: JSON.stringify(errorResponse?.error),
            },
        };
    }
}
export function setIsFetchingPersonalizationTags(isFetching) {
    return {
        type: 'SET_IS_FETCHING_PERSONALIZATION_TAGS',
        state: {
            isFetching,
        },
    };
}
export function setPersonalizationTagsList(list) {
    return {
        type: 'SET_PERSONALIZATION_TAGS_LIST',
        state: {
            list,
        },
    };
}
export function setContentValidation(validation) {
    return {
        type: 'SET_CONTENT_VALIDATION',
        validation,
    };
}
