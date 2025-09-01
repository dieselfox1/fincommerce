/**
 * External dependencies
 */
import { createElement, useState, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import { recordEvent } from '@fincommerce/tracks';
import { useCopyToClipboard } from '@wordpress/compose';
import { getNewPath } from '@fincommerce/navigation';
/**
 * Internal dependencies
 */
import { useProductScheduled } from '../../../hooks/use-product-scheduled';
import { TRACKS_SOURCE } from '../../../constants';
import { useProductURL } from '../../../hooks/use-product-url';
export function PostPublishSection({ postType }) {
    const { getProductURL } = useProductURL(postType);
    const { isScheduled } = useProductScheduled(postType);
    const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);
    const productURL = getProductURL(isScheduled);
    if (!productURL)
        return null;
    const CopyButton = ({ text, onCopy, children }) => {
        const ref = useCopyToClipboard(text, onCopy);
        return (createElement(Button, { variant: "secondary", ref: ref }, children));
    };
    const onCopyURL = () => {
        recordEvent('product_prepublish_panel', {
            source: TRACKS_SOURCE,
            action: 'copy_product_url',
        });
        setShowCopyConfirmation(true);
        setTimeout(() => {
            setShowCopyConfirmation(false);
        }, 4000);
    };
    const onSelectInput = (event) => {
        event.target.select();
    };
    return (createElement(PanelBody, null,
        createElement("p", { className: "post-publish-section__postpublish-subheader" },
            createElement("strong", null, __('What’s next?', 'fincommerce'))),
        createElement("div", { className: "post-publish-section__postpublish-post-address-container" },
            createElement(TextControl, { className: "post-publish-section__postpublish-post-address", readOnly: true, label: __('product address', 'fincommerce'), value: productURL, onFocus: onSelectInput }),
            createElement("div", { className: "post-publish-section__copy-button-wrap" },
                createElement(CopyButton, { text: productURL, onCopy: onCopyURL },
                    createElement(Fragment, null, showCopyConfirmation
                        ? __('Copied!', 'fincommerce')
                        : __('Copy', 'fincommerce'))))),
        createElement("div", { className: "post-publish-section__postpublish-buttons" },
            !isScheduled && (createElement(Button, { variant: "primary", href: productURL }, __('View Product', 'fincommerce'))),
            createElement(Button, { variant: isScheduled ? 'primary' : 'secondary', href: getNewPath({}, '/add-product', {}) }, __('Add New Product', 'fincommerce')))));
}
