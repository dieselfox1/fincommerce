"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalizationTagsPopover = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
/**
 * Component to display a popover with a text control to update personalization tags.
 * The popover is displayed when a user clicks on a personalization tag in the editor.
 *
 * @param root0
 * @param root0.contentRef Reference to the container where the popover should be displayed
 * @param root0.onUpdate   Callback to update the personalization tag
 */
const PersonalizationTagsPopover = ({ contentRef, onUpdate, }) => {
    const [isPopoverVisible, setIsPopoverVisible] = (0, element_1.useState)(false);
    const [anchor, setAnchor] = (0, element_1.useState)(null);
    const [updatedValue, setUpdatedValue] = (0, element_1.useState)('');
    const [originalValue, setOriginalValue] = (0, element_1.useState)('');
    (0, element_1.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isPopoverVisible && anchor && ((0, jsx_runtime_1.jsx)(components_1.Popover, { position: "bottom right", onClose: () => setIsPopoverVisible(false), anchor: anchor, className: "fincommerce-personalization-tag-popover", children: (0, jsx_runtime_1.jsxs)("div", { className: "fincommerce-personalization-tag-popover-content", children: [(0, jsx_runtime_1.jsx)(components_1.TextControl, { label: (0, i18n_1.__)('Personalization Tag', 'fincommerce'), value: updatedValue, onChange: (value) => setUpdatedValue(value), __nextHasNoMarginBottom // To avoid warning about deprecation in console
                        : true, __next40pxDefaultSize: true }), (0, jsx_runtime_1.jsxs)("div", { className: "fincommerce-personalization-tag-popover-content-buttons", children: [(0, jsx_runtime_1.jsx)(components_1.Button, { isTertiary: true, onClick: () => {
                                    setIsPopoverVisible(false);
                                }, children: (0, i18n_1.__)('Cancel', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.Button, { isPrimary: true, onClick: () => {
                                    onUpdate(originalValue, updatedValue);
                                    setIsPopoverVisible(false);
                                }, children: (0, i18n_1.__)('Update', 'fincommerce') })] })] }) })) }));
};
exports.PersonalizationTagsPopover = PersonalizationTagsPopover;
