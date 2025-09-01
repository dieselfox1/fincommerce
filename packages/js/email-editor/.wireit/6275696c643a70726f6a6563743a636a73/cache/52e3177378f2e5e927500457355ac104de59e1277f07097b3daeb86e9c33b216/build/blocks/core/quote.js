"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceQuoteBlock = enhanceQuoteBlock;
/**
 * External dependencies
 */
const hooks_1 = require("@wordpress/hooks");
/**
 * Remove the styles and alignment control support for the Quote block.
 */
function enhanceQuoteBlock() {
    (0, hooks_1.addFilter)('blocks.registerBlockType', 'fincommerce-email-editor/change-quote', (settings, name) => {
        if (name === 'core/quote') {
            return {
                ...settings,
                styles: [],
                supports: {
                    ...settings.supports,
                    align: [],
                },
            };
        }
        return settings;
    });
}
