"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isProductFormTemplateSystemEnabled;
function isProductFormTemplateSystemEnabled() {
    return !!window.wcAdminFeatures?.['product-editor-template-system'];
}
