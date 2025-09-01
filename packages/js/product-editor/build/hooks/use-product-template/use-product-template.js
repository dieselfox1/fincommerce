"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProductTemplate = void 0;
const matchesAllTemplateMetaFields = (templateMeta, productMeta) => templateMeta.every((item) => productMeta.find((productMetaEntry) => productMetaEntry.key === item.key &&
    productMetaEntry.value === item.value));
function templateDataMatchesProductData(productTemplate, product) {
    return Object.entries(productTemplate.productData).every(([key, value]) => {
        if (key === 'meta_data') {
            return matchesAllTemplateMetaFields(value, product.meta_data || []);
        }
        return product[key] === value;
    });
}
function findBetterMatchTemplate(matchingTemplates) {
    return matchingTemplates.reduce((previous, current) => Object.keys(current.productData).length >
        Object.keys(previous.productData).length
        ? current
        : previous, matchingTemplates[0]);
}
const useProductTemplate = (productTemplateId, product) => {
    const productTemplates = window.productBlockEditorSettings?.productTemplates ?? [];
    const productType = product?.type;
    // we shouldn't default to the standard-product-template for variations
    if (!productTemplateId && productType === 'variation') {
        return { productTemplate: null, isResolving: false };
    }
    let matchingProductTemplate;
    if (productTemplateId) {
        matchingProductTemplate = productTemplates.find((productTemplate) => productTemplate.id === productTemplateId);
    }
    if (!matchingProductTemplate && product) {
        // Look for matching templates based on product data described on each template.
        const matchingTemplates = productTemplates.filter((productTemplate) => templateDataMatchesProductData(productTemplate, product));
        // If there are multiple matching templates, we should use the one with the most matching fields.
        // If there is no matching template, we should default to the standard product template.
        matchingProductTemplate =
            findBetterMatchTemplate(matchingTemplates) ||
                productTemplates.find((productTemplate) => productTemplate.id === 'standard-product-template');
    }
    // When we switch to getting the product template from the API,
    // this will be needed.
    const isResolving = false;
    return { productTemplate: matchingProductTemplate, isResolving };
};
exports.useProductTemplate = useProductTemplate;
