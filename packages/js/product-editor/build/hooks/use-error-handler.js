"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useErrorHandler = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const navigation_1 = require("@fincommerce/navigation");
/**
 * Internal dependencies
 */
const validation_context_1 = require("../contexts/validation-context");
const use_blocks_helper_1 = require("./use-blocks-helper");
function getUrl(tab) {
    return (0, navigation_1.getNewPath)({ tab });
}
function getErrorPropsWithActions(errorContext = '', validatorId, focusByValidatorId, label = (0, i18n_1.__)('View error', 'fincommerce')) {
    return {
        explicitDismiss: true,
        actions: [
            {
                label,
                onClick: async () => {
                    await focusByValidatorId(validatorId);
                    (0, navigation_1.navigateTo)({
                        url: getUrl(errorContext),
                    });
                },
            },
        ],
    };
}
const useErrorHandler = () => {
    const { focusByValidatorId, getFieldByValidatorId } = (0, validation_context_1.useValidations)();
    const { getClientIdByField, getParentTabId, getParentTabIdByBlockName } = (0, use_blocks_helper_1.useBlocksHelper)();
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
    const getProductErrorMessageAndProps = (0, element_1.useCallback)(async (error, visibleTab) => {
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
                response.message = (0, i18n_1.__)('Invalid or duplicated SKU.', 'fincommerce');
                const errorSkuContext = getParentTabIdByBlockName('fincommerce/product-sku-field');
                if (visibleTab !== errorSkuContext &&
                    errorSkuContext !== null) {
                    response.errorProps = getErrorPropsWithActions(errorSkuContext, 'sku', focusByValidatorId, (0, i18n_1.__)('View SKU field', 'fincommerce'));
                }
                break;
            case 'product_invalid_global_unique_id':
                response.message = (0, i18n_1.__)('Invalid or duplicated GTIN, UPC, EAN or ISBN.', 'fincommerce');
                const errorUniqueIdContext = errorContext || 'inventory';
                if (visibleTab !== errorUniqueIdContext) {
                    response.errorProps = getErrorPropsWithActions(errorUniqueIdContext, 'global_unique_id', focusByValidatorId, (0, i18n_1.__)('View identifier field', 'fincommerce'));
                }
                break;
            case 'product_create_error':
                response.message = (0, i18n_1.__)('Failed to create product.', 'fincommerce');
                break;
            case 'product_publish_error':
                response.message = (0, i18n_1.__)('Failed to publish product.', 'fincommerce');
                break;
            case 'product_preview_error':
                response.message = (0, i18n_1.__)('Failed to preview product.', 'fincommerce');
                break;
            default:
                response.message = (0, i18n_1.__)('Failed to save product.', 'fincommerce');
                break;
        }
        return response;
    }, []);
    return { getProductErrorMessageAndProps };
};
exports.useErrorHandler = useErrorHandler;
