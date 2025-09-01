"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDerivedProductType = void 0;
const getDerivedProductType = (product) => {
    const hasOptions = !!product.attributes?.find((attribute) => attribute.options.length && attribute.variation);
    if (hasOptions) {
        return 'variable';
    }
    return 'simple';
};
exports.getDerivedProductType = getDerivedProductType;
