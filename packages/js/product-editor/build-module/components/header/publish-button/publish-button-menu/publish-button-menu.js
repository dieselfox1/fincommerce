/**
 * External dependencies
 */
import { MenuGroup, MenuItem } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';
import { createElement, Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getNewPath, navigateTo } from '@fincommerce/navigation';
import { getAdminLink } from '@fincommerce/settings';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { useProductManager } from '../../../../hooks/use-product-manager';
import { useProductScheduled } from '../../../../hooks/use-product-scheduled';
import { recordProductEvent } from '../../../../utils/record-product-event';
import { useErrorHandler } from '../../../../hooks/use-error-handler';
import { ButtonWithDropdownMenu } from '../../../button-with-dropdown-menu';
import { SchedulePublishModal } from '../../../schedule-publish-modal';
import { showSuccessNotice } from '../utils';
import { TRACKS_SOURCE } from '../../../../constants';
export function PublishButtonMenu({ postType, visibleTab = 'general', ...props }) {
    const { isScheduling, isScheduled, schedule, date, formattedDate } = useProductScheduled(postType);
    const [showScheduleModal, setShowScheduleModal] = useState();
    const { copyToDraft, trash } = useProductManager(postType);
    const { createErrorNotice, createSuccessNotice } = useDispatch('core/notices');
    const [, , prevStatus] = useEntityProp('postType', postType, 'status');
    const { getProductErrorMessageAndProps } = useErrorHandler();
    function scheduleProduct(dateString) {
        schedule(dateString)
            .then((scheduledProduct) => {
            recordProductEvent('product_schedule', scheduledProduct);
            showSuccessNotice(scheduledProduct);
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
        return (showScheduleModal && (createElement(SchedulePublishModal, { postType: postType, value: showScheduleModal === 'edit' ? date : undefined, isScheduling: isScheduling, onCancel: () => setShowScheduleModal(undefined), onSchedule: scheduleProduct })));
    }
    function renderMenu({ onClose }) {
        return (createElement(Fragment, null,
            createElement(MenuGroup, null, isScheduled ? (createElement(Fragment, null,
                createElement(MenuItem, { onClick: () => {
                        scheduleProduct();
                        if (onClose) {
                            onClose();
                        }
                    } }, __('Publish now', 'fincommerce')),
                createElement(MenuItem, { info: formattedDate, onClick: () => {
                        setShowScheduleModal('edit');
                        if (onClose) {
                            onClose();
                        }
                    } }, __('Edit schedule', 'fincommerce')))) : (createElement(MenuItem, { onClick: () => {
                    recordEvent('product_schedule_publish', {
                        source: TRACKS_SOURCE,
                    });
                    setShowScheduleModal('schedule');
                    if (onClose) {
                        onClose();
                    }
                } }, __('Schedule publish', 'fincommerce')))),
            prevStatus !== 'trash' && (createElement(MenuGroup, null,
                createElement(MenuItem, { onClick: () => {
                        copyToDraft()
                            .then((duplicatedProduct) => {
                            recordProductEvent('product_copied_to_draft', duplicatedProduct);
                            createSuccessNotice(__('Product successfully duplicated', 'fincommerce'));
                            const url = getNewPath({}, `/product/${duplicatedProduct.id}`);
                            navigateTo({ url });
                        })
                            .catch(async (error) => {
                            const { message, errorProps } = await getProductErrorMessageAndProps(error, visibleTab);
                            createErrorNotice(message, errorProps);
                        });
                        if (onClose) {
                            onClose();
                        }
                    } }, __('Copy to a new draft', 'fincommerce')),
                createElement(MenuItem, { isDestructive: true, onClick: () => {
                        trash()
                            .then((deletedProduct) => {
                            recordProductEvent('product_delete', deletedProduct);
                            createSuccessNotice(__('Product successfully deleted', 'fincommerce'));
                            const productListUrl = getAdminLink('edit.php?post_type=product');
                            navigateTo({
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
                    } }, __('Move to trash', 'fincommerce'))))));
    }
    return (createElement(Fragment, null,
        createElement(ButtonWithDropdownMenu, { ...props, onToggle: (isOpen) => {
                if (isOpen) {
                    recordEvent('product_publish_dropdown_open', {
                        source: TRACKS_SOURCE,
                    });
                }
                props.onToggle?.(isOpen);
            }, renderMenu: renderMenu }),
        renderSchedulePublishModal()));
}
