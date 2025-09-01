/**
 * Initialize the state
 *
 * @param {Object} queue initial queue
 */
export function setCesSurveyQueue(queue: Object): {
    type: string;
    queue: Object;
};
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
export function addCesSurvey({ action, title, description, noticeLabel, firstQuestion, secondQuestion, icon, pageNow, adminPage, onsubmitLabel, props, }: {
    action: string;
    title: string;
    description: string;
    noticeLabel: string;
    firstQuestion: string;
    secondQuestion: string;
    icon?: string | undefined;
    pageNow?: string | undefined;
    adminPage?: string | undefined;
    onsubmitLabel?: string | undefined;
    props: Object;
}): {
    type: string;
    action: string;
    title: string;
    description: string;
    noticeLabel: string;
    firstQuestion: string;
    secondQuestion: string;
    icon: string | undefined;
    pageNow: string;
    adminPage: string;
    onsubmit_label: string | undefined;
    props: Object;
};
/**
 * Add show CES modal.
 *
 * @param {Object} surveyProps         props for CES survey, similar to addCesSurvey.
 * @param {Object} props               object for optional props
 * @param {Object} onSubmitNoticeProps object for on submit notice props.
 */
export function showCesModal(surveyProps?: Object, props?: Object, onSubmitNoticeProps?: Object, tracksProps?: {}): {
    type: string;
    surveyProps: Object;
    onsubmit_label: any;
    props: Object;
    onSubmitNoticeProps: Object;
    tracksProps: {};
};
/**
 * Hide CES Modal.
 */
export function hideCesModal(): {
    type: string;
};
/**
 * Add a new CES survey track for the pages in Analytics menu
 */
export function addCesSurveyForAnalytics(): {
    type: string;
    action: string;
    title: string;
    description: string;
    noticeLabel: string;
    firstQuestion: string;
    secondQuestion: string;
    icon: string | undefined;
    pageNow: string;
    adminPage: string;
    onsubmit_label: string | undefined;
    props: Object;
};
/**
 * Add a new CES survey track on searching customers.
 */
export function addCesSurveyForCustomerSearch(): {
    type: string;
    action: string;
    title: string;
    description: string;
    noticeLabel: string;
    firstQuestion: string;
    secondQuestion: string;
    icon: string | undefined;
    pageNow: string;
    adminPage: string;
    onsubmit_label: string | undefined;
    props: Object;
};
/**
 * Add show product MVP Feedback modal.
 */
export function showProductMVPFeedbackModal(): {
    type: string;
};
/**
 * Hide product MVP Feedback modal.
 */
export function hideProductMVPFeedbackModal(): {
    type: string;
};
//# sourceMappingURL=actions.d.ts.map