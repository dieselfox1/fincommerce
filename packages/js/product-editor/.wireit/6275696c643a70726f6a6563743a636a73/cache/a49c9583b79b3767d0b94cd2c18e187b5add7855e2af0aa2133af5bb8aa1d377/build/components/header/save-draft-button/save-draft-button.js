"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveDraftButton = SaveDraftButton;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const navigation_1 = require("@fincommerce/navigation");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const use_error_handler_1 = require("../../../hooks/use-error-handler");
const record_product_event_1 = require("../../../utils/record-product-event");
const use_save_draft_1 = require("../hooks/use-save-draft");
const use_feedback_bar_1 = require("../../../hooks/use-feedback-bar");
function SaveDraftButton({ productStatus, productType = 'product', visibleTab = 'general', ...props }) {
    const { createSuccessNotice, createErrorNotice } = (0, data_1.useDispatch)('core/notices');
    const { maybeShowFeedbackBar } = (0, use_feedback_bar_1.useFeedbackBar)();
    const { getProductErrorMessageAndProps } = (0, use_error_handler_1.useErrorHandler)();
    const saveDraftButtonProps = (0, use_save_draft_1.useSaveDraft)({
        productStatus,
        productType,
        ...props,
        onSaveSuccess(savedProduct) {
            (0, record_product_event_1.recordProductEvent)('product_edit', savedProduct);
            createSuccessNotice((0, i18n_1.__)('Product saved as draft.', 'fincommerce'));
            maybeShowFeedbackBar();
            if (productStatus === 'auto-draft') {
                const url = (0, navigation_1.getNewPath)({}, `/product/${savedProduct.id}`);
                (0, navigation_1.navigateTo)({ url });
            }
        },
        async onSaveError(error) {
            const { message, errorProps } = await getProductErrorMessageAndProps(error, visibleTab);
            createErrorNotice(message, errorProps);
        },
    });
    return (0, element_1.createElement)(components_1.Button, { ...saveDraftButtonProps });
}
