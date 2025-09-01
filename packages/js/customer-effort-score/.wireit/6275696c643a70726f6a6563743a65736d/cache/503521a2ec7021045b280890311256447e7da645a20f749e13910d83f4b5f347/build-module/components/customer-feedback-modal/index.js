/**
 * External dependencies
 */
import { createElement, useState } from '@wordpress/element';
import { Button, Modal, RadioControl, TextareaControl, } from '@wordpress/components';
import { Text } from '@fincommerce/experimental';
import { __ } from '@wordpress/i18n';
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
export function CustomerFeedbackModal({ recordScoreCallback, title = __('Please share your feedback', 'fincommerce'), description, showDescription = true, firstQuestion, secondQuestion, defaultScore = NaN, onCloseModal, customOptions, shouldShowComments = (firstQuestionScore, secondQuestionScore) => [firstQuestionScore, secondQuestionScore].some((score) => score === 1 || score === 2), getExtraFieldsToBeShown, validateExtraFields, }) {
    const options = customOptions && customOptions.length > 0
        ? customOptions
        : [
            {
                label: __('Strongly disagree', 'fincommerce'),
                value: '1',
            },
            {
                label: __('Disagree', 'fincommerce'),
                value: '2',
            },
            {
                label: __('Neutral', 'fincommerce'),
                value: '3',
            },
            {
                label: __('Agree', 'fincommerce'),
                value: '4',
            },
            {
                label: __('Strongly Agree', 'fincommerce'),
                value: '5',
            },
        ];
    const [firstQuestionScore, setFirstQuestionScore] = useState(defaultScore || NaN);
    const [secondQuestionScore, setSecondQuestionScore] = useState(defaultScore || NaN);
    const [comments, setComments] = useState('');
    const [showNoScoreMessage, setShowNoScoreMessage] = useState(false);
    const [isOpen, setOpen] = useState(true);
    const [extraFieldsValues, setExtraFieldsValues] = useState({});
    const [errors, setErrors] = useState({});
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
    return (createElement(Modal, { className: "fincommerce-customer-effort-score", title: title, onRequestClose: closeModal, shouldCloseOnClickOutside: false },
        showDescription && (createElement(Text, { variant: "body", as: "p", className: "fincommerce-customer-effort-score__intro", size: 14, lineHeight: "20px", marginBottom: "1.5em" }, description ||
            __('Your feedback will help create a better experience for thousands of merchants like you. Please tell us to what extent you agree or disagree with the statements below.', 'fincommerce'))),
        createElement(Text, { variant: "subtitle.small", as: "p", weight: "600", size: "14", lineHeight: "20px" }, firstQuestion),
        createElement("div", { className: "fincommerce-customer-effort-score__selection" },
            createElement(RadioControl, { selected: firstQuestionScore.toString(10), options: options, onChange: (value) => onRadioControlChange(value, setFirstQuestionScore), className: "fincommerce-customer-effort-score__radio-control" })),
        secondQuestion && (createElement(Text, { variant: "subtitle.small", as: "p", weight: "600", size: "14", lineHeight: "20px" }, secondQuestion)),
        secondQuestion && (createElement("div", { className: "fincommerce-customer-effort-score__selection" },
            createElement(RadioControl, { selected: secondQuestionScore.toString(10), options: options, onChange: (value) => onRadioControlChange(value, setSecondQuestionScore), className: "fincommerce-customer-effort-score__radio-control" }))),
        typeof shouldShowComments === 'function' &&
            shouldShowComments(firstQuestionScore, secondQuestionScore) && (createElement("div", { className: "fincommerce-customer-effort-score__comments" },
            createElement(TextareaControl, { __nextHasNoMarginBottom: true, label: __('How is that screen useful to you? What features would you add or change?', 'fincommerce'), help: __('Your feedback will go to the FinCommerce development team', 'fincommerce'), value: comments, placeholder: __('Optional, but much apprecated. We love reading your feedback!', 'fincommerce'), onChange: (value) => setComments(value), rows: 5 }))),
        showNoScoreMessage && (createElement("div", { className: "fincommerce-customer-effort-score__errors", role: "alert" },
            createElement(Text, { variant: "body", as: "p" }, __('Please tell us to what extent you agree or disagree with the statements above.', 'fincommerce')))),
        typeof getExtraFieldsToBeShown === 'function' &&
            getExtraFieldsToBeShown(extraFieldsValues, setExtraFieldsValues, errors),
        createElement("div", { className: "fincommerce-customer-effort-score__buttons" },
            createElement(Button, { isTertiary: true, onClick: closeModal, name: "cancel" }, __('Cancel', 'fincommerce')),
            createElement(Button, { isPrimary: true, onClick: sendScore, name: "send" }, __('Share', 'fincommerce')))));
}
