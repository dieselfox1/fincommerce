"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEffortScore = CustomerEffortScore;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const customer_feedback_modal_1 = require("../customer-feedback-modal");
const noop = () => { };
/**
 * Use `CustomerEffortScore` to gather a customer effort score.
 *
 * NOTE: This should live in @fincommerce/customer-effort-score to allow
 * reuse.
 *
 * @param {Object}   props                           Component props.
 * @param {Function} props.recordScoreCallback       Function to call when the score should be recorded.
 * @param {string}   [props.title]                   The title displayed in the modal.
 * @param {string}   props.description               The description displayed in the modal.
 * @param {boolean}  props.showDescription           Show description in the modal.
 * @param {string}   props.noticeLabel               The notice label displayed in the notice.
 * @param {string}   props.firstQuestion             The first survey question.
 * @param {string}   [props.secondQuestion]          The second survey question.
 * @param {Function} props.onNoticeShownCallback     Function to call when the notice is shown.
 * @param {Function} props.onNoticeDismissedCallback Function to call when the notice is dismissed.
 * @param {Function} props.onModalShownCallback      Function to call when the modal is shown.
 * @param {Function} props.onModalDismissedCallback  Function to call when modal is dismissed.
 * @param {Function} props.shouldShowComments        Callback to determine if comments section should be shown.
 * @param {Object}   props.icon                      Icon (React component) to be shown on the notice.
 * @param {Function} props.getExtraFieldsToBeShown   Function that returns the extra fields to be shown.
 * @param {Function} props.validateExtraFields       Function that validates the extra fields.
 */
function CustomerEffortScore({ recordScoreCallback, title, description, showDescription = true, noticeLabel, firstQuestion, secondQuestion, onNoticeShownCallback = noop, onNoticeDismissedCallback = noop, onModalShownCallback = noop, onModalDismissedCallback = noop, icon, shouldShowComments = (firstQuestionScore, secondQuestionScore) => [firstQuestionScore, secondQuestionScore].some((score) => score === 1 || score === 2), getExtraFieldsToBeShown, validateExtraFields, }) {
    const [shouldCreateNotice, setShouldCreateNotice] = (0, element_1.useState)(true);
    const [visible, setVisible] = (0, element_1.useState)(false);
    const { createNotice } = (0, data_1.useDispatch)('core/notices2');
    (0, element_1.useEffect)(() => {
        if (!shouldCreateNotice) {
            return;
        }
        createNotice('success', noticeLabel || title, {
            actions: [
                {
                    label: (0, i18n_1.__)('Give feedback', 'fincommerce'),
                    onClick: () => {
                        setVisible(true);
                        onModalShownCallback();
                    },
                },
            ],
            icon,
            explicitDismiss: true,
            onDismiss: onNoticeDismissedCallback,
        });
        setShouldCreateNotice(false);
        onNoticeShownCallback();
    }, [shouldCreateNotice]);
    if (shouldCreateNotice) {
        return null;
    }
    if (!visible) {
        return null;
    }
    return ((0, element_1.createElement)(customer_feedback_modal_1.CustomerFeedbackModal, { title: title, description: description, showDescription: showDescription, firstQuestion: firstQuestion, secondQuestion: secondQuestion, recordScoreCallback: recordScoreCallback, onCloseModal: onModalDismissedCallback, shouldShowComments: shouldShowComments, getExtraFieldsToBeShown: getExtraFieldsToBeShown, validateExtraFields: validateExtraFields }));
}
