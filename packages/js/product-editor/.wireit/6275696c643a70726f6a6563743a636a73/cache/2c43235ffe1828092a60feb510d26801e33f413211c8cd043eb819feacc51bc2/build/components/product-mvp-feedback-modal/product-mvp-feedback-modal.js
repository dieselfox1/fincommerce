"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMVPFeedbackModal = ProductMVPFeedbackModal;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const customer_effort_score_1 = require("@fincommerce/customer-effort-score");
const experimental_1 = require("@fincommerce/experimental");
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
/**
 * Provides a modal requesting customer feedback.
 *
 * @param {Object}   props                     Component props.
 * @param {Function} props.recordScoreCallback Function to call when the results are sent.
 * @param {Function} props.onCloseModal        Function to call when user closes the modal by clicking the X.
 * @param {Function} props.onSkipFeedback      Function to call when user skips sending feedback.
 */
function ProductMVPFeedbackModal({ recordScoreCallback, onCloseModal, onSkipFeedback, }) {
    const [missingFeatures, setMissingFeatures] = (0, element_1.useState)(false);
    const [missingPlugins, setMissingPlugins] = (0, element_1.useState)(false);
    const [difficultToUse, setDifficultToUse] = (0, element_1.useState)(false);
    const [slowBuggyOrBroken, setSlowBuggyOrBroken] = (0, element_1.useState)(false);
    const [other, setOther] = (0, element_1.useState)(false);
    const checkboxes = [
        {
            key: 'missing-features',
            label: (0, i18n_1.__)('Missing features', 'fincommerce'),
            checked: missingFeatures,
            onChange: setMissingFeatures,
        },
        {
            key: 'missing-plugins',
            label: (0, i18n_1.__)('Missing plugins', 'fincommerce'),
            checked: missingPlugins,
            onChange: setMissingPlugins,
        },
        {
            key: 'difficult-to-use',
            label: (0, i18n_1.__)("It's difficult to use", 'fincommerce'),
            checked: difficultToUse,
            onChange: setDifficultToUse,
        },
        {
            key: 'slow-buggy-or-broken',
            label: (0, i18n_1.__)("It's slow, buggy, or broken", 'fincommerce'),
            checked: slowBuggyOrBroken,
            onChange: setSlowBuggyOrBroken,
        },
        {
            key: 'other',
            label: (0, i18n_1.__)('Other (describe below)', 'fincommerce'),
            checked: other,
            onChange: setOther,
        },
    ];
    const [comments, setComments] = (0, element_1.useState)('');
    const [email, setEmail] = (0, element_1.useState)('');
    const checked = checkboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.key);
    const { createSuccessNotice } = (0, data_1.useDispatch)('core/notices');
    const onSendFeedback = () => {
        recordScoreCallback(checked, comments, email);
        createSuccessNotice((0, i18n_1.__)("Thanks for the feedback — we'll put it to good use!", 'fincommerce'));
    };
    const optionalElement = ((0, element_1.createElement)("span", { className: "fincommerce-product-mvp-feedback-modal__optional" }, (0, i18n_1.__)('(optional)', 'fincommerce')));
    return ((0, element_1.createElement)(customer_effort_score_1.FeedbackModal, { title: (0, i18n_1.__)('Thanks for trying out the new product editor!', 'fincommerce'), onSubmit: onSendFeedback, onCancel: onSkipFeedback, onModalClose: onCloseModal, isSubmitButtonDisabled: !checked.length, submitButtonLabel: (0, i18n_1.__)('Send', 'fincommerce'), cancelButtonLabel: (0, i18n_1.__)('Skip', 'fincommerce'), className: "fincommerce-product-mvp-feedback-modal" },
        (0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(experimental_1.Text, { variant: "subtitle.small", as: "p", weight: "600", size: "14", lineHeight: "20px" }),
            (0, element_1.createElement)("fieldset", { className: "fincommerce-product-mvp-feedback-modal__reason" },
                (0, element_1.createElement)("legend", null, (0, i18n_1.__)('What made you turn off the new product editor?', 'fincommerce')),
                (0, element_1.createElement)("div", { className: "fincommerce-product-mvp-feedback-modal__checkboxes" }, checkboxes.map((checkbox, index) => ((0, element_1.createElement)(components_1.CheckboxControl, { key: index, label: checkbox.label, name: checkbox.key, checked: checkbox.checked, onChange: checkbox.onChange }))))),
            (0, element_1.createElement)("div", { className: "fincommerce-product-mvp-feedback-modal__comments" },
                (0, element_1.createElement)(components_1.TextareaControl, { label: (0, element_1.createInterpolateElement)((0, i18n_1.__)('Additional thoughts <optional/>', 'fincommerce'), {
                        optional: optionalElement,
                    }), value: comments, onChange: (value) => setComments(value), rows: 5 })),
            (0, element_1.createElement)("div", { className: "fincommerce-product-mvp-feedback-modal__email" },
                (0, element_1.createElement)(components_1.TextControl, { label: (0, element_1.createInterpolateElement)((0, i18n_1.__)('Your email address <optional/>', 'fincommerce'), {
                        optional: optionalElement,
                    }), value: email, onChange: (value) => setEmail(value), help: (0, i18n_1.__)('In case you want to participate in further discussion and future user research.', 'fincommerce') })))));
}
