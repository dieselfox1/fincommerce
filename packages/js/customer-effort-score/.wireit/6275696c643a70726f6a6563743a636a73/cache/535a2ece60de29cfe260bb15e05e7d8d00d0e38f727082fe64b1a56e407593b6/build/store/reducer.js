"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const DEFAULT_STATE = {
    queue: [],
    cesModalData: undefined,
    showCESModal: false,
    showProductMVPFeedbackModal: false,
};
const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case action_types_1.default.SET_CES_SURVEY_QUEUE:
            return {
                ...state,
                queue: [...state.queue, ...action.queue],
            };
        case action_types_1.default.HIDE_CES_MODAL:
            return {
                ...state,
                showCESModal: false,
                cesModalData: undefined,
            };
        case action_types_1.default.SHOW_CES_MODAL:
            const cesModalData = {
                action: action.surveyProps.action,
                description: action.surveyProps.description,
                showDescription: action.surveyProps.showDescription,
                title: action.surveyProps.title,
                onSubmitLabel: action.onsubmit_label,
                firstQuestion: action.surveyProps.firstQuestion,
                secondQuestion: action.surveyProps.secondQuestion,
                onSubmitNoticeProps: action.onSubmitNoticeProps || {},
                props: action.props,
                tracksProps: action.tracksProps,
                getExtraFieldsToBeShown: action.surveyProps.getExtraFieldsToBeShown,
                validateExtraFields: action.surveyProps.validateExtraFields,
            };
            return {
                ...state,
                showCESModal: true,
                cesModalData,
            };
        case action_types_1.default.ADD_CES_SURVEY:
            // Prevent duplicate
            const hasDuplicate = state.queue.filter((track) => track.action === action.action);
            if (hasDuplicate.length) {
                return state;
            }
            const newTrack = {
                action: action.action,
                title: action.title,
                description: action.description,
                noticeLabel: action.noticeLabel,
                firstQuestion: action.firstQuestion,
                secondQuestion: action.secondQuestion,
                icon: action.icon,
                pagenow: action.pageNow,
                adminpage: action.adminPage,
                onSubmitLabel: action.onSubmitLabel,
                props: action.props,
            };
            return {
                ...state,
                queue: [...state.queue, newTrack],
            };
        case action_types_1.default.SHOW_PRODUCT_MVP_FEEDBACK_MODAL:
            return {
                ...state,
                showProductMVPFeedbackModal: true,
            };
        case action_types_1.default.HIDE_PRODUCT_MVP_FEEDBACK_MODAL:
            return {
                ...state,
                showProductMVPFeedbackModal: false,
            };
        default:
            return state;
    }
};
exports.default = reducer;
