import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { Button, Modal, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
const LinkModal = ({ onInsert, isOpened, closeCallback, tag }) => {
    const [linkText, setLinkText] = useState(__('Link', 'fincommerce'));
    if (!isOpened) {
        return null;
    }
    return (_jsxs(Modal, { size: "small", title: __('Insert Link', 'fincommerce'), onRequestClose: closeCallback, className: "fincommerce-personalization-tags-modal", children: [_jsx(TextControl, { label: __('Link Text', 'fincommerce'), value: linkText, onChange: setLinkText }), _jsx(Button, { isPrimary: true, onClick: () => {
                    if (onInsert) {
                        onInsert(tag.token, linkText);
                    }
                }, children: __('Insert', 'fincommerce') })] }));
};
export { LinkModal };
