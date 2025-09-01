"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCesSurveyQueue = setCesSurveyQueue;
exports.addCesSurvey = addCesSurvey;
exports.showCesModal = showCesModal;
exports.hideCesModal = hideCesModal;
exports.addCesSurveyForAnalytics = addCesSurveyForAnalytics;
exports.addCesSurveyForCustomerSearch = addCesSurveyForCustomerSearch;
exports.showProductMVPFeedbackModal = showProductMVPFeedbackModal;
exports.hideProductMVPFeedbackModal = hideProductMVPFeedbackModal;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
/**
 * Initialize the state
 *
 * @param {Object} queue initial queue
 */
function setCesSurveyQueue(queue) {
    return {
        type: action_types_1.default.SET_CES_SURVEY_QUEUE,
        queue,
    };
}
/**
 * Add a new CES track to the state.
 *
 * @param {Object} args                 All arguments.
 * @param {string} args.action          action name for the survey
 * @param {string} args.title           title for the snackback
 * @param {string} args.description     description for feedback modal.
 * @param {string} args.noticeLabel     noticeLabel for notice.
 * @param {string} args.firstQuestion   first question for modal survey
 * @param {string} args.secondQuestion  second question for modal survey
 * @param {string} [args.icon]          optional icon for notice.
 * @param {string} [args.pageNow]       optional value of window.pagenow, default to window.pagenow
 * @param {string} [args.adminPage]     optional value of window.adminpage, default to window.adminpage
 * @param {string} [args.onsubmitLabel] optional label for the snackback onsubmit, default to undefined
 * @param {Object} args.props           object for optional props
 */
function addCesSurvey({ action, title, description, noticeLabel, firstQuestion, secondQuestion, icon, pageNow = window.pagenow, adminPage = window.adminpage, onsubmitLabel = undefined, props = {}, }) {
    return {
        type: action_types_1.default.ADD_CES_SURVEY,
        action,
        title,
        description,
        noticeLabel,
        firstQuestion,
        secondQuestion,
        icon,
        pageNow,
        adminPage,
        onsubmit_label: onsubmitLabel,
        props,
    };
}
/**
 * Add show CES modal.
 *
 * @param {Object} surveyProps         props for CES survey, similar to addCesSurvey.
 * @param {Object} props               object for optional props
 * @param {Object} onSubmitNoticeProps object for on submit notice props.
 */
function showCesModal(surveyProps = {}, props = {}, onSubmitNoticeProps = {}, tracksProps = {}) {
    return {
        type: action_types_1.default.SHOW_CES_MODAL,
        surveyProps,
        onsubmit_label: surveyProps.onsubmitLabel || '',
        props,
        onSubmitNoticeProps,
        tracksProps,
    };
}
/**
 * Hide CES Modal.
 */
function hideCesModal() {
    return {
        type: action_types_1.default.HIDE_CES_MODAL,
    };
}
/**
 * Add a new CES survey track for the pages in Analytics menu
 */
function addCesSurveyForAnalytics() {
    return addCesSurvey({
        action: 'analytics_filtered',
        title: (0, i18n_1.__)('How easy was it to filter your store analytics?', 'fincommerce'),
        firstQuestion: (0, i18n_1.__)('The filters in the analytics screen are easy to use.', 'fincommerce'),
        secondQuestion: (0, i18n_1.__)(`The filters' functionality meets my needs.`, 'fincommerce'),
        pageNow: 'fincommerce_page_wc-admin',
        adminPage: 'fincommerce_page_wc-admin',
    });
}
/**
 * Add a new CES survey track on searching customers.
 */
function addCesSurveyForCustomerSearch() {
    return addCesSurvey({
        action: 'ces_search',
        title: (0, i18n_1.__)('How easy was it to use search?', 'fincommerce'),
        firstQuestion: (0, i18n_1.__)('The search feature in FinCommerce is easy to use.', 'fincommerce'),
        secondQuestion: (0, i18n_1.__)(`The search's functionality meets my needs.`, 'fincommerce'),
        pageNow: 'fincommerce_page_wc-admin',
        adminPage: 'fincommerce_page_wc-admin',
        onsubmit_label: undefined,
        props: {
            search_area: 'customer',
        },
    });
}
/**
 * Add show product MVP Feedback modal.
 */
function showProductMVPFeedbackModal() {
    return {
        type: action_types_1.default.SHOW_PRODUCT_MVP_FEEDBACK_MODAL,
    };
}
/**
 * Hide product MVP Feedback modal.
 */
function hideProductMVPFeedbackModal() {
    return {
        type: action_types_1.default.HIDE_PRODUCT_MVP_FEEDBACK_MODAL,
    };
}
