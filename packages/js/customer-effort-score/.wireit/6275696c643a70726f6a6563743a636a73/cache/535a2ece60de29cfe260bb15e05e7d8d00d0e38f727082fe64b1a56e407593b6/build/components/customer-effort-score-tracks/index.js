"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEffortScoreTracks = void 0;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const data_2 = require("@fincommerce/data");
const i18n_1 = require("@wordpress/i18n");
const tracks_1 = require("@fincommerce/tracks");
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
/**
 * Internal dependencies
 */
const __1 = require("../");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
/**
 * @typedef {Object} CustomerEffortScoreTracksProps
 * @property {string}   action               - The action name sent to Tracks
 * @property {Object}   [trackProps]         - Additional props sent to Tracks
 * @property {string}   title                - The title displayed in the modal
 * @property {string}   [description]        - Description shown in CES modal
 * @property {string}   [noticeLabel]        - Label for notice, defaults to title
 * @property {string}   [firstQuestion]      - The first survey question
 * @property {string}   [secondQuestion]     - The second survey question
 * @property {string}   [icon]               - Optional icon to show in notice
 * @property {string}   [onSubmitLabel]      - The label displayed upon survey submission
 * @property {string[]} [cesShownForActions] - The array of actions that the CES modal has been shown for
 * @property {boolean}  [allowTracking]      - Whether tracking is allowed or not
 * @property {boolean}  resolving            - Whether props are still being resolved
 * @property {number}   [storeAgeInWeeks]    - The age of the store in weeks
 * @property {Function} [createNotice]       - Function to create a snackbar
 */
/**
 * A CustomerEffortScore wrapper that uses tracks to track the selected
 * customer effort score.
 *
 * @param {CustomerEffortScoreTracksProps} props Component props
 * @return {JSX.Element} The rendered component
 */
function _CustomerEffortScoreTracks({ action, trackProps, title, description, noticeLabel, firstQuestion, secondQuestion, icon, onSubmitLabel = (0, i18n_1.__)('Thank you for your feedback!', 'fincommerce'), cesShownForActions, allowTracking, resolving, storeAgeInWeeks, createNotice, }) {
    const [modalShown, setModalShown] = (0, element_1.useState)(false);
    if (resolving) {
        return null;
    }
    // Don't show if tracking is disallowed.
    if (!allowTracking) {
        return null;
    }
    // We only want to return null early if the modal was already shown
    // for this action *before* this component was initially instantiated.
    //
    // We want to make sure we still render CustomerEffortScore below
    // (we don't want to return null early), if the modal was shown for this
    // instantiation, so that the component doesn't go away while we are
    // still showing it.
    if (cesShownForActions &&
        cesShownForActions.indexOf(action) !== -1 &&
        !modalShown) {
        return null;
    }
    const onNoticeShown = () => {
        (0, tracks_1.recordEvent)('ces_snackbar_view', {
            action,
            store_age: storeAgeInWeeks,
            ces_location: 'inside',
            ...trackProps,
        });
        if (!cesShownForActions || !cesShownForActions.includes(action)) {
            (0, api_fetch_1.default)({
                path: 'wc-admin/options',
                method: 'POST',
                data: {
                    [constants_1.SHOWN_FOR_ACTIONS_OPTION_NAME]: [
                        action,
                        ...(cesShownForActions || []),
                    ],
                },
            });
        }
    };
    const onNoticeDismissed = () => {
        (0, tracks_1.recordEvent)('ces_snackbar_dismiss', {
            action,
            store_age: storeAgeInWeeks,
            ces_location: 'inside',
            ...trackProps,
        });
    };
    const onModalDismissed = () => {
        (0, tracks_1.recordEvent)('ces_view_dismiss', {
            action,
            store_age: storeAgeInWeeks,
            ces_location: 'inside',
            ...trackProps,
        });
    };
    const onModalShown = () => {
        setModalShown(true);
        (0, tracks_1.recordEvent)('ces_view', {
            action,
            store_age: storeAgeInWeeks,
            ces_location: 'inside',
            ...trackProps,
        });
    };
    const recordScore = (score, secondScore, comments) => {
        (0, tracks_1.recordEvent)('ces_feedback', {
            action,
            score,
            score_second_question: secondScore,
            score_combined: score + secondScore,
            comments: comments || '',
            store_age: storeAgeInWeeks,
            ces_location: 'inside',
            ...trackProps,
        });
        createNotice('success', onSubmitLabel);
    };
    return ((0, element_1.createElement)(__1.CustomerEffortScore, { recordScoreCallback: recordScore, title: title, description: description, noticeLabel: noticeLabel, firstQuestion: firstQuestion, secondQuestion: secondQuestion, onNoticeShownCallback: onNoticeShown, onNoticeDismissedCallback: onNoticeDismissed, onModalShownCallback: onModalShown, onModalDismissedCallback: onModalDismissed, icon: (0, element_1.createElement)("span", { style: { height: 21, width: 21 }, role: "img", "aria-label": (0, i18n_1.__)('Pencil icon', 'fincommerce') }, icon || '✏') }));
}
/**
 * @typedef {import('react').ComponentType} ComponentType
 *
 * @type {ComponentType<CustomerEffortScoreTracksProps>}
 */
exports.CustomerEffortScoreTracks = (0, compose_1.compose)((0, data_1.withSelect)((select) => {
    const { getOption, hasFinishedResolution } = select(data_2.optionsStore);
    const cesShownForActions = getOption(constants_1.SHOWN_FOR_ACTIONS_OPTION_NAME);
    const adminInstallTimestamp = getOption(constants_1.ADMIN_INSTALL_TIMESTAMP_OPTION_NAME) || 0;
    const storeAgeInWeeks = (0, utils_1.getStoreAgeInWeeks)(adminInstallTimestamp);
    const allowTrackingOption = getOption(constants_1.ALLOW_TRACKING_OPTION_NAME) || 'no';
    const allowTracking = allowTrackingOption === 'yes';
    const resolving = !hasFinishedResolution('getOption', [
        constants_1.SHOWN_FOR_ACTIONS_OPTION_NAME,
    ]) ||
        storeAgeInWeeks === null ||
        !hasFinishedResolution('getOption', [
            constants_1.ADMIN_INSTALL_TIMESTAMP_OPTION_NAME,
        ]) ||
        !hasFinishedResolution('getOption', [
            constants_1.ALLOW_TRACKING_OPTION_NAME,
        ]);
    return {
        cesShownForActions,
        allowTracking,
        storeAgeInWeeks,
        resolving,
    };
}), (0, data_1.withDispatch)((dispatch) => {
    const { createNotice } = dispatch('core/notices');
    return {
        createNotice,
    };
}))(_CustomerEffortScoreTracks);
