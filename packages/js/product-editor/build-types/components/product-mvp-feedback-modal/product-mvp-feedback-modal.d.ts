export type ProductMVPFeedbackModalProps = {
    recordScoreCallback: (checked: string[], comments: string, email: string) => void;
    onCloseModal?: () => void;
    onSkipFeedback?: () => void;
};
/**
 * Provides a modal requesting customer feedback.
 *
 * @param {Object}   props                     Component props.
 * @param {Function} props.recordScoreCallback Function to call when the results are sent.
 * @param {Function} props.onCloseModal        Function to call when user closes the modal by clicking the X.
 * @param {Function} props.onSkipFeedback      Function to call when user skips sending feedback.
 */
export declare function ProductMVPFeedbackModal({ recordScoreCallback, onCloseModal, onSkipFeedback, }: ProductMVPFeedbackModalProps): JSX.Element;
//# sourceMappingURL=product-mvp-feedback-modal.d.ts.map