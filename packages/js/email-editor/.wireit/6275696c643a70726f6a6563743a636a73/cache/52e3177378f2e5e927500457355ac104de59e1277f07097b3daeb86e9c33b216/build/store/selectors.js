"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonalizationTagsList = exports.getEmailTemplates = exports.getGlobalEmailStylesPost = exports.canUserEditGlobalEmailStyles = exports.getCurrentTemplateContent = exports.getCurrentTemplate = exports.getEditedPostTemplate = exports.canUserEditTemplates = exports.getBlockPatternsForEmailTemplate = exports.getSentEmailEditorPosts = exports.getEditedEmailContent = exports.isEmailSent = exports.hasEmptyContent = exports.hasEdits = exports.isFeatureActive = void 0;
exports.getEmailPostId = getEmailPostId;
exports.getEmailPostType = getEmailPostType;
exports.getInitialEditorSettings = getInitialEditorSettings;
exports.getPaletteColors = getPaletteColors;
exports.getPreviewState = getPreviewState;
exports.getPersonalizationTagsState = getPersonalizationTagsState;
exports.getStyles = getStyles;
exports.getTheme = getTheme;
exports.getGlobalStylesPostId = getGlobalStylesPostId;
exports.getUrls = getUrls;
exports.getContentValidation = getContentValidation;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const core_data_1 = require("@wordpress/core-data");
const editor_1 = require("@wordpress/editor");
const preferences_1 = require("@wordpress/preferences");
const blocks_1 = require("@wordpress/blocks");
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
function getContentFromEntity(entity) {
    if (entity?.content && typeof entity.content === 'function') {
        return entity.content(entity);
    }
    if (entity?.blocks) {
        return (0, blocks_1.serialize)(entity.blocks);
    }
    if (entity?.content) {
        return entity.content;
    }
    return '';
}
const patternsWithParsedBlocks = new WeakMap();
function enhancePatternWithParsedBlocks(pattern) {
    let enhancedPattern = patternsWithParsedBlocks.get(pattern);
    if (!enhancedPattern) {
        enhancedPattern = {
            ...pattern,
            get blocks() {
                return (0, blocks_1.parse)(pattern.content);
            },
        };
        patternsWithParsedBlocks.set(pattern, enhancedPattern);
    }
    return enhancedPattern;
}
function regularizedGetEntityRecord(template) {
    if (!template) {
        return null;
    }
    return {
        ...template,
        title: template?.title?.raw || template?.title || '',
        content: template?.content?.raw || template?.content || '',
    };
}
exports.isFeatureActive = (0, data_1.createRegistrySelector)((select) => (_, feature) => !!select(preferences_1.store).get(constants_1.storeName, feature));
exports.hasEdits = (0, data_1.createRegistrySelector)((select) => () => {
    const postId = select(constants_1.storeName).getEmailPostId();
    const postType = select(constants_1.storeName).getEmailPostType();
    return !!select(core_data_1.store).hasEditsForEntityRecord('postType', postType, postId);
});
exports.hasEmptyContent = (0, data_1.createRegistrySelector)((select) => () => {
    const postId = select(constants_1.storeName).getEmailPostId();
    const postType = select(constants_1.storeName).getEmailPostType();
    const post = select(core_data_1.store).getEntityRecord('postType', postType, postId);
    if (!post) {
        return true;
    }
    // @ts-expect-error Missing property in type
    const { content } = post;
    return !content.raw;
});
exports.isEmailSent = (0, data_1.createRegistrySelector)((select) => () => {
    const postId = select(constants_1.storeName).getEmailPostId();
    const postType = select(constants_1.storeName).getEmailPostType();
    const post = select(core_data_1.store).getEntityRecord('postType', postType, postId);
    if (!post) {
        return false;
    }
    // @ts-expect-error Missing property in type
    const status = post.status;
    return status === 'sent';
});
/**
 * Returns the content of the email being edited.
 *
 * @param {Object} state Global application state.
 * @return {string} Post content.
 */
exports.getEditedEmailContent = (0, data_1.createRegistrySelector)((select) => () => {
    const postId = select(constants_1.storeName).getEmailPostId();
    const postType = select(constants_1.storeName).getEmailPostType();
    const record = select(core_data_1.store).getEditedEntityRecord('postType', postType, postId);
    if (record) {
        return getContentFromEntity(record);
    }
    return '';
});
exports.getSentEmailEditorPosts = (0, data_1.createRegistrySelector)((select) => () => {
    const postType = select(constants_1.storeName).getEmailPostType();
    return (select(core_data_1.store)
        .getEntityRecords('postType', postType, {
        per_page: 30, // show a maximum of 30 for now
        status: 'publish,sent', // show only sent emails
    })
        ?.filter((post) => post?.content?.raw !== '' // filter out empty content
    ) || []);
});
exports.getBlockPatternsForEmailTemplate = (0, data_1.createRegistrySelector)((select) => {
    const emailPostType = select(constants_1.storeName).getEmailPostType();
    return (0, data_1.createSelector)(() => emailPostType
        ? select(core_data_1.store)
            .getBlockPatterns()
            .filter(({ templateTypes, postTypes }) => {
            return (
            // Make sure the template type matches the required one.
            Array.isArray(templateTypes) &&
                templateTypes.includes('email-template') &&
                // The current post type must be matched when post types are set.
                (postTypes === undefined ||
                    postTypes.length === 0 ||
                    postTypes.includes(emailPostType)));
        })
            .map(enhancePatternWithParsedBlocks)
        : [], () => [select(core_data_1.store).getBlockPatterns(), emailPostType]);
});
exports.canUserEditTemplates = (0, data_1.createRegistrySelector)((select) => () => {
    // @ts-expect-error Selector is not typed
    return select(core_data_1.store).canUser('create', {
        kind: 'postType',
        name: 'wp_template',
    });
});
function getTemplate(select, templateId) {
    if ((0, exports.canUserEditTemplates)()) {
        return select(core_data_1.store).getEditedEntityRecord('postType', 'wp_template', templateId);
    }
    return regularizedGetEntityRecord(select(core_data_1.store).getEntityRecord('postType', 'wp_template', templateId, { context: 'view' }));
}
/**
 * COPIED FROM https://github.com/WordPress/gutenberg/blob/9c6d4fe59763b188d27ad937c2f0daa39e4d9341/packages/edit-post/src/store/selectors.js
 * Retrieves the template of the currently edited post.
 *
 * @return {Object?} Post Template.
 */
