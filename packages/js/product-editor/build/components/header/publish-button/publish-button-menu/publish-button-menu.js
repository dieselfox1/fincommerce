"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishButtonMenu = PublishButtonMenu;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const core_data_1 = require("@wordpress/core-data");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const navigation_1 = require("@fincommerce/navigation");
const settings_1 = require("@fincommerce/settings");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const use_product_manager_1 = require("../../../../hooks/use-product-manager");
const use_product_scheduled_1 = require("../../../../hooks/use-product-scheduled");
const record_product_event_1 = require("../../../../utils/record-product-event");
const use_error_handler_1 = require("../../../../hooks/use-error-handler");
const button_with_dropdown_menu_1 = require("../../../button-with-dropdown-menu");
const schedule_publish_modal_1 = require("../../../schedule-publish-modal");
const utils_1 = require("../utils");
const constants_1 = require("../../../../constants");
function PublishButtonMenu({ postType, visibleTab = 'general', ...props }) {
    const { isScheduling, isScheduled, schedule, date, formattedDate } = (0, use_product_scheduled_1.useProductScheduled)(postType);
    const [showScheduleModal, setShowScheduleModal] = (0, element_1.useState)();
    const { copyToDraft, trash } = (0, use_product_manager_1.useProductManager)(postType);
    const { createErrorNotice, createSuccessNotice } = (0, data_1.useDispatch)('core/notices');
    const [, , prevStatus] = (0, core_data_1.useEntityProp)('postType', postType, 'status');
    const { getProductErrorMessageAndProps } = (0, use_error_handler_1.useErrorHandler)();
    function scheduleProduct(dateString) {
        schedule(dateString)
            .then((scheduledProduct) => {
            (0, record_product_event_1.recordProductEvent)('product_schedule', scheduledProduct);
            (0, utils_1.showSuccessNotice)(scheduledProduct);
        })
            .catch(async (error) => {
            const { message, errorProps } = await getProductErrorMessageAndProps(error, visibleTab);
            createErrorNotice(message, errorProps);
        })
            .finally(() => {
            setShowScheduleModal(undefined);
        });
    }
    function renderSchedulePublishModal() {
        return (showScheduleModal && ((0, element_1.createElement)(schedule_publish_modal_1.SchedulePublishModal, { postType: postType, value: showScheduleModal === 'edit' ? date : undefined, isScheduling: isScheduling, onCancel: () => setShowScheduleModal(undefined), onSchedule: scheduleProduct })));
    }
    function renderMenu({ onClose }) {
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(components_1.MenuGroup, null, isScheduled ? ((0, element_1.createElement)(element_1.Fragment, null,
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        scheduleProduct();
                        if (onClose) {
                            onClose();
                        }
                    } }, (0, i18n_1.__)('Publish now', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { info: formattedDate, onClick: () => {
                        setShowScheduleModal('edit');
                        if (onClose) {
                            onClose();
                        }
                    } }, (0, i18n_1.__)('Edit schedule', 'fincommerce')))) : ((0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                    (0, tracks_1.recordEvent)('product_schedule_publish', {
                        source: constants_1.TRACKS_SOURCE,
                    });
                    setShowScheduleModal('schedule');
                    if (onClose) {
                        onClose();
                    }
                } }, (0, i18n_1.__)('Schedule publish', 'fincommerce')))),
            prevStatus !== 'trash' && ((0, element_1.createElement)(components_1.MenuGroup, null,
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        copyToDraft()
                            .then((duplicatedProduct) => {
                            (0, record_product_event_1.recordProductEvent)('product_copied_to_draft', duplicatedProduct);
                            createSuccessNotice((0, i18n_1.__)('Product successfully duplicated', 'fincommerce'));
                            const url = (0, navigation_1.getNewPath)({}, `/product/${duplicatedProduct.id}`);
                            (0, navigation_1.navigateTo)({ url });
                        })
                            .catch(async (error) => {
                            const { message, errorProps } = await getProductErrorMessageAndProps(error, visibleTab);
                            createErrorNotice(message, errorProps);
                        });
                        if (onClose) {
                            onClose();
                        }
                    } }, (0, i18n_1.__)('Copy to a new draft', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { isDestructive: true, onClick: () => {
                        trash()
                            .then((deletedProduct) => {
                            (0, record_product_event_1.recordProductEvent)('product_delete', deletedProduct);
                            createSuccessNotice((0, i18n_1.__)('Product successfully deleted', 'fincommerce'));
                            const productListUrl = (0, settings_1.getAdminLink)('edit.php?post_type=product');
                            (0, navigation_1.navigateTo)({
                                url: productListUrl,
                            });
                        })
                            .catch(async (error) => {
                            const { message, errorProps } = await getProductErrorMessageAndProps(error, visibleTab);
                            createErrorNotice(message, errorProps);
                        });
                        if (onClose) {
                            onClose();
                        }
                    } }, (0, i18n_1.__)('Move to trash', 'fincommerce'))))));
    }
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(button_with_dropdown_menu_1.ButtonWithDropdownMenu, { ...props, onToggle: (isOpen) => {
                if (isOpen) {
                    (0, tracks_1.recordEvent)('product_publish_dropdown_open', {
                        source: constants_1.TRACKS_SOURCE,
                    });
                }
                props.onToggle?.(isOpen);
            }, renderMenu: renderMenu }),
        renderSchedulePublishModal()));
}
