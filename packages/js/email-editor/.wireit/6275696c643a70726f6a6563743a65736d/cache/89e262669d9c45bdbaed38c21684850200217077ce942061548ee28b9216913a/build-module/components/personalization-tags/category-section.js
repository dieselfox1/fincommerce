import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
const CategorySection = ({ groupedTags, activeCategory, onInsert, canInsertLink, closeCallback, openLinkModal, }) => {
    const { updateBlockAttributes } = useDispatch(blockEditorStore);
    const selectedBlockId = useSelect((select) => select(blockEditorStore).getSelectedBlockClientId());
    const selectedBlock = useSelect((select) => select(blockEditorStore).getBlock(selectedBlockId));
    const canSetURL = ['core/button'].includes(selectedBlock?.name);
    const categoriesToRender = activeCategory === null
        ? Object.entries(groupedTags) // Render all categories
        : [[activeCategory, groupedTags[activeCategory] || []]]; // Render only one selected category
    return (_jsx(_Fragment, { children: categoriesToRender.map(([category, items]) => (_jsxs("div", { children: [_jsx("div", { className: "fincommerce-personalization-tags-modal-category", children: category }), _jsx("div", { className: "fincommerce-personalization-tags-modal-category-group", children: items.map((item) => {
                        // Detects if the personalization tag is expected to return a URL by checking the token name,
                        // since personalization tags lack explicit return type definitions.
                        const isURLTag = /\burl\b/.test(item.token);
                        return (_jsxs("div", { className: "fincommerce-personalization-tags-modal-category-group-item", children: [_jsxs("div", { className: "fincommerce-personalization-tags-modal-item-text", children: [_jsx("strong", { children: item.name }), item.valueToInsert] }), _jsxs("div", { style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                    }, children: [_jsx(Button, { variant: "link", onClick: () => {
                                                if (onInsert) {
                                                    onInsert(item.valueToInsert, false);
                                                }
                                            }, children: __('Insert', 'fincommerce') }), canSetURL && isURLTag && (_jsx(Button, { variant: "link", onClick: () => {
                                                updateBlockAttributes(selectedBlockId, {
                                                    url: item.valueToInsert,
                                                });
                                                closeCallback();
                                            }, children: __('Set as URL', 'fincommerce') })), category ===
                                            __('Link', 'fincommerce') &&
                                            canInsertLink && (_jsx(_Fragment, { children: _jsx(Button, { variant: "link", onClick: () => {
                                                    closeCallback();
                                                    openLinkModal(item);
                                                }, children: __('Insert as link', 'fincommerce') }) }))] })] }, item.token));
                    }) })] }, category))) }));
};
export { CategorySection };
