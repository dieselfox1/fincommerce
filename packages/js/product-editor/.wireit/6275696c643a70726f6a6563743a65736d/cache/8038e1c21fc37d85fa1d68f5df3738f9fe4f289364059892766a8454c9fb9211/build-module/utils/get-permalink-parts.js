export const getPermalinkParts = (product) => {
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
