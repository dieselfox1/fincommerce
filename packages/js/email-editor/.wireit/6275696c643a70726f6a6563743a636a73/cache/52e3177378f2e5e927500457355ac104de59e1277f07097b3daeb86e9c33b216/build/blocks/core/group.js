"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableGroupVariations = disableGroupVariations;
/**
 * External dependencies
 */
const hooks_1 = require("@wordpress/hooks");
/**
 * Disables layout support for group blocks because the default layout `flex` add gaps between columns that it is not possible to support in emails.
 */
function disableGroupVariations() {
    (0, hooks_1.addFilter)('blocks.registerBlockType', 'fincommerce-email-editor/disable-group-variations', (settings, name) => {
        if (name === 'core/group') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
                ...settings,
                variations: settings.variations.filter((variation) => variation.name === 'group'),
                supports: {
                    ...settings.supports,
                    layout: false,
                },
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return settings;
    });
}
