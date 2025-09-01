"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const core_data_1 = require("@wordpress/core-data");
const i18n_1 = require("@wordpress/i18n");
const notices_1 = require("@wordpress/notices");
const icons_1 = require("@wordpress/icons");
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const components_1 = require("@wordpress/components");
const html_entities_1 = require("@wordpress/html-entities");
const hooks_1 = require("@wordpress/hooks");
/**
 * Internal dependencies
 */
const store_1 = require("../../store");
const events_1 = require("../../events");
function getItemTitle(item) {
    if (typeof item.title === 'string') {
        return (0, html_entities_1.decodeEntities)(item.title);
    }
    if (item.title && 'rendered' in item.title) {
        return (0, html_entities_1.decodeEntities)(item.title.rendered);
    }
    if (item.title && 'raw' in item.title) {
        return (0, html_entities_1.decodeEntities)(item.title.raw);
    }
    return '';
}
function getModalTitle(items, shouldPermanentlyDelete) {
    if (shouldPermanentlyDelete) {
        return items.length > 1
            ? (0, i18n_1.sprintf)(
            // translators: %d: number of items to delete.
            (0, i18n_1._n)('Are you sure you want to permanently delete %d item?', 'Are you sure you want to permanently delete %d items?', items.length, 'fincommerce'), items.length)
            : (0, i18n_1.sprintf)(
            // translators: %s: The post's title
            (0, i18n_1.__)('Are you sure you want to permanently delete "%s"?', 'fincommerce'), (0, html_entities_1.decodeEntities)(getItemTitle(items[0])));
    }
    return items.length > 1
        ? (0, i18n_1.sprintf)(
        // translators: %d: The number of items (2 or more).
        (0, i18n_1._n)('Are you sure you want to move %d item to the trash ?', 'Are you sure you want to move %d items to the trash ?', items.length, 'fincommerce'), items.length)
        : (0, i18n_1.sprintf)(
        // translators: %s: The item's title.
        (0, i18n_1.__)('Are you sure you want to move "%s" to the trash?', 'fincommerce'), getItemTitle(items[0]));
}
const getTrashEmailPostAction = () => {
    const shouldPermanentlyDelete = (0, hooks_1.applyFilters)('fincommerce_email_editor_trash_modal_should_permanently_delete', false);
    /**
     * Trash email post action.
     * A custom action to permanently delete or move to trash email posts.
     * Cloned from core: https://github.com/WordPress/gutenberg/blob/da7adc0975d4736e555c7f81b8820b0cc4439d6c/packages/fields/src/actions/permanently-delete-post.tsx
     */
    const trashEmailPost = {
        id: 'trash-email-post',
        label: shouldPermanentlyDelete
            ? (0, i18n_1.__)('Permanently delete', 'fincommerce')
            : (0, i18n_1.__)('Move to trash', 'fincommerce'),
        supportsBulk: true,
        icon: icons_1.trash,
        isEligible(item) {
            if (item.type === 'wp_template' ||
                item.type === 'wp_template_part' ||
                item.type === 'wp_block') {
                return false;
            }
            const { permissions } = item;
            return permissions?.delete;
        },
        hideModalHeader: true,
        modalFocusOnMount: 'firstContentElement',
        RenderModal: ({ items, closeModal, onActionPerformed }) => {
            const [isBusy, setIsBusy] = (0, element_1.useState)(false);
            const { createSuccessNotice, createErrorNotice } = (0, data_1.useDispatch)(notices_1.store);
            const { deleteEntityRecord } = (0, data_1.useDispatch)(core_data_1.store);
            const { urls } = (0, data_1.useSelect)((select) => ({
                urls: select(store_1.storeName).getUrls(),
            }), []);
            const goToListings = () => {
                if (urls?.listings) {
                    window.location.href = urls.listings;
                }
            };
            return ((0, jsx_runtime_1.jsxs)(components_1.__experimentalVStack, { spacing: "5", children: [(0, jsx_runtime_1.jsx)(components_1.__experimentalText, { children: getModalTitle(items, shouldPermanentlyDelete) }), (0, jsx_runtime_1.jsxs)(components_1.__experimentalHStack, { justify: "right", children: [(0, jsx_runtime_1.jsx)(components_1.Button, { variant: "tertiary", onClick: () => {
                                    closeModal?.();
                                    (0, events_1.recordEvent)('trash_modal_cancel_button_clicked');
                                }, disabled: isBusy, __next40pxDefaultSize: true, children: (0, i18n_1.__)('Cancel', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.Button, { variant: "primary", onClick: async () => {
                                    (0, events_1.recordEvent)('trash_modal_move_to_trash_button_clicked');
                                    setIsBusy(true);
                                    const promiseResult = await Promise.allSettled(items.map((post) => deleteEntityRecord('postType', post.type, post.id, { force: shouldPermanentlyDelete }, { throwOnError: true })));
                                    // If all the promises were fulfilled with success.
                                    if (promiseResult.every(({ status }) => status === 'fulfilled')) {
                                        let successMessage;
                                        if (promiseResult.length === 1) {
                                            successMessage = shouldPermanentlyDelete
                                                ? (0, i18n_1.sprintf)(
                                                /* translators: The posts's title. */
                                                (0, i18n_1.__)('"%s" permanently deleted.', 'fincommerce'), getItemTitle(items[0]))
                                                : (0, i18n_1.sprintf)(
                                                /* translators: The item's title. */
                                                (0, i18n_1.__)('"%s" moved to the trash.', 'fincommerce'), getItemTitle(items[0]));
                                        }
                                        else {
                                            successMessage = shouldPermanentlyDelete
                                                ? (0, i18n_1.__)('The items were permanently deleted.', 'fincommerce')
                                                : (0, i18n_1.sprintf)(
                                                /* translators: The number of items. */
                                                (0, i18n_1._n)('%s item moved to the trash.', '%s items moved to the trash.', items.length, 'fincommerce'), items.length);
                                        }
                                        createSuccessNotice(successMessage, {
                                            type: 'snackbar',
                                            id: 'trash-email-post-action',
                                        });
                                        onActionPerformed?.(items);
                                        goToListings();
                                    }
                                    else {
                                        // If there was at lease one failure.
                                        let errorMessage;
                                        // If we were trying to permanently delete a single post.
                                        if (promiseResult.length === 1) {
                                            const typedError = promiseResult[0];
                                            if (typedError.reason?.message) {
                                                errorMessage =
                                                    typedError.reason.message;
                                            }
                                            else {
                                                errorMessage = (0, i18n_1.__)('An error occurred while performing the action.', 'fincommerce');
                                            }
                                            // If we were trying to permanently delete multiple posts
                                        }
                                        else {
                                            const errorMessages = new Set();
                                            const failedPromises = promiseResult.filter(({ status }) => status === 'rejected');
                                            for (const failedPromise of failedPromises) {
                                                const typedError = failedPromise;
                                                if (typedError.reason?.message) {
                                                    errorMessages.add(typedError.reason.message);
                                                }
                                            }
                                            if (errorMessages.size === 0) {
                                                errorMessage = (0, i18n_1.__)('An error occurred while performing the action.', 'fincommerce');
                                            }
                                            else if (errorMessages.size === 1) {
                                                errorMessage = (0, i18n_1.sprintf)(
                                                /* translators: %s: an error message */
                                                (0, i18n_1.__)('An error occurred while performing the action: %s', 'fincommerce'), [...errorMessages][0]);
                                            }
                                            else {
                                                errorMessage = (0, i18n_1.sprintf)(
                                                /* translators: %s: a list of comma separated error messages */
                                                (0, i18n_1.__)('Some errors occurred while performing the action: %s', 'fincommerce'), [...errorMessages].join(','));
                                            }
                                        }
                                        (0, events_1.recordEvent)('trash_modal_move_to_trash_error', {
                                            errorMessage,
                                        });
                                        createErrorNotice(errorMessage, {
                                            type: 'snackbar',
                                        });
                                    }
                                    setIsBusy(false);
                                    closeModal?.();
                                }, isBusy: isBusy, disabled: isBusy, __next40pxDefaultSize: true, children: shouldPermanentlyDelete
                                    ? (0, i18n_1.__)('Delete permanently', 'fincommerce')
                                    : (0, i18n_1.__)('Move to trash', 'fincommerce') })] })] }));
        },
    };
    return trashEmailPost;
};
/**
 * Delete action for PostWithPermissions.
 */
exports.default = getTrashEmailPostAction;
