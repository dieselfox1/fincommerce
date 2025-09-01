import { SendingPreviewStatus, State, PersonalizationTag, ContentValidation } from './types';
export declare function togglePreviewModal(isOpen: boolean): {
    readonly type: "CHANGE_PREVIEW_STATE";
    readonly state: Partial<State["preview"]>;
};
export declare function updateSendPreviewEmail(toEmail: string): {
    readonly type: "CHANGE_PREVIEW_STATE";
    readonly state: Partial<State["preview"]>;
};
export declare function setEmailPost(postId: number | string, postType: string): {
    readonly type: "SET_EMAIL_POST";
    readonly state: Partial<State>;
};
export declare const setTemplateToPost: (templateSlug: any) => ({ registry }: {
    registry: any;
}) => Promise<void>;
export declare function requestSendingNewsletterPreview(email: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    readonly type: "CHANGE_PREVIEW_STATE";
    readonly state: Partial<State["preview"]>;
} | {
    type: string;
    state: {
        sendingPreviewStatus: SendingPreviewStatus;
        isSendingPreviewEmail: boolean;
        errorMessage?: undefined;
    };
} | {
    type: string;
    state: {
        sendingPreviewStatus: SendingPreviewStatus;
        isSendingPreviewEmail: boolean;
        errorMessage: string;
    };
}, void, unknown>;
export declare function setIsFetchingPersonalizationTags(isFetching: boolean): {
    readonly type: "SET_IS_FETCHING_PERSONALIZATION_TAGS";
    readonly state: Partial<State["personalizationTags"]>;
};
export declare function setPersonalizationTagsList(list: PersonalizationTag[]): {
    readonly type: "SET_PERSONALIZATION_TAGS_LIST";
    readonly state: Partial<State["personalizationTags"]>;
};
export declare function setContentValidation(validation: ContentValidation | undefined): {
    readonly type: "SET_CONTENT_VALIDATION";
    readonly validation: ContentValidation;
};
