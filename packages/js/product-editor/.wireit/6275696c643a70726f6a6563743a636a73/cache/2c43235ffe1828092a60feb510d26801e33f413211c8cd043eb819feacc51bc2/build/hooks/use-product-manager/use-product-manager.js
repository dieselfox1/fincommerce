"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProductManager = useProductManager;
/**
 * External dependencies
 */
const core_data_1 = require("@wordpress/core-data");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const data_2 = require("@fincommerce/data");
/**
 * Internal dependencies
 */
const validation_context_1 = require("../../contexts/validation-context");
const constants_1 = require("../../utils/constants");
const format_product_error_1 = require("../../utils/format-product-error");
function useProductManager(postType) {
    const [id] = (0, core_data_1.useEntityProp)('postType', postType, 'id');
    const [name, , prevName] = (0, core_data_1.useEntityProp)('postType', postType, 'name');
    const [status] = (0, core_data_1.useEntityProp)('postType', postType, 'status');
    const [isSaving, setIsSaving] = (0, element_1.useState)(false);
    const [isTrashing, setTrashing] = (0, element_1.useState)(false);
    const { isValidating, validate } = (0, validation_context_1.useValidations)();
    const { isDirty } = (0, data_1.useSelect)((select) => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        isDirty: select('core').hasEditsForEntityRecord('postType', postType, id),
    }), [postType, id]);
    async function save(extraProps = {}) {
        try {
            setIsSaving(true);
            await validate(extraProps);
            // @ts-expect-error saveEntityRecord is not typed correctly because we are overriding the type definition. https://github.com/dieselfox1/fincommerce/blob/eeaf58e20064d837412d6c455e69cc5a5e2678b4/packages/js/product-editor/typings/index.d.ts#L15-L35
            const { saveEntityRecord } = (0, data_1.dispatch)(core_data_1.store);
            const { blocks, content, selection, ...editedProduct } = (0, data_1.select)(core_data_1.store).getEntityRecordEdits('postType', postType, id);
            const savedProduct = await saveEntityRecord('postType', postType, {
                ...editedProduct,
                ...extraProps,
                id,
            }, 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            {
                throwOnError: true,
            });
            return savedProduct;
        }
        catch (error) {
            throw (0, format_product_error_1.formatProductError)(error, status);
        }
        finally {
            setIsSaving(false);
        }
    }
    async function copyToDraft() {
        try {
            // When "Copy to a new draft" is used on an unsaved product with a filled-out name,
            // the name is retained in the copied product.
            const data = constants_1.AUTO_DRAFT_NAME === prevName && name !== prevName
                ? { name }
                : {};
            setIsSaving(true);
            const duplicatedProduct = await (0, data_1.dispatch)(data_2.productsStore).duplicateProduct(id, data);
            return duplicatedProduct;
        }
        catch (error) {
            throw (0, format_product_error_1.formatProductError)(error, status);
        }
        finally {
            setIsSaving(false);
        }
    }
    async function publish(extraProps = {}) {
        const isPublished = status === 'publish' || status === 'future';
        // The publish button click not only change the status of the product
        // but also save all the pending changes. So even if the status is
        // publish it's possible to save the product too.
        const data = isPublished
            ? extraProps
            : { status: 'publish', ...extraProps };
        return save(data);
    }
    async function trash(force = false) {
        try {
            setTrashing(true);
            await validate();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { deleteEntityRecord, saveEditedEntityRecord } = (0, data_1.dispatch)('core');
            await saveEditedEntityRecord('postType', postType, id, {
                throwOnError: true,
            });
            const deletedProduct = await deleteEntityRecord('postType', postType, id, {
                force,
                throwOnError: true,
            });
            return deletedProduct;
        }
        catch (error) {
            throw (0, format_product_error_1.formatProductError)(error, status);
        }
        finally {
            setTrashing(false);
        }
    }
    return {
        isValidating,
        isDirty,
        isSaving,
        isPublishing: isSaving,
        isTrashing,
        save,
        publish,
        trash,
        copyToDraft,
    };
}
