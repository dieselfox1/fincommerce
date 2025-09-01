"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxDismissConfirmationModal = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const InboxDismissConfirmationModal = ({ onClose, onDismiss, buttonLabel = (0, i18n_1.__)("Yes, I'm sure", 'fincommerce'), }) => {
    const [inAction, setInAction] = (0, element_1.useState)(false);
    return ((0, element_1.createElement)(components_1.Modal, { title: (0, i18n_1.__)('Are you sure?', 'fincommerce'), onRequestClose: () => onClose(), className: "fincommerce-inbox-dismiss-confirmation_modal" },
        (0, element_1.createElement)("div", { className: "fincommerce-inbox-dismiss-confirmation_wrapper" },
            (0, element_1.createElement)("p", null, (0, i18n_1.__)('Dismissed messages cannot be viewed again', 'fincommerce')),
            (0, element_1.createElement)("div", { className: "fincommerce-inbox-dismiss-confirmation_buttons" },
                (0, element_1.createElement)(components_1.Button, { isSecondary: true, onClick: () => onClose() }, (0, i18n_1.__)('Cancel', 'fincommerce')),
                (0, element_1.createElement)(components_1.Button, { isSecondary: true, isBusy: inAction, disabled: inAction, onClick: () => {
                        setInAction(true);
                        onDismiss();
                    } }, buttonLabel)))));
};
exports.InboxDismissConfirmationModal = InboxDismissConfirmationModal;
