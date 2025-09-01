export type FeedbackModalProps = {
    onSubmit: () => void;
    title: string;
    description?: string;
    onModalClose?: () => void;
    onCancel?: () => void;
    children?: JSX.Element;
    isSubmitButtonDisabled?: boolean;
    submitButtonLabel?: string;
    cancelButtonLabel?: string;
    className?: string;
};
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
export declare function FeedbackModal({ onSubmit, title, description, onModalClose, onCancel, children, isSubmitButtonDisabled, submitButtonLabel, cancelButtonLabel, className, }: FeedbackModalProps): JSX.Element | null;
//# sourceMappingURL=feedback-modal.d.ts.map