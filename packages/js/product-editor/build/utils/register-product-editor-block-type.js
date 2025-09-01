"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEvaluationContext = useEvaluationContext;
exports.registerProductEditorBlockType = registerProductEditorBlockType;
const block_templates_1 = require("@fincommerce/block-templates");
const core_data_1 = require("@wordpress/core-data");
function useEvaluationContext(context) {
    const { postType } = context;
    const productId = (0, core_data_1.useEntityId)('postType', postType);
    const getEvaluationContext = (select) => {
        const coreStore = select('core');
        const editedProduct = coreStore.getEditedEntityRecord('postType', postType, productId);
        return {
            ...context,
            editedProduct,
        };
    };
    return {
        getEvaluationContext,
    };
}
function augmentUsesContext(usesContext) {
    // Note: If you modify this function, also update the server-side
    // Automattic\FinCommerce\Admin\Features\ProductBlockEditor\BlockRegistry::augment_uses_context() function.
    return [...(usesContext || []), 'postType'];
}
function registerProductEditorBlockType(block) {
    const { metadata, settings, name } = block;
    const augmentedMetadata = {
        ...metadata,
        usesContext: augmentUsesContext(metadata.usesContext),
    };
    return (0, block_templates_1.registerWooBlockType)({
        name,
        metadata: augmentedMetadata,
        settings,
    }, useEvaluationContext);
}
