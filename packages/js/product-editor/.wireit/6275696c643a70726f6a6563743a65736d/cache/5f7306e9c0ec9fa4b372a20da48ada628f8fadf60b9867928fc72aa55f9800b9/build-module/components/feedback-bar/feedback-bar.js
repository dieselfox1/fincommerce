/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, TextControl, TextareaControl, } from '@wordpress/components';
import { createElement, createInterpolateElement, Fragment, } from '@wordpress/element';
import { closeSmall } from '@wordpress/icons';
import { Pill } from '@fincommerce/components';
import { useCustomerEffortScoreModal } from '@fincommerce/customer-effort-score';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { PRODUCT_EDITOR_FEEDBACK_CES_ACTION } from '../../constants';
import { useFeedbackBar } from '../../hooks/use-feedback-bar';
import { isValidEmail } from '../../utils';
export function FeedbackBar({ productType }) {
    const { hideFeedbackBar, shouldShowFeedbackBar } = useFeedbackBar();
    const { showCesModal, showProductMVPFeedbackModal } = useCustomerEffortScoreModal();
    const getProductTracksProps = () => {
        const tracksProps = {
            product_type: productType,
        };
        return tracksProps;
    };
    const onShareFeedbackClick = () => {
        recordEvent('product_editor_feedback_bar_share_feedback_click', {
            ...getProductTracksProps(),
        });
        showCesModal({
            action: PRODUCT_EDITOR_FEEDBACK_CES_ACTION,
            showDescription: false,
            title: __('What do you think of the new product editor?', 'fincommerce'),
            firstQuestion: __('The product editing screen is easy to use', 'fincommerce'),
            secondQuestion: __('Product editor is easy to use', 'fincommerce'),
            onsubmitLabel: __("Thanks for the feedback — we'll put it to good use!", 'fincommerce'),
            shouldShowComments: () => false,
            getExtraFieldsToBeShown: (values, setValues, errors) => (createElement(Fragment, null,
                createElement(BaseControl, { id: 'feedback_additional_thoughts', className: "fincommerce-product-feedback__additional-thoughts", label: createInterpolateElement(__('ADDITIONAL THOUGHTS <optional />', 'fincommerce'), {
                        optional: (createElement("span", { className: "fincommerce-product-feedback__optional-input" }, __('(OPTIONAL)', 'fincommerce'))),
                    }) },
                    createElement(TextareaControl, { value: values.additional_thoughts || '', onChange: (value) => setValues({
                            ...values,
                            additional_thoughts: value,
                        }), help: errors?.additional_thoughts || '' })),
                createElement(BaseControl, { id: 'feedback_email', className: "fincommerce-product-feedback__email", label: createInterpolateElement(__('YOUR EMAIL ADDRESS <optional />', 'fincommerce'), {
                        optional: (createElement("span", { className: "fincommerce-product-feedback__optional-input" }, __('(OPTIONAL)', 'fincommerce'))),
                    }) },
                    createElement(TextControl, { value: values.email || '', onChange: (value) => setValues({ ...values, email: value }), help: errors?.email || '' }),
                    createElement("span", null, __('In case you want to participate in further discussion and future user research.', 'fincommerce'))))),
            validateExtraFields: ({ email = '', additional_thoughts = '', }) => {
                const errors = {};
                if (email.length > 0 && !isValidEmail(email)) {
                    errors.email = __('Please enter a valid email address.', 'fincommerce');
                }
                if (additional_thoughts?.length > 500) {
                    errors.additional_thoughts = __('Please enter no more than 500 characters.', 'fincommerce');
                }
                return errors;
            },
        }, {}, {
            type: 'snackbar',
        });
    };
    const onTurnOffEditorClick = () => {
        recordEvent('product_editor_feedback_bar_turnoff_editor_click', {
            ...getProductTracksProps(),
        });
        hideFeedbackBar();
        showProductMVPFeedbackModal();
    };
    const onHideFeedbackBarClick = () => {
        recordEvent('product_editor_feedback_bar_dismiss_click', {
            ...getProductTracksProps(),
        });
        hideFeedbackBar();
    };
    return (createElement(Fragment, null, shouldShowFeedbackBar && (createElement("div", { className: "fincommerce-product-mvp-ces-footer" },
        createElement(Pill, null, "Beta"),
        createElement("div", { className: "fincommerce-product-mvp-ces-footer__message" }, createInterpolateElement(__('How is your experience with the new product editor? <span><shareButton>Share feedback</shareButton> or <turnOffButton>turn it off</turnOffButton></span>', 'fincommerce'), {
            span: (createElement("span", { className: "fincommerce-product-mvp-ces-footer__message-buttons" })),
            shareButton: (createElement(Button, { variant: "link", onClick: onShareFeedbackClick })),
            turnOffButton: (createElement(Button, { onClick: onTurnOffEditorClick, variant: "link" })),
        })),
        createElement(Button, { className: "fincommerce-product-mvp-ces-footer__close-button", icon: closeSmall, label: __('Hide this message', 'fincommerce'), onClick: onHideFeedbackBarClick })))));
}
