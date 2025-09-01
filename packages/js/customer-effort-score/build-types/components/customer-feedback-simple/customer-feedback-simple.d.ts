export type CustomerFeedbackSimpleProps = {
    onSelect: (score: number) => void;
    label: string;
    selectedValue?: number | null;
};
/**
 * Provides a modal requesting customer feedback.
 *
 * A label is displayed in the modal asking the customer to score the
 * difficulty completing a task. A group of radio buttons, styled with
 * emoji facial expressions, are used to provide a score between 1 and 5.
 *
 * A low score triggers a comments field to appear.
 *
 * Upon completion, the score and comments is sent to a callback function.
 *
 * @param {Object}      props                 Component props.
 * @param {Function}    props.onSelect        Function to call when the results are sent.
 * @param {string}      props.label           Question to ask the customer.
 * @param {number|null} [props.selectedValue] The default selected value.
 */
export declare function CustomerFeedbackSimple({ onSelect, label, selectedValue, }: CustomerFeedbackSimpleProps): JSX.Element;
//# sourceMappingURL=customer-feedback-simple.d.ts.map