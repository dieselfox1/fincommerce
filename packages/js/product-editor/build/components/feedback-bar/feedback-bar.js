"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackBar = FeedbackBar;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const components_2 = require("@fincommerce/components");
const customer_effort_score_1 = require("@fincommerce/customer-effort-score");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const use_feedback_bar_1 = require("../../hooks/use-feedback-bar");
const utils_1 = require("../../utils");
function FeedbackBar({ productType }) {
    const { hideFeedbackBar, shouldShowFeedbackBar } = (0, use_feedback_bar_1.useFeedbackBar)();
    const { showCesModal, showProductMVPFeedbackModal } = (0, customer_effort_score_1.useCustomerEffortScoreModal)();
    const getProductTracksProps = () => {
        const tracksProps = {
            product_type: productType,
        };
        return tracksProps;
    };
    const onShareFeedbackClick = () => {
        (0, tracks_1.recordEvent)('product_editor_feedback_bar_share_feedback_click', {
            ...getProductTracksProps(),
        });
        showCesModal({
            action: constants_1.PRODUCT_EDITOR_FEEDBACK_CES_ACTION,
            showDescription: false,
            title: (0, i18n_1.__)('What do you think of the new product editor?', 'fincommerce'),
            firstQuestion: (0, i18n_1.__)('The product editing screen is easy to use', 'fincommerce'),
            secondQuestion: (0, i18n_1.__)('Product editor is easy to use', 'fincommerce'),
            onsubmitLabel: (0, i18n_1.__)("Thanks for the feedback — we'll put it to good use!", 'fincommerce'),
            shouldShowComments: () => false,
            getExtraFieldsToBeShown: (values, setValues, errors) => ((0, element_1.createElement)(element_1.Fragment, null,
                (0, element_1.createElement)(components_1.BaseControl, { id: 'feedback_additional_thoughts', className: "fincommerce-product-feedback__additional-thoughts", label: (0, element_1.createInterpolateElement)((0, i18n_1.__)('ADDITIONAL THOUGHTS <optional />', 'fincommerce'), {
                        optional: ((0, element_1.createElement)("span", { className: "fincommerce-product-feedback__optional-input" }, (0, i18n_1.__)('(OPTIONAL)', 'fincommerce'))),
                    }) },
                    (0, element_1.createElement)(components_1.TextareaControl, { value: values.additional_thoughts || '', onChange: (value) => setValues({
                            ...values,
                            additional_thoughts: value,
                        }), help: errors?.additional_thoughts || '' })),
                (0, element_1.createElement)(components_1.BaseControl, { id: 'feedback_email', className: "fincommerce-product-feedback__email", label: (0, element_1.createInterpolateElement)((0, i18n_1.__)('YOUR EMAIL ADDRESS <optional />', 'fincommerce'), {
                        optional: ((0, element_1.createElement)("span", { className: "fincommerce-product-feedback__optional-input" }, (0, i18n_1.__)('(OPTIONAL)', 'fincommerce'))),
                    }) },
                    (0, element_1.createElement)(components_1.TextControl, { value: values.email || '', onChange: (value) => setValues({ ...values, email: value }), help: errors?.email || '' }),
                    (0, element_1.createElement)("span", null, (0, i18n_1.__)('In case you want to participate in further discussion and future user research.', 'fincommerce'))))),
            validateExtraFields: ({ email = '', additional_thoughts = '', }) => {
                const errors = {};
                if (email.length > 0 && !(0, utils_1.isValidEmail)(email)) {
                    errors.email = (0, i18n_1.__)('Please enter a valid email address.', 'fincommerce');
                }
                if (additional_thoughts?.length > 500) {
                    errors.additional_thoughts = (0, i18n_1.__)('Please enter no more than 500 characters.', 'fincommerce');
                }
                return errors;
            },
        }, {}, {
            type: 'snackbar',
        });
    };
    const onTurnOffEditorClick = () => {
        (0, tracks_1.recordEvent)('product_editor_feedback_bar_turnoff_editor_click', {
            ...getProductTracksProps(),
        });
        hideFeedbackBar();
        showProductMVPFeedbackModal();
    };
    const onHideFeedbackBarClick = () => {
        (0, tracks_1.recordEvent)('product_editor_feedback_bar_dismiss_click', {
            ...getProductTracksProps(),
        });
        hideFeedbackBar();
    };
    return ((0, element_1.createElement)(element_1.Fragment, null, shouldShowFeedbackBar && ((0, element_1.createElement)("div", { className: "fincommerce-product-mvp-ces-footer" },
        (0, element_1.createElement)(components_2.Pill, null, "Beta"),
        (0, element_1.createElement)("div", { className: "fincommerce-product-mvp-ces-footer__message" }, (0, element_1.createInterpolateElement)((0, i18n_1.__)('How is your experience with the new product editor? <span><shareButton>Share feedback</shareButton> or <turnOffButton>turn it off</turnOffButton></span>', 'fincommerce'), {
            span: ((0, element_1.createElement)("span", { className: "fincommerce-product-mvp-ces-footer__message-buttons" })),
            shareButton: ((0, element_1.createElement)(components_1.Button, { variant: "link", onClick: onShareFeedbackClick })),
            turnOffButton: ((0, element_1.createElement)(components_1.Button, { onClick: onTurnOffEditorClick, variant: "link" })),
        })),
        (0, element_1.createElement)(components_1.Button, { className: "fincommerce-product-mvp-ces-footer__close-button", icon: icons_1.closeSmall, label: (0, i18n_1.__)('Hide this message', 'fincommerce'), onClick: onHideFeedbackBarClick })))));
}
