"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerFeedbackModal = CustomerFeedbackModal;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const experimental_1 = require("@fincommerce/experimental");
const i18n_1 = require("@wordpress/i18n");
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
function CustomerFeedbackModal({ recordScoreCallback, title = (0, i18n_1.__)('Please share your feedback', 'fincommerce'), description, showDescription = true, firstQuestion, secondQuestion, defaultScore = NaN, onCloseModal, customOptions, shouldShowComments = (firstQuestionScore, secondQuestionScore) => [firstQuestionScore, secondQuestionScore].some((score) => score === 1 || score === 2), getExtraFieldsToBeShown, validateExtraFields, }) {
    const options = customOptions && customOptions.length > 0
        ? customOptions
        : [
            {
                label: (0, i18n_1.__)('Strongly disagree', 'fincommerce'),
                value: '1',
            },
            {
                label: (0, i18n_1.__)('Disagree', 'fincommerce'),
                value: '2',
            },
            {
                label: (0, i18n_1.__)('Neutral', 'fincommerce'),
                value: '3',
            },
            {
                label: (0, i18n_1.__)('Agree', 'fincommerce'),
                value: '4',
            },
            {
                label: (0, i18n_1.__)('Strongly Agree', 'fincommerce'),
                value: '5',
            },
        ];
    const [firstQuestionScore, setFirstQuestionScore] = (0, element_1.useState)(defaultScore || NaN);
    const [secondQuestionScore, setSecondQuestionScore] = (0, element_1.useState)(defaultScore || NaN);
    const [comments, setComments] = (0, element_1.useState)('');
    const [showNoScoreMessage, setShowNoScoreMessage] = (0, element_1.useState)(false);
    const [isOpen, setOpen] = (0, element_1.useState)(true);
    const [extraFieldsValues, setExtraFieldsValues] = (0, element_1.useState)({});
    const [errors, setErrors] = (0, element_1.useState)({});
    const closeModal = () => {
        setOpen(false);
        if (onCloseModal) {
            onCloseModal();
        }
    };
    const onRadioControlChange = (value, setter) => {
        const valueAsInt = parseInt(value, 10);
        setter(valueAsInt);
        setShowNoScoreMessage(!Number.isInteger(valueAsInt));
    };
    const sendScore = () => {
        const missingFirstOrSecondQuestions = !Number.isInteger(firstQuestionScore) ||
            (secondQuestion && !Number.isInteger(secondQuestionScore));
        if (missingFirstOrSecondQuestions) {
            setShowNoScoreMessage(true);
        }
        const extraFieldsErrors = typeof validateExtraFields === 'function'
            ? validateExtraFields(extraFieldsValues)
            : {};
        const validExtraFields = Object.keys(extraFieldsErrors).length === 0;
        if (missingFirstOrSecondQuestions || !validExtraFields) {
            setErrors(extraFieldsErrors);
            return;
        }
        setOpen(false);
        recordScoreCallback(firstQuestionScore, secondQuestionScore, comments, extraFieldsValues);
    };
    if (!isOpen) {
        return null;
    }
    return ((0, element_1.createElement)(components_1.Modal, { className: "fincommerce-customer-effort-score", title: title, onRequestClose: closeModal, shouldCloseOnClickOutside: false },
        showDescription && ((0, element_1.createElement)(experimental_1.Text, { variant: "body", as: "p", className: "fincommerce-customer-effort-score__intro", size: 14, lineHeight: "20px", marginBottom: "1.5em" }, description ||
            (0, i18n_1.__)('Your feedback will help create a better experience for thousands of merchants like you. Please tell us to what extent you agree or disagree with the statements below.', 'fincommerce'))),
        (0, element_1.createElement)(experimental_1.Text, { variant: "subtitle.small", as: "p", weight: "600", size: "14", lineHeight: "20px" }, firstQuestion),
        (0, element_1.createElement)("div", { className: "fincommerce-customer-effort-score__selection" },
            (0, element_1.createElement)(components_1.RadioControl, { selected: firstQuestionScore.toString(10), options: options, onChange: (value) => onRadioControlChange(value, setFirstQuestionScore), className: "fincommerce-customer-effort-score__radio-control" })),
        secondQuestion && ((0, element_1.createElement)(experimental_1.Text, { variant: "subtitle.small", as: "p", weight: "600", size: "14", lineHeight: "20px" }, secondQuestion)),
        secondQuestion && ((0, element_1.createElement)("div", { className: "fincommerce-customer-effort-score__selection" },
            (0, element_1.createElement)(components_1.RadioControl, { selected: secondQuestionScore.toString(10), options: options, onChange: (value) => onRadioControlChange(value, setSecondQuestionScore), className: "fincommerce-customer-effort-score__radio-control" }))),
        typeof shouldShowComments === 'function' &&
            shouldShowComments(firstQuestionScore, secondQuestionScore) && ((0, element_1.createElement)("div", { className: "fincommerce-customer-effort-score__comments" },
            (0, element_1.createElement)(components_1.TextareaControl, { __nextHasNoMarginBottom: true, label: (0, i18n_1.__)('How is that screen useful to you? What features would you add or change?', 'fincommerce'), help: (0, i18n_1.__)('Your feedback will go to the FinCommerce development team', 'fincommerce'), value: comments, placeholder: (0, i18n_1.__)('Optional, but much apprecated. We love reading your feedback!', 'fincommerce'), onChange: (value) => setComments(value), rows: 5 }))),
        showNoScoreMessage && ((0, element_1.createElement)("div", { className: "fincommerce-customer-effort-score__errors", role: "alert" },
            (0, element_1.createElement)(experimental_1.Text, { variant: "body", as: "p" }, (0, i18n_1.__)('Please tell us to what extent you agree or disagree with the statements above.', 'fincommerce')))),
        typeof getExtraFieldsToBeShown === 'function' &&
            getExtraFieldsToBeShown(extraFieldsValues, setExtraFieldsValues, errors),
        (0, element_1.createElement)("div", { className: "fincommerce-customer-effort-score__buttons" },
            (0, element_1.createElement)(components_1.Button, { isTertiary: true, onClick: closeModal, name: "cancel" }, (0, i18n_1.__)('Cancel', 'fincommerce')),
            (0, element_1.createElement)(components_1.Button, { isPrimary: true, onClick: sendScore, name: "send" }, (0, i18n_1.__)('Share', 'fincommerce')))));
}
