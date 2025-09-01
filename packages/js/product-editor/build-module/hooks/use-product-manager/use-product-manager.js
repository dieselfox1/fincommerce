/**
 * External dependencies
 */
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { dispatch, useSelect, select as wpSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { productsStore } from '@fincommerce/data';
/**
 * Internal dependencies
 */
import { useValidations } from '../../contexts/validation-context';
import { AUTO_DRAFT_NAME } from '../../utils/constants';
import { formatProductError } from '../../utils/format-product-error';
export function useProductManager(postType) {
    const [id] = useEntityProp('postType', postType, 'id');
    const [name, , prevName] = useEntityProp('postType', postType, 'name');
    const [status] = useEntityProp('postType', postType, 'status');
    const [isSaving, setIsSaving] = useState(false);
    const [isTrashing, setTrashing] = useState(false);
    const { isValidating, validate } = useValidations();
    const { isDirty } = useSelect((select) => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        isDirty: select('core').hasEditsForEntityRecord('postType', postType, id),
    }), [postType, id]);
    async function save(extraProps = {}) {
        try {
            setIsSaving(true);
            await validate(extraProps);
            // @ts-expect-error saveEntityRecord is not typed correctly because we are overriding the type definition. https://github.com/dieselfox1/fincommerce/blob/eeaf58e20064d837412d6c455e69cc5a5e2678b4/packages/js/product-editor/typings/index.d.ts#L15-L35
            const { saveEntityRecord } = dispatch(coreStore);
            const { blocks, content, selection, ...editedProduct } = wpSelect(coreStore).getEntityRecordEdits('postType', postType, id);
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
            throw formatProductError(error, status);
        }
        finally {
            setIsSaving(false);
        }
    }
    async function copyToDraft() {
        try {
            // When "Copy to a new draft" is used on an unsaved product with a filled-out name,
            // the name is retained in the copied product.
            const data = AUTO_DRAFT_NAME === prevName && name !== prevName
                ? { name }
                : {};
            setIsSaving(true);
            const duplicatedProduct = await dispatch(productsStore).duplicateProduct(id, data);
            return duplicatedProduct;
        }
        catch (error) {
            throw formatProductError(error, status);
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
            const { deleteEntityRecord, saveEditedEntityRecord } = dispatch('core');
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
            throw formatProductError(error, status);
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
