export declare function getPersonalizationTagsList(): Generator<({
    getEmailPostId: () => string | number;
    getEmailPostType: () => string;
    getInitialEditorSettings: () => import("./types").EmailEditorSettings;
    getPaletteColors: () => {
        default: import("@wordpress/block-editor").EditorColor[];
        theme: import("@wordpress/block-editor").EditorColor[];
    };
    getPreviewState: () => {
        toEmail: string;
        isModalOpened: boolean;
        isSendingPreviewEmail: boolean;
        sendingPreviewStatus: import("./types").SendingPreviewStatus | null;
        errorMessage?: string;
    };
    getPersonalizationTagsState: () => {
        list: import("./types").PersonalizationTag[];
        isFetching: boolean;
    };
    getStyles: () => import("./types").EmailStyles;
    getTheme: () => import("./types").EmailTheme;
    getGlobalStylesPostId: () => number;
    getUrls: () => import("./types").EmailEditorUrls;
    getContentValidation: () => import("./types").ContentValidation;
    readonly isFeatureActive: (feature: import("./types").Feature) => boolean;
    readonly hasEdits: () => boolean;
    readonly hasEmptyContent: () => boolean;
    readonly isEmailSent: () => boolean;
    readonly getEditedEmailContent: () => string;
    readonly getSentEmailEditorPosts: () => (import("@wordpress/core-data").Attachment<any> | import("@wordpress/core-data").Comment<any> | import("@wordpress/core-data").GlobalStylesRevision<any> | import("@wordpress/core-data").MenuLocation<any> | import("@wordpress/core-data").NavMenu<any> | import("@wordpress/core-data").NavMenuItem<any> | import("@wordpress/core-data").Page<any> | import("@wordpress/core-data").Plugin<any> | import("@wordpress/core-data").Post<any> | import("@wordpress/core-data").PostRevision<any> | import("@wordpress/core-data").Settings<any> | import("@wordpress/core-data").Sidebar<any> | import("@wordpress/core-data").Taxonomy<any> | import("@wordpress/core-data").Theme<any> | import("@wordpress/core-data").User<any> | import("@wordpress/core-data").Type<any> | import("@wordpress/core-data").Widget<any> | import("@wordpress/core-data").WidgetType<any> | import("@wordpress/core-data").WpTemplate<any> | import("@wordpress/core-data").WpTemplatePart<any> | Partial<import("@wordpress/core-data").Attachment<any> | import("@wordpress/core-data").Comment<any> | import("@wordpress/core-data").GlobalStylesRevision<any> | import("@wordpress/core-data").MenuLocation<any> | import("@wordpress/core-data").NavMenu<any> | import("@wordpress/core-data").NavMenuItem<any> | import("@wordpress/core-data").Page<any> | import("@wordpress/core-data").Plugin<any> | import("@wordpress/core-data").Post<any> | import("@wordpress/core-data").PostRevision<any> | import("@wordpress/core-data").Settings<any> | import("@wordpress/core-data").Sidebar<any> | import("@wordpress/core-data").Taxonomy<any> | import("@wordpress/core-data").Theme<any> | import("@wordpress/core-data").User<any> | import("@wordpress/core-data").Type<any> | import("@wordpress/core-data").Widget<any> | import("@wordpress/core-data").WidgetType<any> | import("@wordpress/core-data").WpTemplate<any> | import("@wordpress/core-data").WpTemplatePart<any>>)[];
    readonly getBlockPatternsForEmailTemplate: () => any[];
    readonly canUserEditTemplates: () => boolean;
    readonly getEditedPostTemplate: (templateSlug?: string) => import("./types").EmailTemplate;
    readonly getCurrentTemplate: () => import("./types").EmailTemplate;
    readonly getCurrentTemplateContent: () => string;
    readonly canUserEditGlobalEmailStyles: () => {
        postId: number;
        canEdit: boolean;
    };
    readonly getGlobalEmailStylesPost: () => import("@wordpress/core-data").Post;
    readonly getEmailTemplates: () => (import("@wordpress/core-data").Attachment<any> | import("@wordpress/core-data").Comment<any> | import("@wordpress/core-data").GlobalStylesRevision<any> | import("@wordpress/core-data").MenuLocation<any> | import("@wordpress/core-data").NavMenu<any> | import("@wordpress/core-data").NavMenuItem<any> | import("@wordpress/core-data").Page<any> | import("@wordpress/core-data").Plugin<any> | import("@wordpress/core-data").Post<any> | import("@wordpress/core-data").PostRevision<any> | import("@wordpress/core-data").Settings<any> | import("@wordpress/core-data").Sidebar<any> | import("@wordpress/core-data").Taxonomy<any> | import("@wordpress/core-data").Theme<any> | import("@wordpress/core-data").User<any> | import("@wordpress/core-data").Type<any> | import("@wordpress/core-data").Widget<any> | import("@wordpress/core-data").WidgetType<any> | import("@wordpress/core-data").WpTemplate<any> | import("@wordpress/core-data").WpTemplatePart<any> | Partial<import("@wordpress/core-data").Attachment<any> | import("@wordpress/core-data").Comment<any> | import("@wordpress/core-data").GlobalStylesRevision<any> | import("@wordpress/core-data").MenuLocation<any> | import("@wordpress/core-data").NavMenu<any> | import("@wordpress/core-data").NavMenuItem<any> | import("@wordpress/core-data").Page<any> | import("@wordpress/core-data").Plugin<any> | import("@wordpress/core-data").Post<any> | import("@wordpress/core-data").PostRevision<any> | import("@wordpress/core-data").Settings<any> | import("@wordpress/core-data").Sidebar<any> | import("@wordpress/core-data").Taxonomy<any> | import("@wordpress/core-data").Theme<any> | import("@wordpress/core-data").User<any> | import("@wordpress/core-data").Type<any> | import("@wordpress/core-data").Widget<any> | import("@wordpress/core-data").WidgetType<any> | import("@wordpress/core-data").WpTemplate<any> | import("@wordpress/core-data").WpTemplatePart<any>>)[];
    readonly getPersonalizationTagsList: () => import("./types").PersonalizationTag[];
} & {
    getResolutionState: (selectorName: "getEmailPostId" | "getEmailPostType" | "getInitialEditorSettings" | "getPaletteColors" | "getPreviewState" | "getPersonalizationTagsState" | "getStyles" | "getTheme" | "getGlobalStylesPostId" | "getUrls" | "getContentValidation" | "isFeatureActive" | "hasEdits" | "hasEmptyContent" | "isEmailSent" | "getEditedEmailContent" | "getSentEmailEditorPosts" | "getBlockPatternsForEmailTemplate" | "canUserEditTemplates" | "getEditedPostTemplate" | "getCurrentTemplate" | "getCurrentTemplateContent" | "canUserEditGlobalEmailStyles" | "getGlobalEmailStylesPost" | "getEmailTemplates" | "getPersonalizationTagsList", args: [] | [templateSlug?: string] | [feature: import("./types").Feature]) => import("@wordpress/data/build-types/redux-store/metadata/reducer").StateValue;
    getIsResolving: (selectorName: "getEmailPostId" | "getEmailPostType" | "getInitialEditorSettings" | "getPaletteColors" | "getPreviewState" | "getPersonalizationTagsState" | "getStyles" | "getTheme" | "getGlobalStylesPostId" | "getUrls" | "getContentValidation" | "isFeatureActive" | "hasEdits" | "hasEmptyContent" | "isEmailSent" | "getEditedEmailContent" | "getSentEmailEditorPosts" | "getBlockPatternsForEmailTemplate" | "canUserEditTemplates" | "getEditedPostTemplate" | "getCurrentTemplate" | "getCurrentTemplateContent" | "canUserEditGlobalEmailStyles" | "getGlobalEmailStylesPost" | "getEmailTemplates" | "getPersonalizationTagsList", args: [] | [templateSlug?: string] | [feature: import("./types").Feature]) => boolean;
    hasStartedResolution: (selectorName: "getEmailPostId" | "getEmailPostType" | "getInitialEditorSettings" | "getPaletteColors" | "getPreviewState" | "getPersonalizationTagsState" | "getStyles" | "getTheme" | "getGlobalStylesPostId" | "getUrls" | "getContentValidation" | "isFeatureActive" | "hasEdits" | "hasEmptyContent" | "isEmailSent" | "getEditedEmailContent" | "getSentEmailEditorPosts" | "getBlockPatternsForEmailTemplate" | "canUserEditTemplates" | "getEditedPostTemplate" | "getCurrentTemplate" | "getCurrentTemplateContent" | "canUserEditGlobalEmailStyles" | "getGlobalEmailStylesPost" | "getEmailTemplates" | "getPersonalizationTagsList", args: [] | [templateSlug?: string] | [feature: import("./types").Feature]) => boolean;
    hasFinishedResolution: (selectorName: "getEmailPostId" | "getEmailPostType" | "getInitialEditorSettings" | "getPaletteColors" | "getPreviewState" | "getPersonalizationTagsState" | "getStyles" | "getTheme" | "getGlobalStylesPostId" | "getUrls" | "getContentValidation" | "isFeatureActive" | "hasEdits" | "hasEmptyContent" | "isEmailSent" | "getEditedEmailContent" | "getSentEmailEditorPosts" | "getBlockPatternsForEmailTemplate" | "canUserEditTemplates" | "getEditedPostTemplate" | "getCurrentTemplate" | "getCurrentTemplateContent" | "canUserEditGlobalEmailStyles" | "getGlobalEmailStylesPost" | "getEmailTemplates" | "getPersonalizationTagsList", args: [] | [templateSlug?: string] | [feature: import("./types").Feature]) => boolean;
    hasResolutionFailed: (selectorName: "getEmailPostId" | "getEmailPostType" | "getInitialEditorSettings" | "getPaletteColors" | "getPreviewState" | "getPersonalizationTagsState" | "getStyles" | "getTheme" | "getGlobalStylesPostId" | "getUrls" | "getContentValidation" | "isFeatureActive" | "hasEdits" | "hasEmptyContent" | "isEmailSent" | "getEditedEmailContent" | "getSentEmailEditorPosts" | "getBlockPatternsForEmailTemplate" | "canUserEditTemplates" | "getEditedPostTemplate" | "getCurrentTemplate" | "getCurrentTemplateContent" | "canUserEditGlobalEmailStyles" | "getGlobalEmailStylesPost" | "getEmailTemplates" | "getPersonalizationTagsList", args: [] | [templateSlug?: string] | [feature: import("./types").Feature]) => boolean;
    getResolutionError: (selectorName: "getEmailPostId" | "getEmailPostType" | "getInitialEditorSettings" | "getPaletteColors" | "getPreviewState" | "getPersonalizationTagsState" | "getStyles" | "getTheme" | "getGlobalStylesPostId" | "getUrls" | "getContentValidation" | "isFeatureActive" | "hasEdits" | "hasEmptyContent" | "isEmailSent" | "getEditedEmailContent" | "getSentEmailEditorPosts" | "getBlockPatternsForEmailTemplate" | "canUserEditTemplates" | "getEditedPostTemplate" | "getCurrentTemplate" | "getCurrentTemplateContent" | "canUserEditGlobalEmailStyles" | "getGlobalEmailStylesPost" | "getEmailTemplates" | "getPersonalizationTagsList", args: [] | [templateSlug?: string] | [feature: import("./types").Feature]) => unknown;
    isResolving: (selectorName: "getEmailPostId" | "getEmailPostType" | "getInitialEditorSettings" | "getPaletteColors" | "getPreviewState" | "getPersonalizationTagsState" | "getStyles" | "getTheme" | "getGlobalStylesPostId" | "getUrls" | "getContentValidation" | "isFeatureActive" | "hasEdits" | "hasEmptyContent" | "isEmailSent" | "getEditedEmailContent" | "getSentEmailEditorPosts" | "getBlockPatternsForEmailTemplate" | "canUserEditTemplates" | "getEditedPostTemplate" | "getCurrentTemplate" | "getCurrentTemplateContent" | "canUserEditGlobalEmailStyles" | "getGlobalEmailStylesPost" | "getEmailTemplates" | "getPersonalizationTagsList", args: [] | [templateSlug?: string] | [feature: import("./types").Feature]) => boolean;
    getCachedResolvers: () => Record<string, import("@wordpress/data/build-types/redux-store/metadata/reducer").State>;
    hasResolvingSelectors: () => boolean;
    countSelectorsByStatus: () => {};
}) | {
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    readonly type: "SET_IS_FETCHING_PERSONALIZATION_TAGS";
    readonly state: Partial<import("./types").State["personalizationTags"]>;
} | {
    readonly type: "SET_PERSONALIZATION_TAGS_LIST";
    readonly state: Partial<import("./types").State["personalizationTags"]>;
}, void, unknown>;
