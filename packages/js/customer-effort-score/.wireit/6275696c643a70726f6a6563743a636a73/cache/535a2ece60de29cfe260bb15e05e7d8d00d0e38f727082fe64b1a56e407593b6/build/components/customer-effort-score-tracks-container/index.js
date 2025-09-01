"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEffortScoreTracksContainer = void 0;
/**
 * External dependencies
 */
const react_1 = require("react");
const compose_1 = require("@wordpress/compose");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const data_2 = require("@fincommerce/data");
/**
 * Internal dependencies
 */
const __1 = require("..");
const store_1 = require("../../store");
/**
 * @typedef {Object} CustomerEffortScoreTracksContainerProps
 * @property {Array<Object>} queue      - The queue of CES tracks surveys to display
 * @property {boolean}       resolving  - If the queue option is being resolved
 * @property {Function}      clearQueue - Set up clearing the queue on the next page load
 */
/**
 * Maps the queue of CES tracks surveys to CustomerEffortScoreTracks
 * components. Note that generally there will only be a single survey per page
 * however this is designed to be flexible if multiple surveys per page are
 * added in the future.
 *
 * @param {CustomerEffortScoreTracksContainerProps} props Component props
 * @return {JSX.Element|null} The rendered component
 */
function _CustomerEffortScoreTracksContainer({ queue, resolving, clearQueue, }) {
    const queueForPage = queue.filter((item) => item.pagenow === window.pagenow &&
        item.adminpage === window.adminpage);
    (0, react_1.useEffect)(() => {
        if (queueForPage.length) {
            clearQueue();
        }
    }, [queueForPage]);
    if (resolving) {
        return null;
    }
    return ((0, element_1.createElement)(element_1.Fragment, null, queueForPage.map((item, index) => ((0, element_1.createElement)(__1.CustomerEffortScoreTracks, { key: index, action: item.action, description: item.description, noticeLabel: item.noticeLabel, firstQuestion: item.firstQuestion, secondQuestion: item.secondQuestion, icon: item.icon, title: item.title, onSubmitLabel: item.onsubmit_label, trackProps: item.props || {} })))));
}
/** @type {import('react').ComponentType<CustomerEffortScoreTracksContainerProps>} */
exports.CustomerEffortScoreTracksContainer = (0, compose_1.compose)((0, data_1.withSelect)((select) => {
    const { getCesSurveyQueue, isResolving } = select(store_1.STORE_KEY);
    const queue = getCesSurveyQueue();
    const resolving = isResolving('getOption', [store_1.QUEUE_OPTION_NAME]);
    return { queue, resolving };
}), (0, data_1.withDispatch)((dispatch) => {
    const { updateOptions } = dispatch(data_2.optionsStore);
    return {
        clearQueue: () => {
            // This sets an option that should be used on the next page
            // load to clear the CES tracks queue for the current page (see
            // CustomerEffortScoreTracks.php) - clearing the queue
            // directly puts this into an infinite loop which is picked
            // up by React.
            updateOptions({
                fincommerce_clear_ces_tracks_queue_for_page: {
                    pagenow: window.pagenow,
                    adminpage: window.adminpage,
                },
            });
        },
    };
}))(_CustomerEffortScoreTracksContainer);
