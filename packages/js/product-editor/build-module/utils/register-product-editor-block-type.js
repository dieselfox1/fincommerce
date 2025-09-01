import { registerWooBlockType } from '@fincommerce/block-templates';
import { useEntityId } from '@wordpress/core-data';
export function useEvaluationContext(context) {
    const { postType } = context;
    const productId = useEntityId('postType', postType);
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
export function registerProductEditorBlockType(block) {
    const { metadata, settings, name } = block;
    const augmentedMetadata = {
        ...metadata,
        usesContext: augmentUsesContext(metadata.usesContext),
    };
    return registerWooBlockType({
        name,
        metadata: augmentedMetadata,
        settings,
    }, useEvaluationContext);
}
