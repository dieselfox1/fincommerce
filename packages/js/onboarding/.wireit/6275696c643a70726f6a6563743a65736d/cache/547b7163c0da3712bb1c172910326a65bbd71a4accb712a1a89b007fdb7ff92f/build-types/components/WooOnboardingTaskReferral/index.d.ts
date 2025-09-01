/**
 * This constructor function exists for type safety purposes, so when you create a pair of set/get functions they have the
 *  same type for the value they store/retrieve.
 */
export declare function createStorageUtils<T>(key: string, durationInSeconds: number, type?: 'session' | 'local'): {
    setWithExpiry: (value: T) => void;
    getWithExpiry: () => T | null;
    remove: () => void;
};
export type TaskReferralRecord = {
    referrer: string;
    returnUrl: string;
};
/**
 * Returns a pair of getter and setter for the task referral storage.
 *
 * @param {Object} options                  - The options object.
 * @param {string} options.taskId           - Name of the task.
 * @param {number} options.referralLifetime - Lifetime of the referral. Default of 60 seconds is a reasonable amount of time for referral handoff lifetime in most cases, since it really only needs to account for the page load duration
 */
export declare const accessTaskReferralStorage: ({ taskId, referralLifetime, }: {
    taskId: string;
    referralLifetime?: number;
}) => {
    setWithExpiry: (value: TaskReferralRecord) => void;
    getWithExpiry: () => TaskReferralRecord | null;
    remove: () => void;
};
//# sourceMappingURL=index.d.ts.map