import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { external } from '@wordpress/icons';
// eslint-disable-next-line @fincommerce/dependency-group
import { 
// @ts-expect-error Type for PluginPreviewMenuItem is missing in @types/wordpress__editor
PluginPreviewMenuItem, } from '@wordpress/editor';
/**
 * Internal dependencies
 */
import { storeName } from '../../store/constants';
import { SendPreviewEmail } from './send-preview-email';
import { recordEvent } from '../../events';
export function SendPreview() {
    const { togglePreviewModal } = useDispatch(storeName);
    return (_jsxs(_Fragment, { children: [_jsx(PluginPreviewMenuItem, { icon: external, onClick: () => {
                    recordEvent('header_preview_dropdown_send_test_email_selected');
                    togglePreviewModal(true);
                }, children: __('Send a test email', 'fincommerce') }), _jsx(SendPreviewEmail, {})] }));
}
