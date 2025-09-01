export type CustomerFeedbackModalProps = {
    recordScoreCallback: (score: number, secondScore: number, comments: string, extraFieldsValues: {
        [key: string]: string;
    }) => void;
    title?: string;
    description?: string;
    showDescription?: boolean;
    firstQuestion: string;
    secondQuestion?: string;
    defaultScore?: number;
    onCloseModal?: () => void;
    customOptions?: {
        label: string;
        value: string;
    }[];
    shouldShowComments?: (firstQuestionScore: number, secondQuestionScore: number) => boolean;
    getExtraFieldsToBeShown?: (extraFieldsValues: {
        [key: string]: string;
    }, setExtraFieldsValues: (values: {
        [key: string]: string;
    }) => void, errors: Record<string, string> | undefined) => JSX.Element;
    validateExtraFields?: (values: {
        [key: string]: string;
    }) => {
        [key: string]: string;
    };
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
 * @param {Object}   props                         Component props.
 * @param {Function} props.recordScoreCallback     Function to call when the results are sent.
 * @param {string}   props.title                   Title displayed in the modal.
 * @param {string}   props.description             Description displayed in the modal.
 * @param {boolean}  props.showDescription         Show description in the modal.
 * @param {string}   props.firstQuestion           The first survey question.
 * @param {string}   [props.secondQuestion]        An optional second survey question.
 * @param {string}   props.defaultScore            Default score.
 * @param {Function} props.onCloseModal            Callback for when user closes modal by clicking cancel.
 * @param {Function} props.customOptions           List of custom score options, contains label and value.
 * @param {Function} props.shouldShowComments      A function to determine whether or not the comments field shown be shown.
 * @param {Function} props.getExtraFieldsToBeShown Function that returns the extra fields to be shown.
 * @param {Function} props.validateExtraFields     Function that validates the extra fields.
 */
export declare function CustomerFeedbackModal({ recordScoreCallback, title, description, showDescription, firstQuestion, secondQuestion, defaultScore, onCloseModal, customOptions, shouldShowComments, getExtraFieldsToBeShown, validateExtraFields, }: CustomerFeedbackModalProps): JSX.Element | null;
//# sourceMappingURL=index.d.ts.map