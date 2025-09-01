import { Post } from '@wordpress/core-data/build-types/entity-types/post';
import { State, EmailTemplate, Feature } from './types';
export declare const isFeatureActive: (_: any, feature: Feature) => boolean;
export declare const hasEdits: () => boolean;
export declare const hasEmptyContent: () => boolean;
export declare const isEmailSent: () => boolean;
/**
 * Returns the content of the email being edited.
 *
 * @param {Object} state Global application state.
 * @return {string} Post content.
 */
export declare const getEditedEmailContent: () => string;
export declare const getSentEmailEditorPosts: () => (import("@wordpress/core-data").Attachment<any> | import("@wordpress/core-data").Comment<any> | import("@wordpress/core-data").GlobalStylesRevision<any> | import("@wordpress/core-data").MenuLocation<any> | import("@wordpress/core-data").NavMenu<any> | import("@wordpress/core-data").NavMenuItem<any> | import("@wordpress/core-data").Page<any> | import("@wordpress/core-data").Plugin<any> | Post<any> | import("@wordpress/core-data").PostRevision<any> | import("@wordpress/core-data").Settings<any> | import("@wordpress/core-data").Sidebar<any> | import("@wordpress/core-data").Taxonomy<any> | import("@wordpress/core-data").Theme<any> | import("@wordpress/core-data").User<any> | import("@wordpress/core-data").Type<any> | import("@wordpress/core-data").Widget<any> | import("@wordpress/core-data").WidgetType<any> | import("@wordpress/core-data").WpTemplate<any> | import("@wordpress/core-data").WpTemplatePart<any> | Partial<import("@wordpress/core-data").Attachment<any> | import("@wordpress/core-data").Comment<any> | import("@wordpress/core-data").GlobalStylesRevision<any> | import("@wordpress/core-data").MenuLocation<any> | import("@wordpress/core-data").NavMenu<any> | import("@wordpress/core-data").NavMenuItem<any> | import("@wordpress/core-data").Page<any> | import("@wordpress/core-data").Plugin<any> | Post<any> | import("@wordpress/core-data").PostRevision<any> | import("@wordpress/core-data").Settings<any> | import("@wordpress/core-data").Sidebar<any> | import("@wordpress/core-data").Taxonomy<any> | import("@wordpress/core-data").Theme<any> | import("@wordpress/core-data").User<any> | import("@wordpress/core-data").Type<any> | import("@wordpress/core-data").Widget<any> | import("@wordpress/core-data").WidgetType<any> | import("@wordpress/core-data").WpTemplate<any> | import("@wordpress/core-data").WpTemplatePart<any>>)[];
export declare const getBlockPatternsForEmailTemplate: (() => any[]) & import("rememo").EnhancedSelector;
export declare const canUserEditTemplates: () => boolean;
/**
 * COPIED FROM https://github.com/WordPress/gutenberg/blob/9c6d4fe59763b188d27ad937c2f0daa39e4d9341/packages/edit-post/src/store/selectors.js
 * Retrieves the template of the currently edited post.
 *
 * @return {Object?} Post Template.
 */
export declare const getEditedPostTemplate: (_state: any, templateSlug?: string) => EmailTemplate | null;
export declare const getCurrentTemplate: () => EmailTemplate;
export declare const getCurrentTemplateContent: () => string;
export declare const canUserEditGlobalEmailStyles: () => {
    postId: number;
    canEdit: boolean;
};
export declare const getGlobalEmailStylesPost: () => Post;
/**
 * Retrieves the email templates.
 */
export declare const getEmailTemplates: () => (import("@wordpress/core-data").Attachment<any> | import("@wordpress/core-data").Comment<any> | import("@wordpress/core-data").GlobalStylesRevision<any> | import("@wordpress/core-data").MenuLocation<any> | import("@wordpress/core-data").NavMenu<any> | import("@wordpress/core-data").NavMenuItem<any> | import("@wordpress/core-data").Page<any> | import("@wordpress/core-data").Plugin<any> | Post<any> | import("@wordpress/core-data").PostRevision<any> | import("@wordpress/core-data").Settings<any> | import("@wordpress/core-data").Sidebar<any> | import("@wordpress/core-data").Taxonomy<any> | import("@wordpress/core-data").Theme<any> | import("@wordpress/core-data").User<any> | import("@wordpress/core-data").Type<any> | import("@wordpress/core-data").Widget<any> | import("@wordpress/core-data").WidgetType<any> | import("@wordpress/core-data").WpTemplate<any> | import("@wordpress/core-data").WpTemplatePart<any> | Partial<import("@wordpress/core-data").Attachment<any> | import("@wordpress/core-data").Comment<any> | import("@wordpress/core-data").GlobalStylesRevision<any> | import("@wordpress/core-data").MenuLocation<any> | import("@wordpress/core-data").NavMenu<any> | import("@wordpress/core-data").NavMenuItem<any> | import("@wordpress/core-data").Page<any> | import("@wordpress/core-data").Plugin<any> | Post<any> | import("@wordpress/core-data").PostRevision<any> | import("@wordpress/core-data").Settings<any> | import("@wordpress/core-data").Sidebar<any> | import("@wordpress/core-data").Taxonomy<any> | import("@wordpress/core-data").Theme<any> | import("@wordpress/core-data").User<any> | import("@wordpress/core-data").Type<any> | import("@wordpress/core-data").Widget<any> | import("@wordpress/core-data").WidgetType<any> | import("@wordpress/core-data").WpTemplate<any> | import("@wordpress/core-data").WpTemplatePart<any>>)[];
export declare function getEmailPostId(state: State): number | string;
export declare function getEmailPostType(state: State): string;
export declare function getInitialEditorSettings(state: State): State['editorSettings'];
export declare function getPaletteColors(state: State): State['editorSettings']['__experimentalFeatures']['color']['palette'];
export declare function getPreviewState(state: State): State['preview'];
export declare function getPersonalizationTagsState(state: State): State['personalizationTags'];
export declare const getPersonalizationTagsList: (state: State) => import("./types").PersonalizationTag[];
export declare function getStyles(state: State): State['theme']['styles'];
export declare function getTheme(state: State): State['theme'];
export declare function getGlobalStylesPostId(state: State): number | null;
export declare function getUrls(state: State): State['urls'];
export declare function getContentValidation(state: State): State['contentValidation'];
