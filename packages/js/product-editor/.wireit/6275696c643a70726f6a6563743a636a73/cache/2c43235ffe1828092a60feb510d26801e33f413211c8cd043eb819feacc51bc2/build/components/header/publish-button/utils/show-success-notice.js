"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSuccessNotice = showSuccessNotice;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const utils_1 = require("../../../../utils");
function getNoticeContent(product, prevStatus) {
    if (product.status === 'future') {
        return (0, i18n_1.sprintf)(
        // translators: %s: The datetime the product is scheduled for.
        (0, i18n_1.__)('Product scheduled for %s.', 'fincommerce'), (0, utils_1.formatScheduleDatetime)(`${product.date_created_gmt}+00:00`));
    }
    if (prevStatus === 'publish' || prevStatus === 'future') {
        return (0, i18n_1.__)('Product updated.', 'fincommerce');
    }
    return (0, i18n_1.__)('Product published.', 'fincommerce');
}
function showSuccessNotice(product, prevStatus) {
    const { createSuccessNotice } = (0, data_1.dispatch)('core/notices');
    const noticeContent = getNoticeContent(product, prevStatus);
    const noticeOptions = {
        icon: '🎉',
        actions: [
            {
                label: (0, i18n_1.__)('View in store', 'fincommerce'),
                // Leave the url to support a11y.
                url: product.permalink,
                onClick(event) {
                    event.preventDefault();
                    // Notice actions do not support target anchor prop,
                    // so this forces the page to be opened in a new tab.
                    window.open(product.permalink, '_blank');
                },
            },
        ],
    };
    createSuccessNotice(noticeContent, noticeOptions);
}
