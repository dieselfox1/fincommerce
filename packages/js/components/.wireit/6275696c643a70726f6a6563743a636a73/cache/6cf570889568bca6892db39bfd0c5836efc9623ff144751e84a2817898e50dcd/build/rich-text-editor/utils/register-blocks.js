"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBlocks = exports.VIDEO_BLOCK_ID = exports.IMAGE_BLOCK_ID = exports.QUOTE_BLOCK_ID = exports.LIST_ITEM_BLOCK_ID = exports.LIST_BLOCK_ID = exports.HEADING_BLOCK_ID = exports.PARAGRAPH_BLOCK_ID = void 0;
/**
 * External dependencies
 */
const blocks_1 = require("@wordpress/blocks");
const block_library_1 = require("@wordpress/block-library");
exports.PARAGRAPH_BLOCK_ID = 'core/paragraph';
exports.HEADING_BLOCK_ID = 'core/heading';
exports.LIST_BLOCK_ID = 'core/list';
exports.LIST_ITEM_BLOCK_ID = 'core/list-item';
exports.QUOTE_BLOCK_ID = 'core/quote';
exports.IMAGE_BLOCK_ID = 'core/image';
exports.VIDEO_BLOCK_ID = 'core/video';
const ALLOWED_CORE_BLOCKS = [
    exports.PARAGRAPH_BLOCK_ID,
    exports.HEADING_BLOCK_ID,
    exports.LIST_BLOCK_ID,
    exports.LIST_ITEM_BLOCK_ID,
    exports.QUOTE_BLOCK_ID,
    exports.IMAGE_BLOCK_ID,
    exports.VIDEO_BLOCK_ID,
];
const registerCoreBlocks = () => {
    const coreBlocks = (0, block_library_1.__experimentalGetCoreBlocks)();
    const blocks = coreBlocks.filter((block) => {
        const isRegistered = !!(0, blocks_1.getBlockType)(block.name);
        return !isRegistered && ALLOWED_CORE_BLOCKS.includes(block.name);
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore An argument is allowed to specify which blocks to register.
    (0, block_library_1.registerCoreBlocks)(blocks);
};
const registerBlocks = () => {
    registerCoreBlocks();
};
exports.registerBlocks = registerBlocks;
