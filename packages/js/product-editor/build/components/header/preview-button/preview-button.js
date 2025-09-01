"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewButton = PreviewButton;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const navigation_1 = require("@fincommerce/navigation");
const tracks_1 = require("@fincommerce/tracks");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const use_error_handler_1 = require("../../../hooks/use-error-handler");
const use_preview_1 = require("../hooks/use-preview");
const constants_1 = require("../../../constants");
function PreviewButton({ productStatus, visibleTab = 'general', ...props }) {
    const { createErrorNotice } = (0, data_1.useDispatch)('core/notices');
    const { getProductErrorMessageAndProps } = (0, use_error_handler_1.useErrorHandler)();
    const previewButtonProps = (0, use_preview_1.usePreview)({
        productStatus,
        ...props,
        onClick() {
            (0, tracks_1.recordEvent)('product_preview_changes', { source: constants_1.TRACKS_SOURCE });
        },
        onSaveSuccess(savedProduct) {
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
    return (0, element_1.createElement)(components_1.Button, { ...previewButtonProps });
}
