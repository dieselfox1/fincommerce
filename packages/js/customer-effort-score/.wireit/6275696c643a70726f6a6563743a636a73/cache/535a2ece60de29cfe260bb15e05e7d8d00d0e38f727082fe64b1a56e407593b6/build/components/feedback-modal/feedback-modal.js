"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackModal = FeedbackModal;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const experimental_1 = require("@fincommerce/experimental");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Provides a modal requesting customer feedback.
 *
 * Answers and comments are sent to a callback function.
 *
 * @param {Object}   props                        Component props.
 * @param {Function} props.onSubmit               Function to call when the results are sent.
 * @param {string}   props.title                  Title displayed in the modal.
 * @param {string}   props.description            Description displayed in the modal.
 * @param {string}   props.isSubmitButtonDisabled Boolean to enable/disable the send button.
 * @param {string}   props.submitButtonLabel      Label for the send button.
 * @param {string}   props.cancelButtonLabel      Label for the cancel button.
 * @param {Function} props.onModalClose           Function to call when user closes modal by clicking X.
 * @param {Function} props.onCancel               Function to call when user presses cancel.
 * @param {Function} props.children               Children to be rendered.
 * @param {string}   props.className              Class name to add to the modal.
 */
function FeedbackModal({ onSubmit, title, description, onModalClose, onCancel, children, isSubmitButtonDisabled, submitButtonLabel, cancelButtonLabel, className, }) {
    const [isOpen, setOpen] = (0, element_1.useState)(true);
    const closeModal = () => {
        setOpen(false);
        if (onModalClose) {
            onModalClose();
        }
    };
    if (!isOpen) {
        return null;
    }
    return ((0, element_1.createElement)(components_1.Modal, { className: (0, clsx_1.default)('fincommerce-feedback-modal', className), title: title, onRequestClose: closeModal, shouldCloseOnClickOutside: false },
        description && ((0, element_1.createElement)(experimental_1.Text, { variant: "body", as: "p", className: "fincommerce-feedback-modal__description", size: 14, lineHeight: "20px", marginBottom: "1.5em" }, description)),
        children,
        (0, element_1.createElement)("div", { className: "fincommerce-feedback-modal__buttons" },
            (0, element_1.createElement)(components_1.Button, { isTertiary: true, onClick: onCancel, name: "cancel" }, cancelButtonLabel),
            (0, element_1.createElement)(components_1.Button, { isPrimary: !isSubmitButtonDisabled, isSecondary: isSubmitButtonDisabled, onClick: () => {
                    onSubmit();
                    setOpen(false);
                }, name: "send", disabled: isSubmitButtonDisabled }, submitButtonLabel))));
}
