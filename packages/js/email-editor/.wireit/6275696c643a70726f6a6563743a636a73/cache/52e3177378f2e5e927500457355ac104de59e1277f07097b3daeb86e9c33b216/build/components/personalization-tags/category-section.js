"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
const block_editor_1 = require("@wordpress/block-editor");
const CategorySection = ({ groupedTags, activeCategory, onInsert, canInsertLink, closeCallback, openLinkModal, }) => {
    const { updateBlockAttributes } = (0, data_1.useDispatch)(block_editor_1.store);
    const selectedBlockId = (0, data_1.useSelect)((select) => select(block_editor_1.store).getSelectedBlockClientId());
    const selectedBlock = (0, data_1.useSelect)((select) => select(block_editor_1.store).getBlock(selectedBlockId));
    const canSetURL = ['core/button'].includes(selectedBlock?.name);
    const categoriesToRender = activeCategory === null
        ? Object.entries(groupedTags) // Render all categories
        : [[activeCategory, groupedTags[activeCategory] || []]]; // Render only one selected category
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: categoriesToRender.map(([category, items]) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "fincommerce-personalization-tags-modal-category", children: category }), (0, jsx_runtime_1.jsx)("div", { className: "fincommerce-personalization-tags-modal-category-group", children: items.map((item) => {
                        // Detects if the personalization tag is expected to return a URL by checking the token name,
                        // since personalization tags lack explicit return type definitions.
                        const isURLTag = /\burl\b/.test(item.token);
                        return ((0, jsx_runtime_1.jsxs)("div", { className: "fincommerce-personalization-tags-modal-category-group-item", children: [(0, jsx_runtime_1.jsxs)("div", { className: "fincommerce-personalization-tags-modal-item-text", children: [(0, jsx_runtime_1.jsx)("strong", { children: item.name }), item.valueToInsert] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                    }, children: [(0, jsx_runtime_1.jsx)(components_1.Button, { variant: "link", onClick: () => {
                                                if (onInsert) {
                                                    onInsert(item.valueToInsert, false);
                                                }
                                            }, children: (0, i18n_1.__)('Insert', 'fincommerce') }), canSetURL && isURLTag && ((0, jsx_runtime_1.jsx)(components_1.Button, { variant: "link", onClick: () => {
                                                updateBlockAttributes(selectedBlockId, {
                                                    url: item.valueToInsert,
                                                });
                                                closeCallback();
                                            }, children: (0, i18n_1.__)('Set as URL', 'fincommerce') })), category ===
                                            (0, i18n_1.__)('Link', 'fincommerce') &&
                                            canInsertLink && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(components_1.Button, { variant: "link", onClick: () => {
                                                    closeCallback();
                                                    openLinkModal(item);
                                                }, children: (0, i18n_1.__)('Insert as link', 'fincommerce') }) }))] })] }, item.token));
                    }) })] }, category))) }));
};
exports.CategorySection = CategorySection;
