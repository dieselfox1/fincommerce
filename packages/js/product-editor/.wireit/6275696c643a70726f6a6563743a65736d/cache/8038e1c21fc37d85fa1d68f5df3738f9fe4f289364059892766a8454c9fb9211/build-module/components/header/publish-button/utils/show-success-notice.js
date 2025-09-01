/**
 * External dependencies
 */
import { dispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { formatScheduleDatetime } from '../../../../utils';
function getNoticeContent(product, prevStatus) {
    if (product.status === 'future') {
        return sprintf(
        // translators: %s: The datetime the product is scheduled for.
        __('Product scheduled for %s.', 'fincommerce'), formatScheduleDatetime(`${product.date_created_gmt}+00:00`));
    }
    if (prevStatus === 'publish' || prevStatus === 'future') {
        return __('Product updated.', 'fincommerce');
    }
    return __('Product published.', 'fincommerce');
}
export function showSuccessNotice(product, prevStatus) {
    const { createSuccessNotice } = dispatch('core/notices');
    const noticeContent = getNoticeContent(product, prevStatus);
    const noticeOptions = {
        icon: '🎉',
        actions: [
            {
                label: __('View in store', 'fincommerce'),
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
