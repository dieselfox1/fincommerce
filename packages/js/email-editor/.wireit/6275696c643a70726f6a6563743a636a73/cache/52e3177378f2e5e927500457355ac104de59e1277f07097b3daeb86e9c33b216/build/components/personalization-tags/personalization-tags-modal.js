"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalizationTagsModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const category_menu_1 = require("./category-menu");
const category_section_1 = require("./category-section");
const link_modal_1 = require("./link-modal");
const events_1 = require("../../events");
const store_1 = require("../../store");
const PersonalizationTagsModal = ({ onInsert, isOpened, closeCallback, canInsertLink = false, openedBy = '', }) => {
    const [activeCategory, setActiveCategory] = (0, element_1.useState)(null);
    const [searchQuery, setSearchQuery] = (0, element_1.useState)('');
    const [selectedTag, setSelectedTag] = (0, element_1.useState)(null);
    const [isLinkModalOpened, setIsLinkModalOpened] = (0, element_1.useState)(false);
    const list = (0, data_1.useSelect)((select) => select(store_1.storeName).getPersonalizationTagsList(), []);
    if (isLinkModalOpened) {
        return ((0, jsx_runtime_1.jsx)(link_modal_1.LinkModal, { onInsert: (tag, linkText) => {
                onInsert(tag, linkText);
                setIsLinkModalOpened(false);
            }, isOpened: isLinkModalOpened, closeCallback: () => setIsLinkModalOpened(false), tag: selectedTag }));
    }
    if (!isOpened) {
        return null;
    }
    (0, events_1.recordEventOnce)('personalization_tags_modal_opened', { openedBy });
    const groupedTags = list.reduce((groups, item) => {
        const { category, name, token } = item;
        if (!searchQuery ||
            name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.toLowerCase().includes(searchQuery.toLowerCase())) {
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(item);
        }
        return groups;
    }, {});
    return ((0, jsx_runtime_1.jsxs)(components_1.Modal, { size: "medium", title: (0, i18n_1.__)('Personalization Tags', 'fincommerce'), onRequestClose: () => {
            closeCallback();
            (0, events_1.recordEvent)('personalization_tags_modal_closed', {
                openedBy,
            });
        }, className: "fincommerce-personalization-tags-modal", children: [(0, jsx_runtime_1.jsxs)("p", { children: [(0, i18n_1.__)('Insert personalization tags to dynamically fill in information and personalize your emails.', 'fincommerce'), ' ', (0, jsx_runtime_1.jsx)(components_1.ExternalLink, { href: "https://kb.mailpoet.com/article/435-a-guide-to-personalisation-tags-for-tailored-newsletters#list", onClick: () => (0, events_1.recordEvent)('personalization_tags_modal_learn_more_link_clicked', { openedBy }), children: (0, i18n_1.__)('Learn more', 'fincommerce') })] }), (0, jsx_runtime_1.jsx)(components_1.SearchControl, { onChange: (theSearchQuery) => {
                    setSearchQuery(theSearchQuery);
                    (0, events_1.recordEventOnce)('personalization_tags_modal_search_control_input_updated', { openedBy });
                }, value: searchQuery }), (0, jsx_runtime_1.jsx)(category_menu_1.CategoryMenu, { groupedTags: groupedTags, activeCategory: activeCategory, onCategorySelect: (category) => {
                    setActiveCategory(category);
                    (0, events_1.recordEvent)('personalization_tags_modal_category_menu_clicked', {
                        category,
                        openedBy,
                    });
                } }), (0, jsx_runtime_1.jsx)(category_section_1.CategorySection, { groupedTags: groupedTags, activeCategory: activeCategory, onInsert: (insertedTag) => {
                    onInsert(insertedTag);
                    (0, events_1.recordEvent)('personalization_tags_modal_tag_insert_button_clicked', {
                        insertedTag,
                        activeCategory,
                        openedBy,
                    });
                }, closeCallback: closeCallback, canInsertLink: canInsertLink, openLinkModal: (tag) => {
                    setSelectedTag(tag);
                    setIsLinkModalOpened(true);
                } })] }));
};
exports.PersonalizationTagsModal = PersonalizationTagsModal;
