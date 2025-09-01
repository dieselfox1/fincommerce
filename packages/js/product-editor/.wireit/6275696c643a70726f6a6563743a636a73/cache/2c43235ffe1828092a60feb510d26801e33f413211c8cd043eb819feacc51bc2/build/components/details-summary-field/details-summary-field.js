"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsSummaryField = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@fincommerce/components");
const blocks_1 = require("@wordpress/blocks");
const element_1 = require("@wordpress/element");
const DetailsSummaryField = () => {
    const { setValue, values } = (0, components_1.useFormContext)();
    const [summaryBlocks, setSummaryBlocks] = (0, element_1.useState)((0, blocks_1.parse)(values.short_description || ''));
    return ((0, element_1.createElement)(components_1.__experimentalRichTextEditor, { label: (0, i18n_1.__)('Summary', 'fincommerce'), blocks: summaryBlocks, onChange: (blocks) => {
            setSummaryBlocks(blocks);
            if (!summaryBlocks.length) {
                return;
            }
            setValue('short_description', (0, blocks_1.serialize)(blocks));
        }, placeholder: (0, i18n_1.__)("Summarize this product in 1-2 short sentences. We'll show it at the top of the page.", 'fincommerce') }));
};
exports.DetailsSummaryField = DetailsSummaryField;
