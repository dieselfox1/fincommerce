"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedBlockNames = void 0;
exports.initBlocks = initBlocks;
/**
 * External dependencies
 */
const block_library_1 = require("@wordpress/block-library");
/**
 * Internal dependencies
 */
const columns_1 = require("./core/columns");
const post_content_1 = require("./core/post-content");
const group_1 = require("./core/group");
const image_1 = require("./core/image");
const rich_text_1 = require("./core/rich-text");
const buttons_1 = require("./core/buttons");
const general_block_support_1 = require("./core/general-block-support");
const quote_1 = require("./core/quote");
const block_edit_1 = require("./core/block-edit");
const social_links_1 = require("./core/social-links");
const move_to_trash_1 = require("./core/move-to-trash");
const site_logo_1 = require("./core/site-logo");
var utils_1 = require("./utils");
Object.defineProperty(exports, "getAllowedBlockNames", { enumerable: true, get: function () { return utils_1.getAllowedBlockNames; } });
function initBlocks() {
    (0, block_edit_1.filterSetUrlAttribute)();
    (0, columns_1.deactivateStackOnMobile)();
    (0, image_1.hideExpandOnClick)();
    (0, image_1.disableImageFilter)();
    (0, rich_text_1.disableCertainRichTextFormats)();
    (0, columns_1.disableColumnsLayoutAndEnhanceColumnsBlock)();
    (0, group_1.disableGroupVariations)();
    (0, buttons_1.enhanceButtonsBlock)();
    (0, post_content_1.enhancePostContentBlock)();
    (0, quote_1.enhanceQuoteBlock)();
    (0, rich_text_1.extendRichTextFormats)();
    (0, rich_text_1.activatePersonalizationTagsReplacing)();
    (0, general_block_support_1.alterSupportConfiguration)();
    (0, social_links_1.enhanceSocialLinksBlock)();
    (0, move_to_trash_1.modifyMoveToTrashAction)();
    (0, site_logo_1.enhanceSiteLogoBlock)();
    (0, block_library_1.registerCoreBlocks)();
    (0, general_block_support_1.removeBlockStylesFromAllBlocks)();
}
