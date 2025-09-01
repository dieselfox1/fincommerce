/**
 * Gets the list of exited pages from Localstorage.
 */
export declare const getExitPageData: () => any[];
/**
 * Adds the page to the exit page list in Localstorage.
 *
 * @param {string} pageId of page exited early.
 */
export declare const addExitPage: (pageId: string) => Promise<void>;
/**
 * Removes the passed in page id from the list in Localstorage.
 *
 * @param {string} pageId of page to be removed.
 */
export declare const removeExitPage: (pageId: string) => void;
/**
 * Adds unload event listener to add pageId to exit page list incase there were unsaved changes.
 *
 * @param {string}   pageId            the page id of the page being exited early.
 * @param {Function} hasUnsavedChanges callback to check if the page had unsaved changes.
 */
export declare const addCustomerEffortScoreExitPageListener: (pageId: string, hasUnsavedChanges: () => boolean) => void;
/**
 * Removes the unload exit page listener.
 *
 * @param {string} pageId the page id to remove the listener from.
 */
export declare const removeCustomerEffortScoreExitPageListener: (pageId: string) => void;
/**
 * Checks the exit page list and triggers a CES survey for the first item in the list.
 */
export declare function triggerExitPageCesSurvey(): void;
//# sourceMappingURL=customer-effort-score-exit-page.d.ts.map