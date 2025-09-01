"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveConfirmationModal = RemoveConfirmationModal;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
function RemoveConfirmationModal({ title, description, onCancel, onRemove, }) {
    const [isRemoving, setIsRemoving] = (0, element_1.useState)(false);
    async function handleRemoveClick() {
        try {
            setIsRemoving(true);
            await onRemove();
        }
        finally {
            setIsRemoving(false);
        }
    }
    return ((0, element_1.createElement)(components_1.Modal, { title: title, onRequestClose: (event) => {
            if (event && !event.isPropagationStopped() && onCancel) {
                onCancel();
            }
        }, className: "fincommerce-remove-confirmation-modal" },
        (0, element_1.createElement)("div", { className: "fincommerce-remove-confirmation-modal__content" }, description),
        (0, element_1.createElement)("div", { className: "fincommerce-remove-confirmation-modal__buttons" },
            (0, element_1.createElement)(components_1.Button, { isDestructive: true, variant: "primary", isBusy: isRemoving, onClick: handleRemoveClick }, (0, i18n_1.__)('Delete', 'fincommerce')),
            (0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: onCancel }, (0, i18n_1.__)('Cancel', 'fincommerce')))));
}
