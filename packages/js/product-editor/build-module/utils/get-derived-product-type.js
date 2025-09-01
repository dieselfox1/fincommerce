export const getDerivedProductType = (product) => {
    const hasOptions = !!product.attributes?.find((attribute) => attribute.options.length && attribute.variation);
    if (hasOptions) {
        return 'variable';
    }
    return 'simple';
};
