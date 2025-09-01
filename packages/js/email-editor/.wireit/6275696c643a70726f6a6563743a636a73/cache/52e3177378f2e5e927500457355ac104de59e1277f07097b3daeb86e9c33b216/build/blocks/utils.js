"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedBlockNames = getAllowedBlockNames;
/**
 * External dependencies
 */
const blocks_1 = require("@wordpress/blocks");
/**
 * Returns an array of block names that support the 'email' feature.
 */
function getAllowedBlockNames() {
    try {
        return (0, blocks_1.getBlockTypes)()
            .filter((block) => {
            // @ts-expect-error: 'email' is a custom property
            return block.supports?.email === true;
        })
            .map((block) => block.name);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to get allowed block names:', error);
        return [];
    }
}
