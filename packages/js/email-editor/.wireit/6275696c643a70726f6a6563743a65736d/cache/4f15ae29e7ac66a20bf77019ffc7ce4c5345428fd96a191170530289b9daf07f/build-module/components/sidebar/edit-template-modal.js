import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Flex, FlexItem, Modal } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
/**
 * Internal dependencies
 */
import { storeName } from '../../store';
import { recordEvent, recordEventOnce } from '../../events';
export function EditTemplateModal({ close }) {
    recordEventOnce('edit_template_modal_opened');
    const { onNavigateToEntityRecord, template } = useSelect((sel) => {
        const { getEditorSettings } = sel(editorStore);
        const editorSettings = getEditorSettings();
        return {
            onNavigateToEntityRecord: 
            // @ts-expect-error onNavigateToEntityRecord type is not defined
            editorSettings.onNavigateToEntityRecord,
            template: sel(storeName).getCurrentTemplate(),
        };
    }, []);
    return (_jsxs(Modal, { size: "medium", onRequestClose: close, __experimentalHideHeader: true, children: [_jsx("p", { children: __('This template is used by multiple emails. Any changes made would affect other emails on the site. Are you sure you want to edit the template?', 'fincommerce') }), _jsxs(Flex, { justify: 'end', children: [_jsx(FlexItem, { children: _jsx(Button, { variant: "tertiary", onClick: () => {
                                recordEvent('edit_template_modal_cancel_button_clicked');
                                close();
                            }, children: __('Cancel', 'fincommerce') }) }), _jsx(FlexItem, { children: _jsx(Button, { variant: "primary", onClick: () => {
                                recordEvent('edit_template_modal_continue_button_clicked', { templateId: template.id });
                                onNavigateToEntityRecord({
                                    postId: template.id,
                                    postType: 'wp_template',
                                });
                            }, disabled: !template.id, children: __('Edit template', 'fincommerce') }) })] })] }));
}
