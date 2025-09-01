"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectTemplateModal = SelectTemplateModal;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const editor_1 = require("@wordpress/editor");
const data_1 = require("@wordpress/data");
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const hooks_1 = require("../../hooks");
const store_1 = require("../../store");
const template_list_1 = require("./template-list");
const template_categories_list_sidebar_1 = require("./template-categories-list-sidebar");
const events_1 = require("../../events");
const TemplateCategories = [
    {
        name: 'recent',
        label: 'Recent',
    },
    {
        name: 'basic',
        label: 'Basic',
    },
];
function SelectTemplateBody({ hasEmailPosts, templates, handleTemplateSelection, templateSelectMode, }) {
    const [selectedCategory, setSelectedCategory] = (0, element_1.useState)(TemplateCategories[1].name // Show the “Basic” category by default
    );
    const hideRecentCategory = templateSelectMode === 'swap';
    const displayCategories = TemplateCategories.filter(({ name }) => name !== 'recent' || !hideRecentCategory);
    const handleCategorySelection = (category) => {
        (0, events_1.recordEvent)('template_select_modal_category_change', { category });
        setSelectedCategory(category);
    };
    (0, element_1.useEffect)(() => {
        setTimeout(() => {
            if (hasEmailPosts && !hideRecentCategory) {
                setSelectedCategory(TemplateCategories[0].name);
            }
        }, 1000); // using setTimeout to ensure the template styles are available before block preview
    }, [hasEmailPosts, hideRecentCategory]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "block-editor-block-patterns-explorer", children: [(0, jsx_runtime_1.jsx)(template_categories_list_sidebar_1.TemplateCategoriesListSidebar, { templateCategories: displayCategories, selectedCategory: selectedCategory, onClickCategory: handleCategorySelection }), (0, jsx_runtime_1.jsx)(template_list_1.TemplateList, { templates: templates, onTemplateSelection: handleTemplateSelection, selectedCategory: selectedCategory })] }));
}
const MemorizedSelectTemplateBody = (0, element_1.memo)(SelectTemplateBody);
function SelectTemplateModal({ onSelectCallback, closeCallback = null, previewContent = '', postType, }) {
    const templateSelectMode = previewContent ? 'swap' : 'new';
    (0, events_1.recordEventOnce)('template_select_modal_opened', { templateSelectMode });
    const [templates, emailPosts, hasEmailPosts] = (0, hooks_1.usePreviewTemplates)(previewContent);
    const hasTemplates = templates?.length > 0;
    const handleTemplateSelection = (template) => {
        const templateIsPostContent = template.type === postType;
        const postContent = template.template;
        (0, events_1.recordEvent)('template_select_modal_template_selected', {
            templateSlug: template.slug,
            templateSelectMode,
            templateType: template.type,
        });
        // When we provide previewContent, we don't want to reset the blocks
        if (!previewContent) {
            void (0, data_1.dispatch)(editor_1.store).resetEditorBlocks(template.emailParsed);
        }
        void (0, data_1.dispatch)(store_1.storeName).setTemplateToPost(templateIsPostContent ? postContent.template : template.slug);
        onSelectCallback();
    };
    const handleCloseWithoutSelection = () => {
        const template = templates[0] ?? null;
        if (!template) {
            return;
        } // Prevent closing when templates are not loaded
        (0, events_1.recordEvent)('template_select_modal_handle_close_without_template_selected');
        handleTemplateSelection(template);
    };
    return ((0, jsx_runtime_1.jsxs)(components_1.Modal, { title: templateSelectMode === 'new'
            ? (0, i18n_1.__)('Start with an email preset', 'fincommerce')
            : (0, i18n_1.__)('Select a template', 'fincommerce'), onRequestClose: () => {
            (0, events_1.recordEvent)('template_select_modal_closed', {
                templateSelectMode,
            });
            return closeCallback
                ? closeCallback()
                : handleCloseWithoutSelection();
        }, isFullScreen: true, children: [(0, jsx_runtime_1.jsx)(MemorizedSelectTemplateBody, { hasEmailPosts: hasEmailPosts, templates: [...templates, ...emailPosts], handleTemplateSelection: handleTemplateSelection, templateSelectMode: templateSelectMode }), (0, jsx_runtime_1.jsx)(components_1.Flex, { className: "email-editor-modal-footer", justify: "flex-end", children: (0, jsx_runtime_1.jsx)(components_1.FlexItem, { children: (0, jsx_runtime_1.jsx)(components_1.Button, { variant: "tertiary", className: "email-editor-start_from_scratch_button", onClick: () => {
                            (0, events_1.recordEvent)('template_select_modal_start_from_scratch_clicked');
                            return handleCloseWithoutSelection();
                        }, isBusy: !hasTemplates, children: (0, i18n_1.__)('Start from scratch', 'fincommerce') }) }) })] }));
}
