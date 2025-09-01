"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSaveDraft = useSaveDraft;
const components_1 = require("@wordpress/components");
const core_data_1 = require("@wordpress/core-data");
const data_1 = require("@wordpress/data");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const element_1 = require("@wordpress/element");
const keyboard_shortcuts_1 = require("@wordpress/keyboard-shortcuts");
/**
 * Internal dependencies
 */
const validation_context_1 = require("../../../../contexts/validation-context");
const record_product_event_1 = require("../../../../utils/record-product-event");
const format_product_error_1 = require("../../../../utils/format-product-error");
function useSaveDraft({ productStatus, productType = 'product', disabled, onClick, onSaveSuccess, onSaveError, ...props }) {
    const [productId] = (0, core_data_1.useEntityProp)('postType', productType, 'id');
    const { hasEdits, isDisabled } = (0, data_1.useSelect)((select) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { hasEditsForEntityRecord, isSavingEntityRecord } = select('core');
        // @ts-expect-error Selector is not typed
        const isSaving = isSavingEntityRecord('postType', productType, productId);
        return {
            isDisabled: isSaving,
            // @ts-expect-error Selector is not typed
            hasEdits: hasEditsForEntityRecord('postType', productType, productId),
        };
    }, [productId]);
    const { isValidating, validate } = (0, validation_context_1.useValidations)();
    const ariaDisabled = disabled ||
        isDisabled ||
        (productStatus !== 'publish' && !hasEdits) ||
        isValidating;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { editEntityRecord, saveEditedEntityRecord } = (0, data_1.useDispatch)('core');
    const productStatusMap = {
        publish: 'product_switch_draft',
        draft: 'product_save_draft',
    };
    async function saveDraft() {
        try {
            await validate({ status: 'draft' });
            await editEntityRecord('postType', productType, productId, {
                status: 'draft',
            });
            const publishedProduct = await saveEditedEntityRecord('postType', productType, productId, {
                throwOnError: true,
            });
            const eventName = productStatusMap[productStatus];
            if (eventName) {
                (0, record_product_event_1.recordProductEvent)(eventName, publishedProduct);
            }
            if (onSaveSuccess) {
                onSaveSuccess(publishedProduct);
            }
        }
        catch (error) {
            if (onSaveError) {
                onSaveError((0, format_product_error_1.formatProductError)(error, productStatus));
            }
        }
    }
    async function handleClick(event) {
        if (ariaDisabled) {
            return event.preventDefault();
        }
        if (onClick) {
            onClick(event);
        }
        await saveDraft();
    }
    let children;
    if (productStatus === 'publish') {
        children = (0, i18n_1.__)('Switch to draft', 'fincommerce');
    }
    else if (hasEdits || productStatus === 'auto-draft') {
        children = (0, i18n_1.__)('Save draft', 'fincommerce');
    }
    else {
        children = ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(components_1.Icon, { icon: icons_1.check }),
            (0, i18n_1.__)('Saved', 'fincommerce')));
    }
    (0, keyboard_shortcuts_1.useShortcut)('core/editor/save', (event) => {
        event.preventDefault();
        if (!ariaDisabled &&
            (productStatus === 'draft' || productStatus === 'auto-draft')) {
            saveDraft();
        }
    });
    return {
        children,
        ...props,
        'aria-disabled': ariaDisabled,
        variant: 'tertiary',
        onClick: handleClick,
    };
}
