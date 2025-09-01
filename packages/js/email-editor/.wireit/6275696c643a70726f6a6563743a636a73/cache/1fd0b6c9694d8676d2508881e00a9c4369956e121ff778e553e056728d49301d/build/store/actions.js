"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTemplateToPost = void 0;
exports.togglePreviewModal = togglePreviewModal;
exports.updateSendPreviewEmail = updateSendPreviewEmail;
exports.setEmailPost = setEmailPost;
exports.requestSendingNewsletterPreview = requestSendingNewsletterPreview;
exports.setIsFetchingPersonalizationTags = setIsFetchingPersonalizationTags;
exports.setPersonalizationTagsList = setPersonalizationTagsList;
exports.setContentValidation = setContentValidation;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const core_data_1 = require("@wordpress/core-data");
const data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
const types_1 = require("./types");
const events_1 = require("../events");
function togglePreviewModal(isOpen) {
    return {
        type: 'CHANGE_PREVIEW_STATE',
        state: { isModalOpened: isOpen },
    };
}
function updateSendPreviewEmail(toEmail) {
    return {
        type: 'CHANGE_PREVIEW_STATE',
        state: { toEmail },
    };
}
function setEmailPost(postId, postType) {
    if (!postId || !postType) {
        throw new Error('setEmailPost requires valid postId and postType parameters');
    }
    return {
        type: 'SET_EMAIL_POST',
        state: { postId, postType },
    };
}
const setTemplateToPost = (templateSlug) => async ({ registry }) => {
    const postId = registry.select(constants_1.storeName).getEmailPostId();
    const postType = registry.select(constants_1.storeName).getEmailPostType();
    registry
        .dispatch(core_data_1.store)
        .editEntityRecord('postType', postType, postId, {
        template: templateSlug,
    });
};
exports.setTemplateToPost = setTemplateToPost;
function* requestSendingNewsletterPreview(email) {
    // If preview is already sending do nothing
    const previewState = (0, data_1.select)(constants_1.storeName).getPreviewState();
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
        const postId = (0, data_1.select)(constants_1.storeName).getEmailPostId();
        yield (0, data_controls_1.apiFetch)({
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
                sendingPreviewStatus: types_1.SendingPreviewStatus.SUCCESS,
                isSendingPreviewEmail: false,
            },
        };
        (0, events_1.recordEvent)('sent_preview_email', { postId, email });
    }
    catch (errorResponse) {
        (0, events_1.recordEvent)('sent_preview_email_error', { email });
        yield {
            type: 'CHANGE_PREVIEW_STATE',
            state: {
                sendingPreviewStatus: types_1.SendingPreviewStatus.ERROR,
                isSendingPreviewEmail: false,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                errorMessage: JSON.stringify(errorResponse?.error),
            },
        };
    }
}
function setIsFetchingPersonalizationTags(isFetching) {
    return {
        type: 'SET_IS_FETCHING_PERSONALIZATION_TAGS',
        state: {
            isFetching,
        },
    };
}
function setPersonalizationTagsList(list) {
    return {
        type: 'SET_PERSONALIZATION_TAGS_LIST',
        state: {
            list,
        },
    };
}
function setContentValidation(validation) {
    return {
        type: 'SET_CONTENT_VALIDATION',
        validation,
    };
}
