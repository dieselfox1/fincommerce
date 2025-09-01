"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsDescriptionField = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@fincommerce/components");
const blocks_1 = require("@wordpress/blocks");
const element_1 = require("@wordpress/element");
const DetailsDescriptionField = () => {
    const { setValue, values } = (0, components_1.useFormContext)();
    const [descriptionBlocks, setDescriptionBlocks] = (0, element_1.useState)((0, blocks_1.parse)(values.description || ''));
    return ((0, element_1.createElement)(components_1.__experimentalRichTextEditor, { label: (0, i18n_1.__)('Description', 'fincommerce'), blocks: descriptionBlocks, onChange: (blocks) => {
            setDescriptionBlocks(blocks);
            if (!descriptionBlocks.length) {
                return;
            }
            setValue('description', (0, blocks_1.serialize)(blocks));
        }, placeholder: (0, i18n_1.__)('Describe this product. What makes it unique? What are its most important features?', 'fincommerce') }));
};
exports.DetailsDescriptionField = DetailsDescriptionField;
