"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEffortScoreModalContainer = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
const data_2 = require("@fincommerce/data");
const element_1 = require("@wordpress/element");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const __1 = require("../");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const store_1 = __importDefault(require("../../store"));
const CustomerEffortScoreModalContainer = () => {
    const { createSuccessNotice } = (0, data_1.useDispatch)('core/notices');
    const { hideCesModal } = (0, data_1.useDispatch)(store_1.default);
    const { storeAgeInWeeks, resolving: isLoading, visibleCESModalData, } = (0, data_1.useSelect)((select) => {
        const { getOption, hasFinishedResolution } = select(data_2.optionsStore);
        const { getVisibleCESModalData } = select(store_1.default);
        const adminInstallTimestamp = getOption(constants_1.ADMIN_INSTALL_TIMESTAMP_OPTION_NAME) || 0;
        const resolving = adminInstallTimestamp === null ||
            !hasFinishedResolution('getOption', [
                constants_1.ADMIN_INSTALL_TIMESTAMP_OPTION_NAME,
            ]);
        return {
            storeAgeInWeeks: (0, utils_1.getStoreAgeInWeeks)(adminInstallTimestamp),
            visibleCESModalData: getVisibleCESModalData(),
            resolving,
        };
    }, []);
    const recordScore = (score, secondScore, comments, extraFieldsValues = {}) => {
        (0, tracks_1.recordEvent)('ces_feedback', {
            action: visibleCESModalData.action,
            score,
            score_second_question: secondScore ?? null,
            score_combined: score + (secondScore ?? 0),
            comments: comments || '',
            ...extraFieldsValues,
            store_age: storeAgeInWeeks,
            ...visibleCESModalData.tracksProps,
        });
        createSuccessNotice(visibleCESModalData.onSubmitLabel ||
            (0, i18n_1.__)("Thanks for the feedback. We'll put it to good use!", 'fincommerce'), visibleCESModalData.onSubmitNoticeProps || {});
    };
    if (!visibleCESModalData || isLoading) {
        return null;
    }
    return ((0, element_1.createElement)(__1.CustomerFeedbackModal, { title: visibleCESModalData.title, description: visibleCESModalData.description, showDescription: visibleCESModalData.showDescription, firstQuestion: visibleCESModalData.firstQuestion, secondQuestion: visibleCESModalData.secondQuestion, recordScoreCallback: (...args) => {
            recordScore(...args);
            hideCesModal();
            visibleCESModalData.props?.onRecordScore?.();
        }, onCloseModal: () => {
            visibleCESModalData.props?.onCloseModal?.();
            hideCesModal();
        }, shouldShowComments: visibleCESModalData.props?.shouldShowComments, getExtraFieldsToBeShown: visibleCESModalData.getExtraFieldsToBeShown, validateExtraFields: visibleCESModalData.validateExtraFields }));
};
exports.CustomerEffortScoreModalContainer = CustomerEffortScoreModalContainer;
