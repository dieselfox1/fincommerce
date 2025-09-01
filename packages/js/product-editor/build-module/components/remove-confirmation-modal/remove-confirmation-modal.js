/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createElement, useState } from '@wordpress/element';
import { Button, Modal } from '@wordpress/components';
export function RemoveConfirmationModal({ title, description, onCancel, onRemove, }) {
    const [isRemoving, setIsRemoving] = useState(false);
    async function handleRemoveClick() {
        try {
            setIsRemoving(true);
            await onRemove();
        }
        finally {
            setIsRemoving(false);
        }
    }
    return (createElement(Modal, { title: title, onRequestClose: (event) => {
            if (event && !event.isPropagationStopped() && onCancel) {
                onCancel();
            }
        }, className: "fincommerce-remove-confirmation-modal" },
        createElement("div", { className: "fincommerce-remove-confirmation-modal__content" }, description),
        createElement("div", { className: "fincommerce-remove-confirmation-modal__buttons" },
            createElement(Button, { isDestructive: true, variant: "primary", isBusy: isRemoving, onClick: handleRemoveClick }, __('Delete', 'fincommerce')),
            createElement(Button, { variant: "tertiary", onClick: onCancel }, __('Cancel', 'fincommerce')))));
}
