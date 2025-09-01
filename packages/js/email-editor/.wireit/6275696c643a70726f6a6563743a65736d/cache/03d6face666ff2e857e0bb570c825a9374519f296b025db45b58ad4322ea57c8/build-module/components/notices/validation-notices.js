import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Notice, Button } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { useValidationNotices } from '../../hooks';
export function ValidationNotices() {
    const { notices } = useValidationNotices();
    if (notices.length === 0) {
        return null;
    }
    return (_jsx(Notice, { status: "error", className: "fincommerce-email-editor-validation-errors components-editor-notices__pinned", isDismissible: false, children: _jsxs(_Fragment, { children: [_jsx("strong", { children: __('Fix errors to continue:', 'fincommerce') }), _jsx("ul", { children: notices.map(({ id, content, actions }) => (_jsxs("li", { children: [content, actions.length > 0
                                ? actions.map(({ label, onClick }) => (_jsx(Button, { onClick: onClick, variant: "link", children: label }, label)))
                                : null] }, id))) })] }) }));
}
