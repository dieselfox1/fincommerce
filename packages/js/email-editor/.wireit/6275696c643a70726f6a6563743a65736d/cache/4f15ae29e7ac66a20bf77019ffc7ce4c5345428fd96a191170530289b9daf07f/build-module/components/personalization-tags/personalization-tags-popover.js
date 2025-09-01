import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { Popover, Button, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Component to display a popover with a text control to update personalization tags.
 * The popover is displayed when a user clicks on a personalization tag in the editor.
 *
 * @param root0
 * @param root0.contentRef Reference to the container where the popover should be displayed
 * @param root0.onUpdate   Callback to update the personalization tag
 */
const PersonalizationTagsPopover = ({ contentRef, onUpdate, }) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const [updatedValue, setUpdatedValue] = useState('');
    const [originalValue, setOriginalValue] = useState('');
    useEffect(() => {
        if (!contentRef || !contentRef.current) {
            return undefined;
        }
        const container = contentRef.current;
        // Handle clicks within the referenced container
        const handleContainerClick = (event) => {
            const target = event.target;
            const commentSpan = target.closest('span[data-rich-text-comment]');
            if (commentSpan) {
                // Remove brackets from the text content for better user experience
                const textContent = commentSpan.innerText.replace(/^\[|\]$/g, '');
                setOriginalValue(textContent);
                setUpdatedValue(textContent);
                setAnchor(commentSpan);
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
    return (_jsx(_Fragment, { children: isPopoverVisible && anchor && (_jsx(Popover, { position: "bottom right", onClose: () => setIsPopoverVisible(false), anchor: anchor, className: "fincommerce-personalization-tag-popover", children: _jsxs("div", { className: "fincommerce-personalization-tag-popover-content", children: [_jsx(TextControl, { label: __('Personalization Tag', 'fincommerce'), value: updatedValue, onChange: (value) => setUpdatedValue(value), __nextHasNoMarginBottom // To avoid warning about deprecation in console
                        : true, __next40pxDefaultSize: true }), _jsxs("div", { className: "fincommerce-personalization-tag-popover-content-buttons", children: [_jsx(Button, { isTertiary: true, onClick: () => {
                                    setIsPopoverVisible(false);
                                }, children: __('Cancel', 'fincommerce') }), _jsx(Button, { isPrimary: true, onClick: () => {
                                    onUpdate(originalValue, updatedValue);
                                    setIsPopoverVisible(false);
                                }, children: __('Update', 'fincommerce') })] })] }) })) }));
};
export { PersonalizationTagsPopover };
