/**
 * @typedef {import('react').ComponentType} ComponentType
 *
 * @type {ComponentType<CustomerEffortScoreTracksProps>}
 */
export const CustomerEffortScoreTracks: ComponentType<CustomerEffortScoreTracksProps>;
export type CustomerEffortScoreTracksProps = {
    /**
     * - The action name sent to Tracks
     */
    action: string;
    /**
     * - Additional props sent to Tracks
     */
    trackProps?: Object | undefined;
    /**
     * - The title displayed in the modal
     */
    title: string;
    /**
     * - Description shown in CES modal
     */
    description?: string | undefined;
    /**
     * - Label for notice, defaults to title
     */
    noticeLabel?: string | undefined;
    /**
     * - The first survey question
     */
    firstQuestion?: string | undefined;
    /**
     * - The second survey question
     */
    secondQuestion?: string | undefined;
    /**
     * - Optional icon to show in notice
     */
    icon?: string | undefined;
    /**
     * - The label displayed upon survey submission
     */
    onSubmitLabel?: string | undefined;
    /**
     * - The array of actions that the CES modal has been shown for
     */
    cesShownForActions?: string[] | undefined;
    /**
     * - Whether tracking is allowed or not
     */
    allowTracking?: boolean | undefined;
    /**
     * - Whether props are still being resolved
     */
    resolving: boolean;
    /**
     * - The age of the store in weeks
     */
    storeAgeInWeeks?: number | undefined;
    /**
     * - Function to create a snackbar
     */
    createNotice?: Function | undefined;
};
export type ComponentType = any;
//# sourceMappingURL=index.d.ts.map