"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermalinkParts = void 0;
const getPermalinkParts = (product) => {
    let postName, prefix, suffix;
    if (product && product.permalink_template) {
        postName = product.slug || product.generated_slug;
        [prefix, suffix] = product.permalink_template.split(/%(?:postname|pagename)%/);
    }
    return {
        prefix,
        postName,
        suffix,
    };
};
exports.getPermalinkParts = getPermalinkParts;
