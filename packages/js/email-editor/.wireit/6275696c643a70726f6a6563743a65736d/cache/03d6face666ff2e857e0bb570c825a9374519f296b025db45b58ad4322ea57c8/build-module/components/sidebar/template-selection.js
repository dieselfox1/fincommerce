import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { PanelRow, Flex, FlexItem, DropdownMenu, MenuItem, } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { storeName } from '../../store';
import { EditTemplateModal } from './edit-template-modal';
import { SelectTemplateModal } from '../template-select';
import { recordEvent } from '../../events';
import { usePreviewTemplates } from '../../hooks';
export function TemplateSelection() {
    const { template, currentEmailContent, canUpdateTemplates, postType } = useSelect((select) => {
        return {
            template: select(storeName).getCurrentTemplate(),
            currentEmailContent: select(storeName).getEditedEmailContent(),
            canUpdateTemplates: select(storeName).canUserEditTemplates(),
            postType: select(storeName).getEmailPostType(),
        };
    }, []);
    const [templates] = usePreviewTemplates('swap');
    const [isEditTemplateModalOpen, setEditTemplateModalOpen] = useState(false);
    const [isSelectTemplateModalOpen, setSelectTemplateModalOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [template && (_jsx(PanelRow, { children: _jsxs(Flex, { justify: 'start', children: [_jsx(FlexItem, { className: "editor-post-panel__row-label", children: __('Template', 'fincommerce') }), _jsxs(FlexItem, { children: [!(templates?.length > 1 || canUpdateTemplates) && _jsx("b", { children: template?.title }), (templates?.length > 1 ||
                                    canUpdateTemplates) && (_jsx(DropdownMenu, { icon: null, text: template?.title, toggleProps: {
                                        variant: 'tertiary',
                                    }, label: __('Template actions', 'fincommerce'), onToggle: (isOpen) => recordEvent('sidebar_template_actions_clicked', {
                                        currentTemplate: template?.title,
                                        isOpen,
                                    }), children: ({ onClose }) => (_jsxs(_Fragment, { children: [canUpdateTemplates && (_jsx(MenuItem, { onClick: () => {
                                                    recordEvent('sidebar_template_actions_edit_template_clicked');
                                                    setEditTemplateModalOpen(true);
                                                    onClose();
                                                }, children: __('Edit template', 'fincommerce') })), templates?.length > 1 && (_jsx(MenuItem, { onClick: () => {
                                                    recordEvent('sidebar_template_actions_swap_template_clicked');
                                                    setSelectTemplateModalOpen(true);
                                                    onClose();
                                                }, children: __('Swap template', 'fincommerce') }))] })) }))] })] }) })), isEditTemplateModalOpen && (_jsx(EditTemplateModal, { close: () => {
                    recordEvent('edit_template_modal_closed');
                    return setEditTemplateModalOpen(false);
                } })), isSelectTemplateModalOpen && (_jsx(SelectTemplateModal, { onSelectCallback: () => setSelectTemplateModalOpen(false), closeCallback: () => setSelectTemplateModalOpen(false), previewContent: currentEmailContent, postType: postType }))] }));
}
