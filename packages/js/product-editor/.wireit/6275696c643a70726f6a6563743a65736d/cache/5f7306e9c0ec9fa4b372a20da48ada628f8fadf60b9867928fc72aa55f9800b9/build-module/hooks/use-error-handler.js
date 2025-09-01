/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { getNewPath, navigateTo } from '@fincommerce/navigation';
/**
 * Internal dependencies
 */
import { useValidations } from '../contexts/validation-context';
import { useBlocksHelper } from './use-blocks-helper';
function getUrl(tab) {
    return getNewPath({ tab });
}
function getErrorPropsWithActions(errorContext = '', validatorId, focusByValidatorId, label = __('View error', 'fincommerce')) {
    return {
        explicitDismiss: true,
        actions: [
            {
                label,
                onClick: async () => {
                    await focusByValidatorId(validatorId);
                    navigateTo({
                        url: getUrl(errorContext),
                    });
                },
            },
        ],
    };
}
export const useErrorHandler = () => {
    const { focusByValidatorId, getFieldByValidatorId } = useValidations();
    const { getClientIdByField, getParentTabId, getParentTabIdByBlockName } = useBlocksHelper();
    async function getClientIdByValidatorId(validatorId) {
        if (!validatorId) {
            return null;
        }
        const field = await getFieldByValidatorId(validatorId);
        if (!field) {
            return null;
        }
        return getClientIdByField(field);
    }
    const getProductErrorMessageAndProps = useCallback(async (error, visibleTab) => {
        const response = {
            message: '',
            errorProps: {},
        };
        const { code, message: errorMessage, validatorId = '' } = error;
        const clientId = await getClientIdByValidatorId(validatorId);
        const errorContext = getParentTabId(clientId);
        switch (code) {
            case 'variable_product_no_variation_prices':
                response.message = errorMessage;
                if (visibleTab !== 'variations' &&
                    errorContext !== null) {
                    response.errorProps = getErrorPropsWithActions(errorContext, validatorId, focusByValidatorId);
                }
                break;
            case 'product_form_field_error':
                response.message = errorMessage;
                if (visibleTab !== errorContext &&
                    errorContext !== null) {
                    response.errorProps = getErrorPropsWithActions(errorContext, validatorId, focusByValidatorId);
                }
                break;
            case 'product_invalid_sku':
                response.message = __('Invalid or duplicated SKU.', 'fincommerce');
                const errorSkuContext = getParentTabIdByBlockName('fincommerce/product-sku-field');
                if (visibleTab !== errorSkuContext &&
                    errorSkuContext !== null) {
                    response.errorProps = getErrorPropsWithActions(errorSkuContext, 'sku', focusByValidatorId, __('View SKU field', 'fincommerce'));
                }
                break;
            case 'product_invalid_global_unique_id':
                response.message = __('Invalid or duplicated GTIN, UPC, EAN or ISBN.', 'fincommerce');
                const errorUniqueIdContext = errorContext || 'inventory';
                if (visibleTab !== errorUniqueIdContext) {
                    response.errorProps = getErrorPropsWithActions(errorUniqueIdContext, 'global_unique_id', focusByValidatorId, __('View identifier field', 'fincommerce'));
                }
                break;
            case 'product_create_error':
                response.message = __('Failed to create product.', 'fincommerce');
                break;
            case 'product_publish_error':
                response.message = __('Failed to publish product.', 'fincommerce');
                break;
            case 'product_preview_error':
                response.message = __('Failed to preview product.', 'fincommerce');
                break;
            default:
                response.message = __('Failed to save product.', 'fincommerce');
                break;
        }
        return response;
    }, []);
    return { getProductErrorMessageAndProps };
};
