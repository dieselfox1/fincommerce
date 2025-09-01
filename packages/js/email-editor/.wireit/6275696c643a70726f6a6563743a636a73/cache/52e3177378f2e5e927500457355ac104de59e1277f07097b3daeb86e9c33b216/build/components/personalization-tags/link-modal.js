"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const LinkModal = ({ onInsert, isOpened, closeCallback, tag }) => {
    const [linkText, setLinkText] = (0, element_1.useState)((0, i18n_1.__)('Link', 'fincommerce'));
    if (!isOpened) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(components_1.Modal, { size: "small", title: (0, i18n_1.__)('Insert Link', 'fincommerce'), onRequestClose: closeCallback, className: "fincommerce-personalization-tags-modal", children: [(0, jsx_runtime_1.jsx)(components_1.TextControl, { label: (0, i18n_1.__)('Link Text', 'fincommerce'), value: linkText, onChange: setLinkText }), (0, jsx_runtime_1.jsx)(components_1.Button, { isPrimary: true, onClick: () => {
                    if (onInsert) {
                        onInsert(tag.token, linkText);
                    }
                }, children: (0, i18n_1.__)('Insert', 'fincommerce') })] }));
};
exports.LinkModal = LinkModal;
