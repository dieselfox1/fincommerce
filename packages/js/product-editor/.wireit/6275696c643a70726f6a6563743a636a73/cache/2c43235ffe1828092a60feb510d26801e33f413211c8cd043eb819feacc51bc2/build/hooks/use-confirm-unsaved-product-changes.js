"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConfirmUnsavedProductChanges = useConfirmUnsavedProductChanges;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const navigation_1 = require("@fincommerce/navigation");
const core_data_1 = require("@wordpress/core-data");
/**
 * Internal dependencies
 */
const prevent_leaving_product_form_1 = require("../utils/prevent-leaving-product-form");
const use_product_edits_1 = require("./use-product-edits");
function useConfirmUnsavedProductChanges(productType = 'product') {
    const productId = (0, core_data_1.useEntityId)('postType', productType);
    const { hasEdits } = (0, use_product_edits_1.useProductEdits)(productType);
    const { isSaving } = (0, data_1.useSelect)((select) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { isSavingEntityRecord } = select('core');
        return {
            // @ts-expect-error Selector is not typed
            isSaving: isSavingEntityRecord('postType', productType, productId),
        };
    }, [productId, productType]);
    (0, navigation_1.useConfirmUnsavedChanges)(hasEdits || isSaving, (0, prevent_leaving_product_form_1.preventLeavingProductForm)(productId));
}
