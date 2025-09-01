"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePreview = usePreview;
const core_data_1 = require("@wordpress/core-data");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const validation_context_1 = require("../../../../contexts/validation-context");
const use_product_url_1 = require("../../../../hooks/use-product-url");
const format_product_error_1 = require("../../../../utils/format-product-error");
function usePreview({ productStatus, productType = 'product', disabled, onClick, onSaveSuccess, onSaveError, ...props }) {
    const anchorRef = (0, element_1.useRef)();
    const [productId] = (0, core_data_1.useEntityProp)('postType', productType, 'id');
    const { getProductURL } = (0, use_product_url_1.useProductURL)(productType);
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
    const ariaDisabled = disabled || isDisabled || isValidating;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { editEntityRecord, saveEditedEntityRecord } = (0, data_1.useDispatch)('core');
    /**
     * Overrides the default anchor behaviour when the product has unsaved changes.
     * Before redirecting to the preview page all changes are saved and then the
     * redirection is performed.
     *
     * @param event
     */
    async function handleClick(event) {
        if (ariaDisabled) {
            return event.preventDefault();
        }
        if (onClick) {
            onClick(event);
        }
        // Prevent an infinite recursion call due to the
        // `anchorRef.current?.click()` call.
        if (!hasEdits) {
            return;
        }
        // Prevent the default anchor behaviour.
        event.preventDefault();
        try {
            await validate();
            // If the product status is `auto-draft` it's not possible to
            // reach the preview page, so the status is changed to `draft`
            // before redirecting.
            if (productStatus === 'auto-draft') {
                await editEntityRecord('postType', productType, productId, {
                    status: 'draft',
                });
            }
            // Persist the product changes before redirecting
            const publishedProduct = await saveEditedEntityRecord('postType', productType, productId, {
                throwOnError: true,
            });
            // Redirect using the default anchor behaviour. This way, the usage
            // of `window.open` is avoided which comes with some edge cases.
            anchorRef.current?.click();
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
    return {
        'aria-label': (0, i18n_1.__)('Preview in new tab', 'fincommerce'),
        children: (0, i18n_1.__)('Preview', 'fincommerce'),
        target: '_blank',
        ...props,
        ref(element) {
            if (typeof props.ref === 'function')
                props.ref(element);
            anchorRef.current = element;
        },
        'aria-disabled': ariaDisabled,
        // Note that the href is always passed for a11y support. So
        // the final rendered element is always an anchor.
        href: getProductURL(true),
        variant: 'tertiary',
        onClick: handleClick,
    };
}
