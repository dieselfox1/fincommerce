"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTemplateModal = EditTemplateModal;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const store_1 = require("../../store");
const events_1 = require("../../events");
function EditTemplateModal({ close }) {
    (0, events_1.recordEventOnce)('edit_template_modal_opened');
    const { onNavigateToEntityRecord, template } = (0, data_1.useSelect)((sel) => {
        const { getEditorSettings } = sel(editor_1.store);
        const editorSettings = getEditorSettings();
        return {
            onNavigateToEntityRecord: 
            // @ts-expect-error onNavigateToEntityRecord type is not defined
            editorSettings.onNavigateToEntityRecord,
            template: sel(store_1.storeName).getCurrentTemplate(),
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(components_1.Modal, { size: "medium", onRequestClose: close, __experimentalHideHeader: true, children: [(0, jsx_runtime_1.jsx)("p", { children: (0, i18n_1.__)('This template is used by multiple emails. Any changes made would affect other emails on the site. Are you sure you want to edit the template?', 'fincommerce') }), (0, jsx_runtime_1.jsxs)(components_1.Flex, { justify: 'end', children: [(0, jsx_runtime_1.jsx)(components_1.FlexItem, { children: (0, jsx_runtime_1.jsx)(components_1.Button, { variant: "tertiary", onClick: () => {
                                (0, events_1.recordEvent)('edit_template_modal_cancel_button_clicked');
                                close();
                            }, children: (0, i18n_1.__)('Cancel', 'fincommerce') }) }), (0, jsx_runtime_1.jsx)(components_1.FlexItem, { children: (0, jsx_runtime_1.jsx)(components_1.Button, { variant: "primary", onClick: () => {
                                (0, events_1.recordEvent)('edit_template_modal_continue_button_clicked', { templateId: template.id });
                                onNavigateToEntityRecord({
                                    postId: template.id,
                                    postType: 'wp_template',
                                });
                            }, disabled: !template.id, children: (0, i18n_1.__)('Edit template', 'fincommerce') }) })] })] }));
}