exports.getEditedPostTemplate = (0, data_1.createRegistrySelector)((select) => (_state, templateSlug) => {
    const currentTemplate = templateSlug ||
        select(editor_1.store).getEditedPostAttribute('template');
    if (currentTemplate) {
        const query = {
            context: 'view',
            per_page: -1,
            _fincommerce_email_editor: 'fetch-all-templates', // Unused parameter to avoid using cached response.
        };
        const templateWithSameSlug = select(core_data_1.store)
            .getEntityRecords('postType', 'wp_template', query)
            // @ts-expect-error Missing property in type
            ?.find((template) => template.slug === currentTemplate);
        if (!templateWithSameSlug) {
            return null;
        }
        // @ts-expect-error getEditedPostAttribute
        return getTemplate(select, templateWithSameSlug.id);
    }
    const defaultTemplateId = select(core_data_1.store).getDefaultTemplateId({
        slug: 'email-general',
    });
    return getTemplate(select, defaultTemplateId);
});
exports.getCurrentTemplate = (0, data_1.createRegistrySelector)((select) => () => {
    const isEditingTemplate = select(editor_1.store).getCurrentPostType() === 'wp_template';
    if (isEditingTemplate) {
        const templateId = select(editor_1.store).getCurrentPostId();
        return select(core_data_1.store).getEditedEntityRecord('postType', 'wp_template', 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        templateId);
    }
    return select(constants_1.storeName).getEditedPostTemplate();
});
const getCurrentTemplateContent = () => {
    const template = (0, exports.getCurrentTemplate)();
    if (template) {
        return getContentFromEntity(template);
    }
    return '';
};
exports.getCurrentTemplateContent = getCurrentTemplateContent;
exports.canUserEditGlobalEmailStyles = (0, data_1.createRegistrySelector)((select) => () => {
    const postId = select(constants_1.storeName).getGlobalStylesPostId();
    // @ts-expect-error Selector is not typed
    const canEdit = select(core_data_1.store).canUser('update', {
        kind: 'root',
        name: 'globalStyles',
        id: postId,
    });
    return { postId, canEdit };
});
exports.getGlobalEmailStylesPost = (0, data_1.createRegistrySelector)((select) => () => {
    const { postId, canEdit } = (0, exports.canUserEditGlobalEmailStyles)();
    if (!postId || canEdit === undefined) {
        return null;
    }
    if (postId) {
        if (canEdit) {
            return select(core_data_1.store).getEditedEntityRecord('postType', 'wp_global_styles', postId);
        }
        return regularizedGetEntityRecord(select(core_data_1.store).getEntityRecord('postType', 'wp_global_styles', postId, { context: 'view' }));
    }
    return null;
});
/**
 * Retrieves the email templates.
 */
exports.getEmailTemplates = (0, data_1.createRegistrySelector)((select) => () => {
    const postType = select(constants_1.storeName).getEmailPostType();
    return (select(core_data_1.store)
        .getEntityRecords('postType', 'wp_template', {
        per_page: -1,
        post_type: postType,
        context: 'view',
    })
        // We still need to filter the templates because, in some cases, the API also returns custom templates
        // ignoring the post_type filter in the query
        ?.filter((template) => 
    // @ts-expect-error Missing property in type
    template.post_types.includes(postType)));
});
function getEmailPostId(state) {
    return state.postId;
}
function getEmailPostType(state) {
    return state.postType;
}
function getInitialEditorSettings(state) {
    return state.editorSettings;
}
function getPaletteColors(state) {
    // eslint-disable-next-line no-underscore-dangle
    return state.editorSettings.__experimentalFeatures.color.palette;
}
function getPreviewState(state) {
    return state.preview;
}
function getPersonalizationTagsState(state) {
    return state.personalizationTags;
}
exports.getPersonalizationTagsList = (0, data_1.createRegistrySelector)((select) => (state) => {
    const tags = state.personalizationTags.list;
    const postType = select(constants_1.storeName).getEmailPostType();
    if (!postType) {
        return tags;
    }
    // When postType is template, we filter tags by registered template postTypes.
    if (postType === 'wp_template') {
        const postTemplate = select(constants_1.storeName).getCurrentTemplate();
        return tags.filter((tag) => {
            return (tag.postTypes === undefined ||
                tag.postTypes.length === 0 ||
                (Array.isArray(postTemplate.post_types) &&
                    postTemplate.post_types.some((pt) => tag.postTypes.includes(pt))));
        });
    }
    return tags.filter((tag) => {
        return (tag.postTypes === undefined ||
            tag.postTypes.length === 0 ||
            tag.postTypes.includes(postType));
    });
});
function getStyles(state) {
    return state.theme.styles;
}
function getTheme(state) {
    return state.theme;
}
function getGlobalStylesPostId(state) {
    return state.styles.globalStylesPostId;
}
function getUrls(state) {
    return state.urls;
}
function getContentValidation(state) {
    return state.contentValidation;
}
