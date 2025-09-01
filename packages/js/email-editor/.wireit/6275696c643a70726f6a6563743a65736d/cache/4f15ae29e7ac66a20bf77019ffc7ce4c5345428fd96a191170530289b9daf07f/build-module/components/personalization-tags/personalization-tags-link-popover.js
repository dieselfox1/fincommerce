import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Popover, Button, TextControl, SelectControl, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { storeName } from '../../store';
const PersonalizationTagsLinkPopover = ({ contentRef, onUpdate, }) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [linkElement, setLinkElement] = useState(null);
    const [linkText, setLinkText] = useState('');
    const [linkHref, setLinkHref] = useState('');
    const list = useSelect((select) => select(storeName).getPersonalizationTagsList(), []);
    useEffect(() => {
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
    return (_jsx(_Fragment, { children: isPopoverVisible && linkElement && (_jsx(Popover, { position: "bottom left", onClose: () => setIsPopoverVisible(false), anchor: linkElement, className: "fincommerce-personalization-tag-popover", children: _jsxs("div", { className: "fincommerce-personalization-tag-popover-content", children: [_jsx(TextControl, { label: __('Link Text', 'fincommerce'), value: linkText, onChange: (value) => setLinkText(value), __nextHasNoMarginBottom // To avoid warning about deprecation in console
                        : true, __next40pxDefaultSize: true, autoComplete: "off" }), _jsx(SelectControl, { __next40pxDefaultSize: true, __nextHasNoMarginBottom: true, label: __('Link tag', 'fincommerce'), value: linkHref, onChange: (value) => {
                            setLinkHref(value);
                        }, options: list
                            .filter((tag) => {
                            return (tag.category ===
                                __('Link', 'fincommerce'));
                        })
                            .map((tag) => {
                            return {
                                label: tag.name,
                                value: tag.token,
                            };
                        }) }), _jsxs("div", { className: "fincommerce-personalization-tag-popover-content-buttons", children: [_jsx(Button, { isTertiary: true, onClick: () => {
                                    setIsPopoverVisible(false);
                                }, children: __('Cancel', 'fincommerce') }), _jsx(Button, { isPrimary: true, onClick: () => {
                                    setIsPopoverVisible(false);
                                    onUpdate(linkElement, linkHref, linkText);
                                }, children: __('Update link', 'fincommerce') })] })] }) })) }));
};
export { PersonalizationTagsLinkPopover };
