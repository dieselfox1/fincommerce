/**
 * External dependencies
 */
import { createElement, createInterpolateElement, Fragment, useState, } from '@wordpress/element';
import { CheckboxControl, TextareaControl, TextControl, } from '@wordpress/components';
import { FeedbackModal } from '@fincommerce/customer-effort-score';
import { Text } from '@fincommerce/experimental';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
/**
 * Provides a modal requesting customer feedback.
 *
 * @param {Object}   props                     Component props.
 * @param {Function} props.recordScoreCallback Function to call when the results are sent.
 * @param {Function} props.onCloseModal        Function to call when user closes the modal by clicking the X.
 * @param {Function} props.onSkipFeedback      Function to call when user skips sending feedback.
 */
export function ProductMVPFeedbackModal({ recordScoreCallback, onCloseModal, onSkipFeedback, }) {
    const [missingFeatures, setMissingFeatures] = useState(false);
    const [missingPlugins, setMissingPlugins] = useState(false);
    const [difficultToUse, setDifficultToUse] = useState(false);
    const [slowBuggyOrBroken, setSlowBuggyOrBroken] = useState(false);
    const [other, setOther] = useState(false);
    const checkboxes = [
        {
            key: 'missing-features',
            label: __('Missing features', 'fincommerce'),
            checked: missingFeatures,
            onChange: setMissingFeatures,
        },
        {
            key: 'missing-plugins',
            label: __('Missing plugins', 'fincommerce'),
            checked: missingPlugins,
            onChange: setMissingPlugins,
        },
        {
            key: 'difficult-to-use',
            label: __("It's difficult to use", 'fincommerce'),
            checked: difficultToUse,
            onChange: setDifficultToUse,
        },
        {
            key: 'slow-buggy-or-broken',
            label: __("It's slow, buggy, or broken", 'fincommerce'),
            checked: slowBuggyOrBroken,
            onChange: setSlowBuggyOrBroken,
        },
        {
            key: 'other',
            label: __('Other (describe below)', 'fincommerce'),
            checked: other,
            onChange: setOther,
        },
    ];
    const [comments, setComments] = useState('');
    const [email, setEmail] = useState('');
    const checked = checkboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.key);
    const { createSuccessNotice } = useDispatch('core/notices');
    const onSendFeedback = () => {
        recordScoreCallback(checked, comments, email);
        createSuccessNotice(__("Thanks for the feedback — we'll put it to good use!", 'fincommerce'));
    };
    const optionalElement = (createElement("span", { className: "fincommerce-product-mvp-feedback-modal__optional" }, __('(optional)', 'fincommerce')));
    return (createElement(FeedbackModal, { title: __('Thanks for trying out the new product editor!', 'fincommerce'), onSubmit: onSendFeedback, onCancel: onSkipFeedback, onModalClose: onCloseModal, isSubmitButtonDisabled: !checked.length, submitButtonLabel: __('Send', 'fincommerce'), cancelButtonLabel: __('Skip', 'fincommerce'), className: "fincommerce-product-mvp-feedback-modal" },
        createElement(Fragment, null,
            createElement(Text, { variant: "subtitle.small", as: "p", weight: "600", size: "14", lineHeight: "20px" }),
            createElement("fieldset", { className: "fincommerce-product-mvp-feedback-modal__reason" },
                createElement("legend", null, __('What made you turn off the new product editor?', 'fincommerce')),
                createElement("div", { className: "fincommerce-product-mvp-feedback-modal__checkboxes" }, checkboxes.map((checkbox, index) => (createElement(CheckboxControl, { key: index, label: checkbox.label, name: checkbox.key, checked: checkbox.checked, onChange: checkbox.onChange }))))),
            createElement("div", { className: "fincommerce-product-mvp-feedback-modal__comments" },
                createElement(TextareaControl, { label: createInterpolateElement(__('Additional thoughts <optional/>', 'fincommerce'), {
                        optional: optionalElement,
                    }), value: comments, onChange: (value) => setComments(value), rows: 5 })),
            createElement("div", { className: "fincommerce-product-mvp-feedback-modal__email" },
                createElement(TextControl, { label: createInterpolateElement(__('Your email address <optional/>', 'fincommerce'), {
                        optional: optionalElement,
                    }), value: email, onChange: (value) => setEmail(value), help: __('In case you want to participate in further discussion and future user research.', 'fincommerce') })))));
}
