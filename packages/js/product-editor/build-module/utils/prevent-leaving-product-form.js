/**
 * Allow switching between tabs without prompting for unsaved changes.
 */
export const preventLeavingProductForm = (productId) => (toUrl, fromUrl) => {
    const toParams = new URLSearchParams(toUrl.search);
    const fromParams = new URLSearchParams(fromUrl.search);
    toParams.delete('tab');
    fromParams.delete('tab');
    // Prevent dialog from happening if moving from add new to edit page of same product.
    if (productId !== undefined &&
        fromParams.get('path') === '/add-product' &&
        toParams.get('path') === '/product/' + productId) {
        return false;
    }
    return toParams.toString() !== fromParams.toString();
};
