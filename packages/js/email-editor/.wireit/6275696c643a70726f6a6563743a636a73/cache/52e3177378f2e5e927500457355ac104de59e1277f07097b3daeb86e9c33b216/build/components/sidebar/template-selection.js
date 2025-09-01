"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateSelection = TemplateSelection;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const store_1 = require("../../store");
const edit_template_modal_1 = require("./edit-template-modal");
const template_select_1 = require("../template-select");
const events_1 = require("../../events");
const hooks_1 = require("../../hooks");
function TemplateSelection() {
    const { template, currentEmailContent, canUpdateTemplates, postType } = (0, data_1.useSelect)((select) => {
        return {
            template: select(store_1.storeName).getCurrentTemplate(),
            currentEmailContent: select(store_1.storeName).getEditedEmailContent(),
            canUpdateTemplates: select(store_1.storeName).canUserEditTemplates(),
            postType: select(store_1.storeName).getEmailPostType(),
        };
    }, []);
    const [templates] = (0, hooks_1.usePreviewTemplates)('swap');
    const [isEditTemplateModalOpen, setEditTemplateModalOpen] = (0, element_1.useState)(false);
    const [isSelectTemplateModalOpen, setSelectTemplateModalOpen] = (0, element_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [template && ((0, jsx_runtime_1.jsx)(components_1.PanelRow, { children: (0, jsx_runtime_1.jsxs)(components_1.Flex, { justify: 'start', children: [(0, jsx_runtime_1.jsx)(components_1.FlexItem, { className: "editor-post-panel__row-label", children: (0, i18n_1.__)('Template', 'fincommerce') }), (0, jsx_runtime_1.jsxs)(components_1.FlexItem, { children: [!(templates?.length > 1 || canUpdateTemplates) && (0, jsx_runtime_1.jsx)("b", { children: template?.title }), (templates?.length > 1 ||
                                    canUpdateTemplates) && ((0, jsx_runtime_1.jsx)(components_1.DropdownMenu, { icon: null, text: template?.title, toggleProps: {
                                        variant: 'tertiary',
                                    }, label: (0, i18n_1.__)('Template actions', 'fincommerce'), onToggle: (isOpen) => (0, events_1.recordEvent)('sidebar_template_actions_clicked', {
                                        currentTemplate: template?.title,
                                        isOpen,
                                    }), children: ({ onClose }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [canUpdateTemplates && ((0, jsx_runtime_1.jsx)(components_1.MenuItem, { onClick: () => {
                                                    (0, events_1.recordEvent)('sidebar_template_actions_edit_template_clicked');
                                                    setEditTemplateModalOpen(true);
                                                    onClose();
                                                }, children: (0, i18n_1.__)('Edit template', 'fincommerce') })), templates?.length > 1 && ((0, jsx_runtime_1.jsx)(components_1.MenuItem, { onClick: () => {
                                                    (0, events_1.recordEvent)('sidebar_template_actions_swap_template_clicked');
                                                    setSelectTemplateModalOpen(true);
                                                    onClose();
                                                }, children: (0, i18n_1.__)('Swap template', 'fincommerce') }))] })) }))] })] }) })), isEditTemplateModalOpen && ((0, jsx_runtime_1.jsx)(edit_template_modal_1.EditTemplateModal, { close: () => {
                    (0, events_1.recordEvent)('edit_template_modal_closed');
                    return setEditTemplateModalOpen(false);
                } })), isSelectTemplateModalOpen && ((0, jsx_runtime_1.jsx)(template_select_1.SelectTemplateModal, { onSelectCallback: () => setSelectTemplateModalOpen(false), closeCallback: () => setSelectTemplateModalOpen(false), previewContent: currentEmailContent, postType: postType }))] }));
}
