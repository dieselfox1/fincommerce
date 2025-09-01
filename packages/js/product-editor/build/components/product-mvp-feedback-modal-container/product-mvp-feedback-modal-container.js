"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMVPFeedbackModalContainer = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const customer_effort_score_1 = require("@fincommerce/customer-effort-score");
const tracks_1 = require("@fincommerce/tracks");
const settings_1 = require("@fincommerce/settings");
const components_1 = require("@fincommerce/components");
/**
 * Internal dependencies
 */
const product_mvp_feedback_modal_1 = require("../product-mvp-feedback-modal");
const ProductMVPFeedbackModalContainer = ({ productId: _productId, }) => {
    const { values } = (0, components_1.useFormContext)();
    const { hideProductMVPFeedbackModal } = (0, data_1.useDispatch)(customer_effort_score_1.STORE_KEY);
    const { isProductMVPModalVisible } = (0, data_1.useSelect)((select) => {
        const { isProductMVPFeedbackModalVisible } = select(customer_effort_score_1.STORE_KEY);
        return {
            // @ts-expect-error Selector is not typed
            isProductMVPModalVisible: isProductMVPFeedbackModalVisible(),
        };
    }, []);
    const productId = _productId ?? values?.id;
    const { _feature_nonce } = (0, settings_1.getSetting)('admin', {});
    const classicEditorUrl = productId
        ? (0, settings_1.getAdminLink)(`post.php?post=${productId}&action=edit&product_block_editor=0&_feature_nonce=${_feature_nonce}`)
        : (0, settings_1.getAdminLink)(`post-new.php?post_type=product&product_block_editor=0&_feature_nonce=${_feature_nonce}`);
    const recordScore = (checked, comments, email) => {
        (0, tracks_1.recordEvent)('product_mvp_feedback', {
            action: 'disable',
            checked,
            comments: comments || '',
            email,
        });
        hideProductMVPFeedbackModal();
        window.location.href = `${classicEditorUrl}&new-product-experience-disabled=true`;
    };
    const onCloseModal = () => {
        (0, tracks_1.recordEvent)('product_mvp_feedback', {
            action: 'cancel',
            checked: '',
            comments: '',
        });
        hideProductMVPFeedbackModal();
    };
    const onSkipFeedback = () => {
        (0, tracks_1.recordEvent)('product_mvp_feedback', {
            action: 'disable',
            checked: '',
            comments: 'Feedback skipped',
        });
        hideProductMVPFeedbackModal();
        window.location.href = classicEditorUrl;
    };
    if (!isProductMVPModalVisible) {
        return null;
    }
    return ((0, element_1.createElement)(product_mvp_feedback_modal_1.ProductMVPFeedbackModal, { recordScoreCallback: recordScore, onCloseModal: onCloseModal, onSkipFeedback: onSkipFeedback }));
};
exports.ProductMVPFeedbackModalContainer = ProductMVPFeedbackModalContainer;
