"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMetaboxHiddenProduct = useMetaboxHiddenProduct;
/**
 * External dependencies
 */
const data_1 = require("@fincommerce/data");
const core_data_1 = require("@wordpress/core-data");
const data_2 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
function useMetaboxHiddenProduct() {
    const [isSaving, setIsSaving] = (0, element_1.useState)(false);
    const { user, isRequesting } = (0, data_1.useUser)();
    const [metaboxhiddenProduct, setMetaboxhiddenProduct, prevMetaboxhiddenProduct,] = (0, core_data_1.useEntityProp)('root', 'user', 'metaboxhidden_product', user.id);
    async function saveMetaboxhiddenProduct(value) {
        try {
            setIsSaving(true);
            // @ts-expect-error saveEntityRecord is not typed correctly because we are overriding the type definition. https://github.com/dieselfox1/fincommerce/blob/eeaf58e20064d837412d6c455e69cc5a5e2678b4/packages/js/product-editor/typings/index.d.ts#L15-L35
            const { saveEntityRecord } = (0, data_2.dispatch)(core_data_1.store);
            const currentUser = (await saveEntityRecord('root', 'user', {
                id: user.id,
                metaboxhidden_product: value,
            }));
            return currentUser;
        }
        finally {
            setIsSaving(false);
        }
    }
    return {
        isLoading: isRequesting || isSaving,
        metaboxhiddenProduct,
        prevMetaboxhiddenProduct,
        setMetaboxhiddenProduct,
        saveMetaboxhiddenProduct,
    };
}
