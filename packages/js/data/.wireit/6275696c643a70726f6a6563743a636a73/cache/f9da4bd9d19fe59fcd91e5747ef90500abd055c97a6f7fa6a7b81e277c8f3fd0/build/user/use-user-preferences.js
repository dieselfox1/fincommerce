"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserPreferences = void 0;
/**
 * External dependencies
 */
const lodash_1 = require("lodash");
const data_1 = require("@wordpress/data");
const _1 = require("./");
/**
 * Retrieve and decode the user's FinCommerce meta values.
 *
 * @param {Object} user WP User object.
 * @return {Object} User's FinCommerce preferences.
 */
const getfincommerceMeta = (user) => {
    const wooMeta = user.fincommerce_meta || {};
    const userData = (0, lodash_1.mapValues)(wooMeta, (data) => {
        if (!data || data.length === 0) {
            return '';
        }
        try {
            return JSON.parse(data);
        }
        catch (e) {
            // If we can't parse the value, return the raw data. The meta value could be a string like 'yes' or 'no'.
            return data;
        }
    });
    return userData;
};
// Create wrapper for updating user's `fincommerce_meta`.
async function updateUserPrefs(receiveCurrentUser, user, saveUser, getLastEntitySaveError, userPrefs) {
    // @todo Handle unresolved getCurrentUser() here.
    // Prep fields for update.
    const metaData = (0, lodash_1.mapValues)(userPrefs, (value) => {
        if (typeof value === 'string') {
            // If the value is a string, we don't need to serialize it.
            return value;
        }
        return JSON.stringify(value);
    });
    if (Object.keys(metaData).length === 0) {
        return {
            error: new Error('Invalid fincommerce_meta data for update.'),
            updatedUser: undefined,
        };
    }
    // Optimistically propagate new fincommerce_meta to the store for instant update.
    receiveCurrentUser({
        ...user,
        fincommerce_meta: {
            ...user.fincommerce_meta,
            ...metaData,
        },
    });
    // Use saveUser() to update FinCommerce meta values.
    const updatedUser = await saveUser({
        id: user.id,
        fincommerce_meta: metaData,
    });
    if (undefined === updatedUser) {
        // Return the encountered error to the caller.
        const error = getLastEntitySaveError('root', 'user', user.id);
        return {
            error,
            updatedUser,
        };
    }
    // Decode the FinCommerce meta after save.
    const updatedUserResponse = {
        ...updatedUser,
        fincommerce_meta: getfincommerceMeta(updatedUser),
    };
    return {
        updatedUser: updatedUserResponse,
    };
}
/**
 * Custom react hook for retrieving thecurrent user's FinCommerce preferences.
 *
 * This is a wrapper around @wordpress/core-data's getCurrentUser() and saveUser().
 */
const useUserPreferences = () => {
    // Get our dispatch methods now - this can't happen inside the callback below.
    const dispatch = (0, data_1.useDispatch)(_1.store);
    const { addEntities, receiveCurrentUser, saveEntityRecord } = dispatch;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let { saveUser } = dispatch;
    const userData = (0, data_1.useSelect)((select) => {
        const { getCurrentUser, getEntity, getEntityRecord, getLastEntitySaveError, hasStartedResolution, hasFinishedResolution, } = select(_1.store);
        return {
            isRequesting: hasStartedResolution('getCurrentUser', []) &&
                !hasFinishedResolution('getCurrentUser', []),
            user: getCurrentUser(),
            getCurrentUser,
            getEntity,
            getEntityRecord,
            getLastEntitySaveError,
        };
    }, []);
    const updateUserPreferences = (userPrefs) => {
        // WP 5.3.x doesn't have the User entity defined.
        if (typeof saveUser !== 'function') {
            saveUser = async (userToSave) => {
                const entityDefined = Boolean(userData.getEntity('root', 'user'));
                if (!entityDefined) {
                    // Add the User entity so saveEntityRecord works.
                    await addEntities([
                        {
                            name: 'user',
                            kind: 'root',
                            baseURL: '/wp/v2/users',
                            plural: 'users',
                        },
                    ]);
                }
                // Fire off the save action.
                await saveEntityRecord('root', 'user', userToSave);
                // Respond with the updated user.
                return userData.getEntityRecord('root', 'user', userToSave.id);
            };
        }
        // Get most recent user before update.
        const currentUser = userData.getCurrentUser();
        return updateUserPrefs(receiveCurrentUser, currentUser, saveUser, userData.getLastEntitySaveError, userPrefs);
    };
    const userPreferences = userData.user
        ? getfincommerceMeta(userData.user)
        : {};
    return {
        isRequesting: userData.isRequesting,
        ...userPreferences,
        updateUserPreferences,
    };
};
exports.useUserPreferences = useUserPreferences;
