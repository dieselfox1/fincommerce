"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomerEffortScoreExitPageTracker = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const customer_effort_score_exit_page_1 = require("../../utils/customer-effort-score-exit-page");
const useCustomerEffortScoreExitPageTracker = (pageId, hasUnsavedChanges) => {
    const hasUnsavedChangesRef = (0, element_1.useRef)(hasUnsavedChanges);
    // Using unmounting as a way to see when the react router changes.
    (0, element_1.useEffect)(() => {
        hasUnsavedChangesRef.current = hasUnsavedChanges;
    }, [hasUnsavedChanges]);
    (0, element_1.useEffect)(() => {
        return () => {
            if (hasUnsavedChangesRef.current) {
                // unmounted.
                (0, customer_effort_score_exit_page_1.addExitPage)(pageId);
            }
        };
    }, []);
    // This effect listen to the native beforeunload event to show
    // a confirmation message
    (0, element_1.useEffect)(() => {
        (0, customer_effort_score_exit_page_1.addCustomerEffortScoreExitPageListener)(pageId, () => hasUnsavedChanges);
        return () => {
            (0, customer_effort_score_exit_page_1.removeCustomerEffortScoreExitPageListener)(pageId);
        };
    }, [hasUnsavedChanges]);
};
exports.useCustomerEffortScoreExitPageTracker = useCustomerEffortScoreExitPageTracker;
