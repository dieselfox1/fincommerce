/**
 * This constructor function exists for type safety purposes, so when you create a pair of set/get functions they have the
 *  same type for the value they store/retrieve.
 */
export function createStorageUtils(key, durationInSeconds, type = 'local') {
    const storage = type === 'session' ? sessionStorage : localStorage;
    return {
        setWithExpiry: (value) => {
            const now = new Date();
            const expiry = new Date(now.getTime() + durationInSeconds * 1000);
            const item = {
                data: value,
                expiry: expiry.toISOString(),
            };
            storage.setItem(key, JSON.stringify(item));
        },
        getWithExpiry: () => {
            const itemStr = storage.getItem(key);
            if (!itemStr) {
                return null;
            }
            const item = JSON.parse(itemStr);
            const now = new Date();
            if (now > new Date(item.expiry)) {
                storage.removeItem(key);
                return null;
            }
            return item.data;
        },
        remove: () => {
            storage.removeItem(key);
        },
    };
}
/**
 * Returns a pair of getter and setter for the task referral storage.
 *
 * @param {Object} options                  - The options object.
 * @param {string} options.taskId           - Name of the task.
 * @param {number} options.referralLifetime - Lifetime of the referral. Default of 60 seconds is a reasonable amount of time for referral handoff lifetime in most cases, since it really only needs to account for the page load duration
 */
export const accessTaskReferralStorage = ({ taskId, referralLifetime = 60, }) => createStorageUtils(`wc_admin_task_referral_${taskId}`, referralLifetime, 'session');
