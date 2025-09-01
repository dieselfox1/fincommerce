"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalizationTagsLinkPopover = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const store_1 = require("../../store");
const PersonalizationTagsLinkPopover = ({ contentRef, onUpdate, }) => {
    const [isPopoverVisible, setIsPopoverVisible] = (0, element_1.useState)(false);
    const [linkElement, setLinkElement] = (0, element_1.useState)(null);
    const [linkText, setLinkText] = (0, element_1.useState)('');
    const [linkHref, setLinkHref] = (0, element_1.useState)('');
    const list = (0, data_1.useSelect)((select) => select(store_1.storeName).getPersonalizationTagsList(), []);
    (0, element_1.useEffect)(() => {
        if (!contentRef || !contentRef.current) {
            return undefined;
        }
        const container = contentRef.current;
        // Handle clicks within the referenced container
        const handleContainerClick = (event) => {
            const target = event.target;
            const element = target.closest('a[data-link-href]');
            if (element) {
                // Remove brackets from the text content for better user experience
                setLinkElement(element);
                setLinkHref(element.getAttribute('data-link-href') || '');
                setLinkText(element.textContent || '');
                setIsPopoverVisible(true);
            }
        };
        // Add the event listener to the container
        container.addEventListener('click', handleContainerClick);
        // Cleanup function to remove the event listener on unmount
        return () => {
            container.removeEventListener('click', handleContainerClick);
        };
    }, [contentRef]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isPopoverVisible && linkElement && ((0, jsx_runtime_1.jsx)(components_1.Popover, { position: "bottom left", onClose: () => setIsPopoverVisible(false), anchor: linkElement, className: "fincommerce-personalization-tag-popover", children: (0, jsx_runtime_1.jsxs)("div", { className: "fincommerce-personalization-tag-popover-content", children: [(0, jsx_runtime_1.jsx)(components_1.TextControl, { label: (0, i18n_1.__)('Link Text', 'fincommerce'), value: linkText, onChange: (value) => setLinkText(value), __nextHasNoMarginBottom // To avoid warning about deprecation in console
                        : true, __next40pxDefaultSize: true, autoComplete: "off" }), (0, jsx_runtime_1.jsx)(components_1.SelectControl, { __next40pxDefaultSize: true, __nextHasNoMarginBottom: true, label: (0, i18n_1.__)('Link tag', 'fincommerce'), value: linkHref, onChange: (value) => {
                            setLinkHref(value);
                        }, options: list
                            .filter((tag) => {
                            return (tag.category ===
                                (0, i18n_1.__)('Link', 'fincommerce'));
                        })
                            .map((tag) => {
                            return {
                                label: tag.name,
                                value: tag.token,
                            };
                        }) }), (0, jsx_runtime_1.jsxs)("div", { className: "fincommerce-personalization-tag-popover-content-buttons", children: [(0, jsx_runtime_1.jsx)(components_1.Button, { isTertiary: true, onClick: () => {
                                    setIsPopoverVisible(false);
                                }, children: (0, i18n_1.__)('Cancel', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.Button, { isPrimary: true, onClick: () => {
                                    setIsPopoverVisible(false);
                                    onUpdate(linkElement, linkHref, linkText);
                                }, children: (0, i18n_1.__)('Update link', 'fincommerce') })] })] }) })) }));
};
exports.PersonalizationTagsLinkPopover = PersonalizationTagsLinkPopover;
