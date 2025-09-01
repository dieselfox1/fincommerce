"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePreviewTemplates = usePreviewTemplates;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const blocks_1 = require("@wordpress/blocks");
const data_1 = require("@wordpress/data");
const hooks_1 = require("@wordpress/hooks");
/**
 * Internal dependencies
 */
const store_1 = require("../store");
// Shared reference to an empty array for cases where it is important to avoid
// returning a new array reference on every invocation
const EMPTY_ARRAY = [];
/**
 * We need to merge pattern blocks and template blocks for BlockPreview component.
 *
 * @param templateBlocks - Parsed template blocks
 * @param innerBlocks    - Blocks to be set as content blocks for the template preview
 */
function setPostContentInnerBlocks(templateBlocks, innerBlocks) {
    return templateBlocks.map((block) => {
        if (block.name === 'core/post-content') {
            return {
                ...block,
                name: 'core/group', // Change the name to group to render the innerBlocks
                innerBlocks,
            };
        }
        if (block.innerBlocks?.length) {
            return {
                ...block,
                innerBlocks: setPostContentInnerBlocks(block.innerBlocks, innerBlocks),
            };
        }
        return block;
    });
}
const InternalTemplateCache = {};
/**
 * @param post
 * @param allTemplates
 */
function generateTemplateContent(post, allTemplates = []) {
    const contentTemplate = post.template;
    const defaultReturnObject = {
        postTemplateContent: null,
    };
    if (!contentTemplate) {
        return defaultReturnObject;
    }
    if (InternalTemplateCache[contentTemplate]) {
        return InternalTemplateCache[contentTemplate];
    }
    const postTemplate = allTemplates.find((template) => template.slug === contentTemplate);
    if (!postTemplate) {
        return defaultReturnObject;
    }
    const templateContent = {
        postTemplateContent: postTemplate?.template,
    };
    InternalTemplateCache[contentTemplate] = templateContent;
    return templateContent;
}
function usePreviewTemplates(customEmailContent = '') {
    const { templates, patterns, emailPosts, hasEmailPosts } = (0, data_1.useSelect)((select) => {
        const rawEmailPosts = customEmailContent !== 'swap'
            ? select(store_1.storeName).getSentEmailEditorPosts()
            : undefined;
        return {
            templates: select(store_1.storeName).getEmailTemplates(),
            patterns: select(store_1.storeName).getBlockPatternsForEmailTemplate(),
            emailPosts: rawEmailPosts,
            hasEmailPosts: !!(rawEmailPosts && rawEmailPosts?.length),
        };
    }, [customEmailContent]);
    const allTemplates = (0, element_1.useMemo)(() => {
        let contentPatterns = [];
        const parsedCustomEmailContent = customEmailContent && (0, blocks_1.parse)(customEmailContent);
        // If there is a custom email content passed from outside we use it as email content for preview
        // otherwise generate one preview per template and pattern
        if (parsedCustomEmailContent) {
            contentPatterns = [{ blocks: parsedCustomEmailContent }];
        }
        else {
            contentPatterns = patterns;
        }
        if (!contentPatterns || !templates) {
            return EMPTY_ARRAY;
        }
        const templateToPreview = [];
        // We don't want to show the blank template in the list
        templates
            ?.filter((template) => template.slug !== 'email-general')
            ?.forEach((template) => {
            contentPatterns?.forEach((contentPattern) => {
                let parsedTemplate = (0, blocks_1.parse)(template.content?.raw);
                parsedTemplate = setPostContentInnerBlocks(parsedTemplate, contentPattern.blocks);
                templateToPreview.push({
                    id: template.id,
                    slug: template.slug,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    previewContentParsed: parsedTemplate,
                    emailParsed: contentPattern.blocks,
                    template,
                    category: 'basic', // TODO: This will be updated once template category is implemented
                    type: template.type,
                    displayName: contentPattern.title
                        ? `${template.title.rendered} - ${contentPattern.title}`
                        : template.title.rendered,
                });
            });
        });
        return templateToPreview;
    }, [templates, patterns, customEmailContent]);
    const allEmailPosts = (0, element_1.useMemo)(() => {
        return emailPosts?.map((post) => {
            const preferredTitle = (0, hooks_1.applyFilters)('fincommerce_email_editor_preferred_template_title', '', post);
            const { postTemplateContent } = generateTemplateContent(post, allTemplates);
            const parsedPostContent = (0, blocks_1.parse)(post.content?.raw);
            let parsedPostContentWithTemplate = parsedPostContent;
            if (postTemplateContent?.content?.raw) {
                parsedPostContentWithTemplate = setPostContentInnerBlocks((0, blocks_1.parse)(postTemplateContent?.content?.raw), parsedPostContent);
            }
            const template = {
                ...post,
                title: {
                    raw: post.title.raw,
                    rendered: preferredTitle || post.title.rendered,
                },
            };
            return {
                id: post.id,
                slug: post.slug,
                previewContentParsed: parsedPostContentWithTemplate,
                emailParsed: parsedPostContent,
                category: 'recent',
                type: post.type,
                displayName: template.title.rendered,
                template,
            };
        });
    }, [emailPosts, allTemplates]);
    return [
        allTemplates || EMPTY_ARRAY,
        allEmailPosts || EMPTY_ARRAY,
        hasEmailPosts,
    ];
}
