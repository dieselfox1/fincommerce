"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPublishSection = PostPublishSection;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const tracks_1 = require("@fincommerce/tracks");
const compose_1 = require("@wordpress/compose");
const navigation_1 = require("@fincommerce/navigation");
/**
 * Internal dependencies
 */
const use_product_scheduled_1 = require("../../../hooks/use-product-scheduled");
const constants_1 = require("../../../constants");
const use_product_url_1 = require("../../../hooks/use-product-url");
function PostPublishSection({ postType }) {
    const { getProductURL } = (0, use_product_url_1.useProductURL)(postType);
    const { isScheduled } = (0, use_product_scheduled_1.useProductScheduled)(postType);
    const [showCopyConfirmation, setShowCopyConfirmation] = (0, element_1.useState)(false);
    const productURL = getProductURL(isScheduled);
    if (!productURL)
        return null;
    const CopyButton = ({ text, onCopy, children }) => {
        const ref = (0, compose_1.useCopyToClipboard)(text, onCopy);
        return ((0, element_1.createElement)(components_1.Button, { variant: "secondary", ref: ref }, children));
    };
    const onCopyURL = () => {
        (0, tracks_1.recordEvent)('product_prepublish_panel', {
            source: constants_1.TRACKS_SOURCE,
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
    return ((0, element_1.createElement)(components_1.PanelBody, null,
        (0, element_1.createElement)("p", { className: "post-publish-section__postpublish-subheader" },
            (0, element_1.createElement)("strong", null, (0, i18n_1.__)('What’s next?', 'fincommerce'))),
        (0, element_1.createElement)("div", { className: "post-publish-section__postpublish-post-address-container" },
            (0, element_1.createElement)(components_1.TextControl, { className: "post-publish-section__postpublish-post-address", readOnly: true, label: (0, i18n_1.__)('product address', 'fincommerce'), value: productURL, onFocus: onSelectInput }),
            (0, element_1.createElement)("div", { className: "post-publish-section__copy-button-wrap" },
                (0, element_1.createElement)(CopyButton, { text: productURL, onCopy: onCopyURL },
                    (0, element_1.createElement)(element_1.Fragment, null, showCopyConfirmation
                        ? (0, i18n_1.__)('Copied!', 'fincommerce')
                        : (0, i18n_1.__)('Copy', 'fincommerce'))))),
        (0, element_1.createElement)("div", { className: "post-publish-section__postpublish-buttons" },
            !isScheduled && ((0, element_1.createElement)(components_1.Button, { variant: "primary", href: productURL }, (0, i18n_1.__)('View Product', 'fincommerce'))),
            (0, element_1.createElement)(components_1.Button, { variant: isScheduled ? 'primary' : 'secondary', href: (0, navigation_1.getNewPath)({}, '/add-product', {}) }, (0, i18n_1.__)('Add New Product', 'fincommerce')))));
}
