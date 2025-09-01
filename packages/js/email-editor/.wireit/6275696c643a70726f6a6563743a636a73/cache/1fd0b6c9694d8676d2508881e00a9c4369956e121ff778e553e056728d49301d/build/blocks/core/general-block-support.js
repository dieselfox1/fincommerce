"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterSupportConfiguration = alterSupportConfiguration;
exports.removeBlockStylesFromAllBlocks = removeBlockStylesFromAllBlocks;
/**
 * External dependencies
 */
const hooks_1 = require("@wordpress/hooks");
const dom_ready_1 = __importDefault(require("@wordpress/dom-ready"));
const blocks_1 = require("@wordpress/blocks");
const data_1 = require("@wordpress/data");
// List of blocks that we want to support.
const BLOCK_STYLES_TO_PRESERVE = ['core/social-links'];
/**
 * Disables Shadow Support for all blocks
 * Currently we are not able to read these styles in renderer
 */
function alterSupportConfiguration() {
    (0, hooks_1.addFilter)('blocks.registerBlockType', 'fincommerce-email-editor/block-support', (settings) => {
        if (settings.supports?.shadow) {
            return {
                ...settings,
                supports: { ...settings.supports, shadow: false },
            };
        }
        return settings;
    });
}
/**
 * Remove block styles for all blocks that are not in the BLOCK_STYLES_TO_PRESERVE array
 * We are removing these block styles because they might contain CSS not supported in the email editor renderer (or email clients).
 *
 * Block styles removed:
 * - Core block styles
 * - Block styles from plugins
 * - Block styles from themes
 * - Block styles from the user's custom styles
 */
function removeBlockStyles() {
    (0, blocks_1.getBlockTypes)().forEach((blockType) => {
        const blockName = blockType.name;
        if (BLOCK_STYLES_TO_PRESERVE.includes(blockName)) {
            // Skip block styles that are in the BLOCK_STYLES_TO_PRESERVE array
            return;
        }
        // @ts-expect-error Type not complete.
        const blockStyles = (0, data_1.select)(blocks_1.store).getBlockStyles(blockName);
        if (!Array.isArray(blockStyles) || blockStyles?.length === 0) {
            return;
        }
        blockStyles.forEach((blockStyle) => {
            (0, blocks_1.unregisterBlockStyle)(blockName, blockStyle.name);
        });
    });
}
/**
 * Remove block styles for all blocks
 * See removeBlockStyles() for more details
 */
function removeBlockStylesFromAllBlocks() {
    (0, dom_ready_1.default)(removeBlockStyles);
}
