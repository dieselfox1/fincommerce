"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishButton = PublishButton;
const components_1 = require("@wordpress/components");
const core_data_1 = require("@wordpress/core-data");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const navigation_1 = require("@fincommerce/navigation");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const product_editor_ui_1 = require("../../../store/product-editor-ui");
const use_error_handler_1 = require("../../../hooks/use-error-handler");
const record_product_event_1 = require("../../../utils/record-product-event");
const use_feedback_bar_1 = require("../../../hooks/use-feedback-bar");
const constants_1 = require("../../../constants");
const use_publish_1 = require("../hooks/use-publish");
const publish_button_menu_1 = require("./publish-button-menu");
const utils_1 = require("./utils");
function PublishButton({ productType = 'product', isMenuButton, isPrePublishPanelVisible = true, visibleTab = 'general', ...props }) {
    const { createErrorNotice } = (0, data_1.useDispatch)('core/notices');
    const { maybeShowFeedbackBar } = (0, use_feedback_bar_1.useFeedbackBar)();
    const { openPrepublishPanel } = (0, data_1.useDispatch)(product_editor_ui_1.wooProductEditorUiStore);
    const { getProductErrorMessageAndProps } = (0, use_error_handler_1.useErrorHandler)();
    const [editedStatus, , prevStatus] = (0, core_data_1.useEntityProp)('postType', productType, 'status');
    const publishButtonProps = (0, use_publish_1.usePublish)({
        productType,
        ...props,
        onPublishSuccess(savedProduct) {
            const isPublished = savedProduct.status === 'publish' ||
                savedProduct.status === 'future';
            if (isPublished) {
                (0, record_product_event_1.recordProductEvent)('product_update', savedProduct);
            }
            (0, utils_1.showSuccessNotice)(savedProduct, prevStatus);
            maybeShowFeedbackBar();
            if (prevStatus === 'auto-draft' || prevStatus === 'draft') {
                const url = (0, navigation_1.getNewPath)({}, `/product/${savedProduct.id}`);
                (0, navigation_1.navigateTo)({ url });
            }
        },
        async onPublishError(error) {
            const { message, errorProps } = await getProductErrorMessageAndProps(error, visibleTab);
            createErrorNotice(message, errorProps);
        },
    });
    if (productType === 'product' && isMenuButton) {
        function renderPublishButtonMenu(menuProps) {
            return ((0, element_1.createElement)(publish_button_menu_1.PublishButtonMenu, { ...menuProps, postType: productType, visibleTab: visibleTab }));
        }
        if (editedStatus !== 'publish' &&
            editedStatus !== 'future' &&
            window.wcAdminFeatures['product-pre-publish-modal'] &&
            isPrePublishPanelVisible) {
            function handlePrePublishButtonClick(event) {
                if (publishButtonProps['aria-disabled']) {
                    event.preventDefault();
                    return;
                }
                (0, tracks_1.recordEvent)('product_prepublish_panel', {
                    source: constants_1.TRACKS_SOURCE,
                    action: 'view',
                });
                openPrepublishPanel();
            }
            return ((0, element_1.createElement)(publish_button_menu_1.PublishButtonMenu, { ...publishButtonProps, postType: productType, controls: undefined, onClick: handlePrePublishButtonClick, renderMenu: renderPublishButtonMenu, visibleTab: visibleTab }));
        }
        return ((0, element_1.createElement)(publish_button_menu_1.PublishButtonMenu, { ...publishButtonProps, postType: productType, controls: undefined, renderMenu: renderPublishButtonMenu, visibleTab: visibleTab }));
    }
    return (0, element_1.createElement)(components_1.Button, { ...publishButtonProps });
}
