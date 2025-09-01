/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';
import { createElement, useState } from '@wordpress/element';
export const InboxDismissConfirmationModal = ({ onClose, onDismiss, buttonLabel = __("Yes, I'm sure", 'fincommerce'), }) => {
    const [inAction, setInAction] = useState(false);
    return (createElement(Modal, { title: __('Are you sure?', 'fincommerce'), onRequestClose: () => onClose(), className: "fincommerce-inbox-dismiss-confirmation_modal" },
        createElement("div", { className: "fincommerce-inbox-dismiss-confirmation_wrapper" },
            createElement("p", null, __('Dismissed messages cannot be viewed again', 'fincommerce')),
            createElement("div", { className: "fincommerce-inbox-dismiss-confirmation_buttons" },
                createElement(Button, { isSecondary: true, onClick: () => onClose() }, __('Cancel', 'fincommerce')),
                createElement(Button, { isSecondary: true, isBusy: inAction, disabled: inAction, onClick: () => {
                        setInAction(true);
                        onDismiss();
                    } }, buttonLabel)))));
};
