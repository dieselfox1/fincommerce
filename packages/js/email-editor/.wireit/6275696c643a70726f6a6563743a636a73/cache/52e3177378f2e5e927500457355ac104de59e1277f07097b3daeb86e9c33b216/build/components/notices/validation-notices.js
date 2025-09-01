"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationNotices = ValidationNotices;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const hooks_1 = require("../../hooks");
function ValidationNotices() {
    const { notices } = (0, hooks_1.useValidationNotices)();
    if (notices.length === 0) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(components_1.Notice, { status: "error", className: "fincommerce-email-editor-validation-errors components-editor-notices__pinned", isDismissible: false, children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("strong", { children: (0, i18n_1.__)('Fix errors to continue:', 'fincommerce') }), (0, jsx_runtime_1.jsx)("ul", { children: notices.map(({ id, content, actions }) => ((0, jsx_runtime_1.jsxs)("li", { children: [content, actions.length > 0
                                ? actions.map(({ label, onClick }) => ((0, jsx_runtime_1.jsx)(components_1.Button, { onClick: onClick, variant: "link", children: label }, label)))
                                : null] }, id))) })] }) }));
}
